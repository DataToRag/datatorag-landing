"use client";

import { DocumentSource } from "@/lib/demo-data";
import { FileText, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

interface SourceCitationCardProps {
  source: DocumentSource;
}

export function SourceCitationCard({ source }: SourceCitationCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const typeLabels = {
    handbook: "Handbook",
    benefits: "Benefits Guide",
    policy: "Policy Document",
  };

  return (
    <div className="border border-border rounded-lg overflow-hidden transition-all text-foreground">
      {/* Header - Always visible */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-3 py-2 flex items-center gap-2 hover:opacity-80 transition-opacity"
      >
        <FileText className="h-4 w-4 flex-shrink-0" />
        <div className="flex-1 text-left min-w-0">
          <p className="text-xs font-medium truncate">{source.title}</p>
          {source.page && (
            <p className="text-xs text-muted-foreground">Page {source.page}</p>
          )}
        </div>
        {isExpanded ? (
          <ChevronUp className="h-4 w-4 flex-shrink-0" />
        ) : (
          <ChevronDown className="h-4 w-4 flex-shrink-0" />
        )}
      </button>

      {/* Expanded content */}
      {isExpanded && (
        <div className="px-3 pb-3 space-y-2 border-t border-border">
          {/* Type badge */}
          <div className="pt-2">
            <span className="inline-block text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
              {typeLabels[source.type]}
            </span>
          </div>

          {/* Section */}
          {source.section && (
            <div>
              <p className="text-xs font-medium text-muted-foreground">
                Section:
              </p>
              <p className="text-xs">{source.section}</p>
            </div>
          )}

          {/* Excerpt */}
          <div>
            <p className="text-xs font-medium text-muted-foreground">
              Excerpt:
            </p>
            <p className="text-xs leading-relaxed bg-muted rounded p-2 mt-1">
              {source.excerpt}
            </p>
          </div>

          {/* External link */}
          {source.url && (
            <a
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs hover:underline"
            >
              View full document
              <ExternalLink className="h-3 w-3" />
            </a>
          )}
        </div>
      )}
    </div>
  );
}
