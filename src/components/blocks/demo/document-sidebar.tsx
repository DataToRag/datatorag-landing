"use client";

import { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  Folder,
  FileText,
  Clock,
  Database,
  Plus,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  MOCK_DATA_SOURCES,
  MOCK_KNOWLEDGE_DOCUMENTS,
  type DataSourceId,
} from "@/lib/demo-data";

// Data source icons as simple SVG components
const DataSourceIcons: Record<
  DataSourceId,
  React.FC<{ className?: string }>
> = {
  // Document Storage
  gdrive: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M4.433 22l-1.9-3.3 7.367-12.757 1.9 3.3L4.433 22zm15.134 0H4.433l1.9-3.3h15.134l-1.9 3.3zM12 6.943l1.9-3.3L21.267 16l-1.9 3.3L12 6.943z" />
    </svg>
  ),
  sharepoint: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
    </svg>
  ),
  notion: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M4 4h16v16H4V4zm2 2v12h12V6H6z" />
    </svg>
  ),
  confluence: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
    </svg>
  ),
  dropbox: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M6 2l6 4-6 4 6 4-6 4 6-4 6 4-6-4 6-4-6-4 6 4-6-4-6 4z" />
    </svg>
  ),
  // HRIS Systems
  workday: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="4" fill="white" />
    </svg>
  ),
  bamboohr: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <rect width="24" height="24" rx="4" />
      <path
        d="M7 18V8c0-1 .5-2 2-2h1c1 0 2 .5 2 2v4c0 1 .5 2 2 2h1c1 0 2-.5 2-2V6"
        stroke="white"
        strokeWidth="2"
        fill="none"
      />
    </svg>
  ),
  adp: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <rect width="24" height="24" rx="4" />
    </svg>
  ),
};

interface DocumentSidebarProps {
  activeView: "sources" | "all" | "recent";
  onViewChange: (view: "sources" | "all" | "recent") => void;
  selectedSource: DataSourceId | null;
  onSourceSelect: (source: DataSourceId | null) => void;
  onAddSource: () => void;
}

export function DocumentSidebar({
  activeView,
  onViewChange,
  selectedSource,
  onSourceSelect,
  onAddSource,
}: DocumentSidebarProps) {
  const [sourcesExpanded, setSourcesExpanded] = useState(true);

  const connectedSources = MOCK_DATA_SOURCES.filter((s) => s.connected);
  const recentDocs = MOCK_KNOWLEDGE_DOCUMENTS.slice(0, 5);

  return (
    <div className="w-60 border-r bg-muted/30 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b">
        <div className="flex items-center gap-2">
          <Database className="h-5 w-5 text-primary" />
          <span className="font-semibold">Knowledge Base</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-2">
        {/* All Documents */}
        <button
          onClick={() => {
            onViewChange("all");
            onSourceSelect(null);
          }}
          className={cn(
            "w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors",
            activeView === "all" && !selectedSource
              ? "bg-primary/10 text-primary font-medium"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          )}
        >
          <Folder className="h-4 w-4" />
          <span>All Documents</span>
          <span className="ml-auto text-xs opacity-60">
            {MOCK_KNOWLEDGE_DOCUMENTS.length}
          </span>
        </button>

        {/* Sources Section */}
        <div className="mt-4">
          <div className="flex items-center gap-1 px-3 py-1.5">
            <button
              onClick={() => setSourcesExpanded(!sourcesExpanded)}
              className="flex items-center gap-1 text-xs font-medium text-muted-foreground uppercase tracking-wider hover:text-foreground"
            >
              {sourcesExpanded ? (
                <ChevronDown className="h-3 w-3" />
              ) : (
                <ChevronRight className="h-3 w-3" />
              )}
              Sources
            </button>
            <button
              onClick={onAddSource}
              className="ml-auto p-1 rounded hover:bg-muted"
            >
              <Plus className="h-3 w-3" />
            </button>
          </div>

          {sourcesExpanded && (
            <div className="mt-1 space-y-0.5">
              {connectedSources.map((source) => {
                const Icon = DataSourceIcons[source.id];
                const docCount = MOCK_KNOWLEDGE_DOCUMENTS.filter(
                  (d) => d.source === source.id
                ).length;

                return (
                  <button
                    key={source.id}
                    onClick={() => {
                      onViewChange("sources");
                      onSourceSelect(source.id);
                    }}
                    className={cn(
                      "w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors",
                      selectedSource === source.id
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="truncate">{source.name}</span>
                    <span className="ml-auto text-xs opacity-60">
                      {docCount}
                    </span>
                  </button>
                );
              })}

              {connectedSources.length === 0 && (
                <p className="px-3 py-2 text-xs text-muted-foreground">
                  No sources connected
                </p>
              )}
            </div>
          )}
        </div>

        {/* Recent Section */}
        <div className="mt-4">
          <button
            onClick={() => {
              onViewChange("recent");
              onSourceSelect(null);
            }}
            className="w-full flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-muted-foreground uppercase tracking-wider hover:text-foreground"
          >
            <Clock className="h-3 w-3" />
            Recent
          </button>
          <div className="mt-1 space-y-0.5">
            {recentDocs.map((doc) => (
              <button
                key={doc.id}
                className="w-full flex items-center gap-2 px-3 py-1.5 rounded-md text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              >
                <FileText className="h-3.5 w-3.5 flex-shrink-0" />
                <span className="truncate text-xs">{doc.name}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Footer Stats */}
      <div className="p-4 border-t bg-muted/50">
        <div className="text-xs text-muted-foreground space-y-1">
          <div className="flex justify-between">
            <span>Total Documents</span>
            <span className="font-medium text-foreground">
              {MOCK_KNOWLEDGE_DOCUMENTS.length}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Total Chunks</span>
            <span className="font-medium text-foreground">
              {MOCK_KNOWLEDGE_DOCUMENTS.reduce((acc, d) => acc + d.chunks, 0)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
