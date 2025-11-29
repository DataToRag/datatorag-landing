"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Upload, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DocumentSidebar } from "./document-sidebar";
import { DataSourcesGrid } from "./data-sources";
import { DocumentList } from "./document-list";
import { ProcessingPipeline } from "./processing-pipeline";
import {
  MOCK_DATA_SOURCES,
  MOCK_KNOWLEDGE_DOCUMENTS,
  type DataSource,
  type KnowledgeDocument,
  type DataSourceId,
} from "@/lib/demo-data";

type View = "sources" | "all" | "recent" | "pipeline";

export function DocumentManager() {
  const [activeView, setActiveView] = useState<View>("all");
  const [selectedSource, setSelectedSource] = useState<DataSourceId | null>(
    null
  );
  const [dataSources, setDataSources] =
    useState<DataSource[]>(MOCK_DATA_SOURCES);
  const [documents, setDocuments] = useState<KnowledgeDocument[]>(
    MOCK_KNOWLEDGE_DOCUMENTS
  );
  const [showAddSourceDialog, setShowAddSourceDialog] = useState(false);
  const [showPipelineDemo, setShowPipelineDemo] = useState(false);

  const handleViewChange = (view: "sources" | "all" | "recent") => {
    setActiveView(view);
    if (view !== "sources") {
      setSelectedSource(null);
    }
  };

  const handleSourceSelect = (source: DataSourceId | null) => {
    setSelectedSource(source);
    if (source) {
      setActiveView("sources");
    }
  };

  const handleDocumentRemove = (id: string) => {
    setDocuments((prev) => prev.filter((d) => d.id !== id));
  };

  const handleDocumentResync = (id: string) => {
    setDocuments((prev) =>
      prev.map((d) =>
        d.id === id
          ? { ...d, status: "syncing" as const, lastUpdated: new Date() }
          : d
      )
    );
    // Simulate resync completion
    setTimeout(() => {
      setDocuments((prev) =>
        prev.map((d) => (d.id === id ? { ...d, status: "ready" as const } : d))
      );
    }, 2000);
  };

  const getViewTitle = () => {
    if (selectedSource) {
      const source = dataSources.find((s) => s.id === selectedSource);
      return source?.name || "Documents";
    }
    switch (activeView) {
      case "all":
        return "All Documents";
      case "recent":
        return "Recent Documents";
      case "sources":
        return "Data Sources";
      case "pipeline":
        return "Processing Pipeline";
      default:
        return "Documents";
    }
  };

  return (
    <div className="flex h-[700px] rounded-xl border bg-background overflow-hidden">
      {/* Sidebar */}
      <DocumentSidebar
        activeView={activeView === "pipeline" ? "all" : activeView}
        onViewChange={handleViewChange}
        selectedSource={selectedSource}
        onSourceSelect={handleSourceSelect}
        onAddSource={() => setShowAddSourceDialog(true)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div>
            <h2 className="text-xl font-semibold">{getViewTitle()}</h2>
            <p className="text-sm text-muted-foreground mt-0.5">
              {selectedSource
                ? `Documents synced from ${dataSources.find((s) => s.id === selectedSource)?.name}`
                : activeView === "all"
                  ? `${documents.length} documents in your knowledge base`
                  : activeView === "sources"
                    ? "Manage your connected data sources"
                    : "Recently accessed documents"}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setActiveView("pipeline");
                setShowPipelineDemo(true);
              }}
            >
              <Sparkles className="h-4 w-4 mr-2" />
              View Processing
            </Button>
            <Button size="sm" onClick={() => setShowAddSourceDialog(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Source
            </Button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6">
          <AnimatePresence mode="wait">
            {/* Pipeline Demo View */}
            {showPipelineDemo && (
              <motion.div
                key="pipeline"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="mb-4 flex items-center justify-between">
                  <div />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowPipelineDemo(false)}
                  >
                    <X className="h-4 w-4 mr-2" />
                    Close Pipeline View
                  </Button>
                </div>
                <ProcessingPipeline />
              </motion.div>
            )}

            {/* Normal Views */}
            {!showPipelineDemo && (
              <>
                {/* All Documents / Source Filtered Documents */}
                {(activeView === "all" ||
                  activeView === "recent" ||
                  selectedSource) && (
                  <motion.div
                    key="documents"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <DocumentList
                      documents={documents}
                      filterSource={selectedSource}
                      onDocumentRemove={handleDocumentRemove}
                      onDocumentResync={handleDocumentResync}
                    />
                  </motion.div>
                )}

                {/* Data Sources View */}
                {activeView === "sources" && !selectedSource && (
                  <motion.div
                    key="sources"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <DataSourcesGrid
                      sources={dataSources}
                      onSourceUpdate={setDataSources}
                    />
                  </motion.div>
                )}
              </>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Add Source Dialog */}
      <Dialog open={showAddSourceDialog} onOpenChange={setShowAddSourceDialog}>
        <DialogContent className="!max-w-[900px] w-[90vw] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Connect a Data Source</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <DataSourcesGrid
              sources={dataSources}
              onSourceUpdate={(sources) => {
                setDataSources(sources);
              }}
            />
          </div>

          {/* Manual Upload Option */}
          <div className="mt-6 pt-6 border-t">
            <h3 className="text-sm font-medium mb-3">
              Or upload files directly
            </h3>
            <div className="border-2 border-dashed rounded-lg p-8 text-center">
              <Upload className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
              <p className="text-sm text-muted-foreground mb-2">
                Drag and drop files here, or click to browse
              </p>
              <Button variant="outline" size="sm">
                Choose Files
              </Button>
              <p className="text-xs text-muted-foreground mt-2">
                Supports PDF, DOCX, TXT, MD • Max 50MB per file
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
