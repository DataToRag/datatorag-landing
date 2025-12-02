"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  MoreHorizontal,
  RefreshCw,
  Trash2,
  ExternalLink,
  Check,
  Loader2,
  ChevronDown,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import {
  type KnowledgeDocument,
  type DataSourceId,
  MOCK_DATA_SOURCES,
} from "@/lib/demo-data";

// File type icon - consistent styling for all types
function FileTypeIcon({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex items-center justify-center bg-muted text-muted-foreground rounded",
        className
      )}
    >
      <FileText className="h-4 w-4" />
    </div>
  );
}

// File type icons map (uses consistent styling)
const FileTypeIcons: Record<string, React.FC<{ className?: string }>> = {
  pdf: FileTypeIcon,
  docx: FileTypeIcon,
  txt: FileTypeIcon,
  md: FileTypeIcon,
  html: FileTypeIcon,
};

// Source badges
function SourceBadge({ sourceId }: { sourceId: DataSourceId }) {
  const source = MOCK_DATA_SOURCES.find((s) => s.id === sourceId);
  if (!source) return null;

  return (
    <span
      className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full"
      style={{ backgroundColor: `${source.color}15`, color: source.color }}
    >
      {source.name}
    </span>
  );
}

// Status indicator
function StatusIndicator({ status }: { status: KnowledgeDocument["status"] }) {
  switch (status) {
    case "ready":
      return (
        <span className="inline-flex items-center gap-1 text-xs text-green-600 dark:text-green-400">
          <Check className="h-3 w-3" />
          Ready
        </span>
      );
    case "processing":
    case "syncing":
      return (
        <span className="inline-flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400">
          <Loader2 className="h-3 w-3 animate-spin" />
          {status === "syncing" ? "Syncing" : "Processing"}
        </span>
      );
    case "error":
      return (
        <span className="inline-flex items-center gap-1 text-xs text-red-600 dark:text-red-400">
          Error
        </span>
      );
    default:
      return null;
  }
}

interface DocumentCardProps {
  document: KnowledgeDocument;
  onResync?: () => void;
  onRemove?: () => void;
  onView?: () => void;
}

function DocumentCard({
  document,
  onResync,
  onRemove,
  onView,
}: DocumentCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const FileIcon = FileTypeIcons[document.type] || FileTypeIcons.txt;

  const formatDate = (date: Date) => {
    // Use fixed format to avoid hydration mismatch
    const month = date.getUTCMonth() + 1;
    const day = date.getUTCDate();
    const year = date.getUTCFullYear();
    return `${month}/${day}/${year}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "group relative flex items-center gap-4 p-4 rounded-lg border transition-all cursor-pointer",
        document.status === "syncing" && "bg-blue-500/5 border-blue-500/20",
        document.status === "error" && "bg-red-500/5 border-red-500/20",
        document.status === "ready" &&
          "bg-background hover:bg-muted/50 hover:border-primary/20"
      )}
    >
      {/* File Icon */}
      <FileIcon className="w-10 h-10 p-2 flex-shrink-0" />

      {/* Document Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h4 className="font-medium truncate">{document.name}</h4>
          <SourceBadge sourceId={document.source} />
        </div>
        <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
          <span>{document.size}</span>
          <span>•</span>
          <span>{document.chunks} chunks</span>
          <span>•</span>
          <span>{formatDate(document.lastUpdated)}</span>
        </div>
      </div>

      {/* Status */}
      <div className="flex-shrink-0">
        <StatusIndicator status={document.status} />
      </div>

      {/* Actions */}
      <AnimatePresence>
        {isHovered && document.status === "ready" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-shrink-0"
          >
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={onView}>
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Details
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onResync}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Re-sync
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={onRemove}
                  className="text-destructive"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Remove
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

interface DocumentListProps {
  documents: KnowledgeDocument[];
  onDocumentRemove?: (id: string) => void;
  onDocumentResync?: (id: string) => void;
  onDocumentView?: (id: string) => void;
  filterSource?: DataSourceId | null;
}

export function DocumentList({
  documents,
  onDocumentRemove,
  onDocumentResync,
  onDocumentView,
  filterSource,
}: DocumentListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "date" | "size">("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  // Filter documents
  let filteredDocs = documents;

  if (filterSource) {
    filteredDocs = filteredDocs.filter((d) => d.source === filterSource);
  }

  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filteredDocs = filteredDocs.filter((d) =>
      d.name.toLowerCase().includes(query)
    );
  }

  // Sort documents
  filteredDocs = [...filteredDocs].sort((a, b) => {
    let comparison = 0;
    switch (sortBy) {
      case "name":
        comparison = a.name.localeCompare(b.name);
        break;
      case "date":
        comparison = a.lastUpdated.getTime() - b.lastUpdated.getTime();
        break;
      case "size":
        // Simple size comparison (not perfect but works for demo)
        comparison = parseFloat(a.size) - parseFloat(b.size);
        break;
    }
    return sortOrder === "asc" ? comparison : -comparison;
  });

  const processingDocs = filteredDocs.filter(
    (d) => d.status === "processing" || d.status === "syncing"
  );
  const readyDocs = filteredDocs.filter((d) => d.status === "ready");
  const errorDocs = filteredDocs.filter((d) => d.status === "error");

  return (
    <div className="space-y-4">
      {/* Search and Filter Bar */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search documents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Sort
              <ChevronDown className="h-4 w-4 ml-1" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => {
                setSortBy("date");
                setSortOrder("desc");
              }}
            >
              Recently updated
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                setSortBy("name");
                setSortOrder("asc");
              }}
            >
              Name (A-Z)
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                setSortBy("size");
                setSortOrder("desc");
              }}
            >
              Size (largest first)
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Processing Documents */}
      {processingDocs.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-muted-foreground">
            Processing ({processingDocs.length})
          </h3>
          <div className="space-y-2">
            {processingDocs.map((doc) => (
              <DocumentCard key={doc.id} document={doc} />
            ))}
          </div>
        </div>
      )}

      {/* Ready Documents */}
      {readyDocs.length > 0 && (
        <div className="space-y-2">
          {processingDocs.length > 0 && (
            <h3 className="text-sm font-medium text-muted-foreground">
              Ready ({readyDocs.length})
            </h3>
          )}
          <div className="space-y-2">
            <AnimatePresence>
              {readyDocs.map((doc) => (
                <DocumentCard
                  key={doc.id}
                  document={doc}
                  onRemove={() => onDocumentRemove?.(doc.id)}
                  onResync={() => onDocumentResync?.(doc.id)}
                  onView={() => onDocumentView?.(doc.id)}
                />
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* Error Documents */}
      {errorDocs.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-red-600 dark:text-red-400">
            Failed ({errorDocs.length})
          </h3>
          <div className="space-y-2">
            {errorDocs.map((doc) => (
              <DocumentCard
                key={doc.id}
                document={doc}
                onResync={() => onDocumentResync?.(doc.id)}
                onRemove={() => onDocumentRemove?.(doc.id)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredDocs.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <FileText className="h-12 w-12 mx-auto mb-4 opacity-30" />
          <p className="text-lg font-medium">No documents found</p>
          <p className="text-sm mt-1">
            {searchQuery
              ? "Try a different search term"
              : "Connect a data source to get started"}
          </p>
        </div>
      )}
    </div>
  );
}
