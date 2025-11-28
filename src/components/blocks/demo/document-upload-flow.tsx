"use client";

import { useState, useEffect } from "react";
import {
  Upload,
  FileText,
  Loader2,
  CheckCircle,
  Trash2,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface UploadStep {
  id: number;
  title: string;
  description: string;
  status: "pending" | "active" | "complete";
}

interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadedAt: string;
  status: "processing" | "ready" | "updating";
  version: number;
}

export function DocumentUploadFlow() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: "doc1",
      name: "Employee Handbook 2025",
      type: "PDF",
      size: "2.4 MB",
      uploadedAt: "2025-01-15",
      status: "ready",
      version: 1,
    },
  ]);
  const [queryResult, setQueryResult] = useState<string | null>(null);

  const steps: UploadStep[] = [
    {
      id: 0,
      title: "Initial State",
      description: "Knowledge base with existing documents",
      status: "pending",
    },
    {
      id: 1,
      title: "Upload New Document",
      description: "Drag & drop 2025 Benefits Guide.pdf",
      status: "pending",
    },
    {
      id: 2,
      title: "AI Processing",
      description: "Analyzing document and extracting information...",
      status: "pending",
    },
    {
      id: 3,
      title: "Document Ready",
      description: "Document indexed and ready for queries",
      status: "pending",
    },
    {
      id: 4,
      title: "Query Document",
      description: "Ask: 'What health insurance options are available?'",
      status: "pending",
    },
    {
      id: 5,
      title: "Upload Updated Version",
      description: "Replace with updated 2025 Benefits Guide v2.pdf",
      status: "pending",
    },
    {
      id: 6,
      title: "Query Updated Document",
      description: "Ask same question to see updated answer",
      status: "pending",
    },
    {
      id: 7,
      title: "Remove Old Document",
      description: "Delete outdated Employee Handbook 2024",
      status: "pending",
    },
  ];

  useEffect(() => {
    if (!isPlaying) return;

    const timer = setTimeout(() => {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
        executeStep(currentStep + 1);
      } else {
        setIsPlaying(false);
      }
    }, 2500);

    return () => clearTimeout(timer);
  }, [currentStep, isPlaying, steps.length]);

  const executeStep = (step: number) => {
    switch (step) {
      case 1:
        // Uploading new document
        setDocuments((prev) => [
          ...prev,
          {
            id: "doc2",
            name: "2025 Benefits Guide",
            type: "PDF",
            size: "1.8 MB",
            uploadedAt: new Date().toISOString().split("T")[0],
            status: "processing",
            version: 1,
          },
        ]);
        setQueryResult(null);
        break;
      case 2:
        // Processing
        break;
      case 3:
        // Document ready
        setDocuments((prev) =>
          prev.map((doc) =>
            doc.id === "doc2" ? { ...doc, status: "ready" as const } : doc
          )
        );
        break;
      case 4:
        // Query result
        setQueryResult(
          "We offer three health insurance tiers: Bronze ($50/month), Silver ($150/month), and Gold ($250/month). All plans include dental and vision coverage."
        );
        break;
      case 5:
        // Upload v2
        setDocuments((prev) =>
          prev.map((doc) =>
            doc.id === "doc2"
              ? { ...doc, status: "updating" as const, version: 2 }
              : doc
          )
        );
        setTimeout(() => {
          setDocuments((prev) =>
            prev.map((doc) =>
              doc.id === "doc2" ? { ...doc, status: "ready" as const } : doc
            )
          );
        }, 1500);
        break;
      case 6:
        // Updated query result
        setQueryResult(
          "We offer three health insurance tiers: Bronze ($40/month - NEW PRICE), Silver ($140/month - NEW PRICE), and Gold ($240/month - NEW PRICE). All plans now include dental, vision, AND mental health coverage."
        );
        break;
      case 7:
        // Remove old document
        setDocuments((prev) => prev.filter((doc) => doc.id !== "doc1"));
        break;
    }
  };

  const handleStart = () => {
    setCurrentStep(0);
    setIsPlaying(true);
    setDocuments([
      {
        id: "doc1",
        name: "Employee Handbook 2025",
        type: "PDF",
        size: "2.4 MB",
        uploadedAt: "2025-01-15",
        status: "ready",
        version: 1,
      },
    ]);
    setQueryResult(null);
  };

  const handleReset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
    setDocuments([
      {
        id: "doc1",
        name: "Employee Handbook 2025",
        type: "PDF",
        size: "2.4 MB",
        uploadedAt: "2025-01-15",
        status: "ready",
        version: 1,
      },
    ]);
    setQueryResult(null);
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold">Document Lifecycle Demo</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Watch how documents are uploaded, processed, queried, and updated
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={handleStart}
            disabled={isPlaying}
            variant={isPlaying ? "outline" : "default"}
          >
            {isPlaying ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Playing...
              </>
            ) : (
              <>
                <RefreshCw className="h-4 w-4 mr-2" />
                Start Demo
              </>
            )}
          </Button>
          <Button onClick={handleReset} variant="outline">
            Reset
          </Button>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="bg-muted rounded-lg p-4">
        <div className="space-y-3">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`flex items-start gap-3 transition-all ${
                index === currentStep
                  ? "opacity-100 scale-100"
                  : index < currentStep
                    ? "opacity-60 scale-95"
                    : "opacity-30 scale-95"
              }`}
            >
              <div
                className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  index < currentStep
                    ? "bg-green-500/20 text-green-600 dark:text-green-400"
                    : index === currentStep
                      ? "bg-primary/20 text-primary"
                      : "bg-muted-foreground/20 text-muted-foreground"
                }`}
              >
                {index < currentStep ? (
                  <CheckCircle className="h-4 w-4" />
                ) : (
                  <span className="text-sm font-semibold">{index + 1}</span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className={`text-sm font-medium ${
                    index === currentStep ? "text-foreground" : ""
                  }`}
                >
                  {step.title}
                </p>
                <p className="text-xs text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Document List */}
      <div className="border rounded-lg">
        <div className="p-4 border-b bg-muted/50">
          <h4 className="font-semibold flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Knowledge Base Documents ({documents.length})
          </h4>
        </div>
        <div className="divide-y">
          {documents.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              <Upload className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No documents yet</p>
            </div>
          ) : (
            documents.map((doc) => (
              <div
                key={doc.id}
                className={`p-4 flex items-center gap-4 transition-all ${
                  doc.status === "processing" || doc.status === "updating"
                    ? "bg-blue-500/5 animate-pulse"
                    : ""
                }`}
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                  <FileText className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-medium truncate">{doc.name}</p>
                    {doc.version > 1 && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400">
                        v{doc.version}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-muted-foreground">
                      {doc.type} • {doc.size}
                    </span>
                    {doc.status === "processing" && (
                      <span className="text-xs text-blue-600 dark:text-blue-400 flex items-center gap-1">
                        <Loader2 className="h-3 w-3 animate-spin" />
                        Processing...
                      </span>
                    )}
                    {doc.status === "updating" && (
                      <span className="text-xs text-blue-600 dark:text-blue-400 flex items-center gap-1">
                        <Loader2 className="h-3 w-3 animate-spin" />
                        Updating...
                      </span>
                    )}
                    {doc.status === "ready" && (
                      <span className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1">
                        <CheckCircle className="h-3 w-3" />
                        Ready
                      </span>
                    )}
                  </div>
                </div>
                {doc.status === "ready" &&
                  currentStep >= 7 &&
                  doc.id === "doc1" && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Query Result */}
      {queryResult && (
        <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4 animate-in fade-in slide-in-from-bottom-2">
          <div className="flex items-start gap-2">
            <div className="w-8 h-8 rounded-full bg-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center flex-shrink-0">
              <CheckCircle className="h-4 w-4" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-purple-600 dark:text-purple-400 mb-1">
                Query Result:
              </p>
              <p className="text-sm">{queryResult}</p>
              {currentStep === 6 && (
                <div className="mt-2 text-xs text-green-600 dark:text-green-400 font-medium">
                  ✓ Answer updated to reflect new document version
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Key Takeaways */}
      <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
        <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-2">
          💡 Key Features Demonstrated
        </p>
        <ul className="text-xs text-muted-foreground space-y-1">
          <li>• Documents are processed and indexed automatically</li>
          <li>• Answers update immediately when documents are replaced</li>
          <li>• Old documents are completely removed (unlike ChatGPT)</li>
          <li>
            • Version control ensures you&apos;re always using latest
            information
          </li>
        </ul>
      </div>
    </div>
  );
}
