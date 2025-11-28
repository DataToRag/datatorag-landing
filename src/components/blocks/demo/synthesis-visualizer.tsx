"use client";

import { useState, useEffect } from "react";
import { FileText, Plus, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SourceSegment {
  text: string;
  sourceId: string;
  sourceName: string;
  color: string;
}

interface Document {
  id: string;
  name: string;
  icon: string;
  color: string;
  bgColor: string;
  textColor: string;
}

export function SynthesisVisualizer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [visibleSegments, setVisibleSegments] = useState<number>(0);

  const question =
    "What's my total time off including PTO, sick days, and parental leave?";

  const documents: Document[] = [
    {
      id: "pto",
      name: "PTO Policy 2025",
      icon: "🏖️",
      color: "blue",
      bgColor: "bg-blue-500/10",
      textColor: "text-blue-600 dark:text-blue-400",
    },
    {
      id: "sick",
      name: "Sick Leave Policy",
      icon: "🏥",
      color: "green",
      bgColor: "bg-green-500/10",
      textColor: "text-green-600 dark:text-green-400",
    },
    {
      id: "parental",
      name: "Parental Leave Guide",
      icon: "👶",
      color: "purple",
      bgColor: "bg-purple-500/10",
      textColor: "text-purple-600 dark:text-purple-400",
    },
  ];

  const segments: SourceSegment[] = [
    {
      text: "You are entitled to 15 days of PTO annually (1.25 days per month).",
      sourceId: "pto",
      sourceName: "PTO Policy 2025",
      color: "blue",
    },
    {
      text: " Additionally, you receive 10 days of sick leave per year.",
      sourceId: "sick",
      sourceName: "Sick Leave Policy",
      color: "green",
    },
    {
      text: " For parental leave, primary caregivers receive 16 weeks of paid leave, while secondary caregivers receive 8 weeks.",
      sourceId: "parental",
      sourceName: "Parental Leave Guide",
      color: "purple",
    },
    {
      text: " In total, that's 25 days for PTO and sick leave combined, plus up to 16 weeks for parental leave.",
      sourceId: "synthesis",
      sourceName: "Synthesized Answer",
      color: "orange",
    },
  ];

  useEffect(() => {
    if (!isPlaying) return;

    if (currentStep === 0) {
      // Show documents
      const timer = setTimeout(() => setCurrentStep(1), 1000);
      return () => clearTimeout(timer);
    }

    if (currentStep === 1 && visibleSegments < segments.length) {
      // Show segments one by one
      const timer = setTimeout(() => {
        setVisibleSegments(visibleSegments + 1);
        if (visibleSegments + 1 >= segments.length) {
          setCurrentStep(2);
        }
      }, 1500);
      return () => clearTimeout(timer);
    }

    if (currentStep === 2) {
      setIsPlaying(false);
    }
  }, [isPlaying, currentStep, visibleSegments, segments.length]);

  const handleStart = () => {
    setIsPlaying(true);
    setCurrentStep(0);
    setVisibleSegments(0);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStep(0);
    setVisibleSegments(0);
  };

  const getColorClass = (color: string, type: "bg" | "text" | "border") => {
    const colorMap: Record<string, Record<string, string>> = {
      blue: {
        bg: "bg-blue-500/10",
        text: "text-blue-600 dark:text-blue-400",
        border: "border-blue-500/20",
      },
      green: {
        bg: "bg-green-500/10",
        text: "text-green-600 dark:text-green-400",
        border: "border-green-500/20",
      },
      purple: {
        bg: "bg-purple-500/10",
        text: "text-purple-600 dark:text-purple-400",
        border: "border-purple-500/20",
      },
      orange: {
        bg: "bg-orange-500/10",
        text: "text-orange-600 dark:text-orange-400",
        border: "border-orange-500/20",
      },
    };
    return colorMap[color]?.[type] || "";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold">Multi-Document Answer Synthesis</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Watch how information from multiple sources combines into one
            accurate answer
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleStart} disabled={isPlaying}>
            {isPlaying ? "Playing..." : "Start Demo"}
          </Button>
          <Button onClick={handleReset} variant="outline">
            Reset
          </Button>
        </div>
      </div>

      {/* Question */}
      <div className="bg-muted rounded-lg p-4">
        <p className="text-sm text-muted-foreground mb-1">Question:</p>
        <p className="font-medium">{question}</p>
      </div>

      {/* Source Documents */}
      <div>
        <p className="text-sm font-semibold mb-3">Source Documents:</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {documents.map((doc, index) => (
            <div
              key={doc.id}
              className={`border rounded-lg p-4 transition-all ${
                doc.bgColor
              } ${getColorClass(doc.color, "border")} ${
                currentStep >= 1 && visibleSegments > 0
                  ? segments
                      .slice(0, visibleSegments)
                      .some((s) => s.sourceId === doc.id)
                    ? "ring-2 ring-current scale-105"
                    : "opacity-50"
                  : currentStep >= 0
                    ? "animate-in fade-in slide-in-from-bottom-2"
                    : "opacity-0"
              }`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="flex items-center gap-3">
                <div className="text-2xl">{doc.icon}</div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium ${doc.textColor}`}>
                    {doc.name}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {doc.id === "pto" && "15 days annually"}
                    {doc.id === "sick" && "10 days annually"}
                    {doc.id === "parental" && "16 weeks (primary)"}
                  </p>
                </div>
                <FileText className={`h-4 w-4 ${doc.textColor}`} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Synthesis Process */}
      {currentStep >= 1 && (
        <div className="flex items-center justify-center gap-3 animate-in fade-in">
          <div
            className={`flex items-center gap-2 ${getColorClass("blue", "text")}`}
          >
            <FileText className="h-4 w-4" />
            <span className="text-sm font-medium">PTO</span>
          </div>
          <Plus className="h-4 w-4 text-muted-foreground" />
          <div
            className={`flex items-center gap-2 ${getColorClass("green", "text")}`}
          >
            <FileText className="h-4 w-4" />
            <span className="text-sm font-medium">Sick</span>
          </div>
          <Plus className="h-4 w-4 text-muted-foreground" />
          <div
            className={`flex items-center gap-2 ${getColorClass("purple", "text")}`}
          >
            <FileText className="h-4 w-4" />
            <span className="text-sm font-medium">Parental</span>
          </div>
          <ArrowRight className="h-4 w-4 text-muted-foreground" />
          <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-medium">Synthesized</span>
          </div>
        </div>
      )}

      {/* Synthesized Answer */}
      <div className="border rounded-lg p-4 bg-muted/50">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-full bg-orange-500/20 text-orange-600 dark:text-orange-400 flex items-center justify-center">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <p className="text-sm font-semibold">Synthesized Answer:</p>
            <p className="text-xs text-muted-foreground">
              Information combined from {visibleSegments} source
              {visibleSegments !== 1 ? "s" : ""}
            </p>
          </div>
        </div>

        <div className="prose prose-sm dark:prose-invert max-w-none">
          {segments.slice(0, visibleSegments).map((segment, index) => (
            <span
              key={index}
              className={`inline-block transition-all animate-in fade-in slide-in-from-left-2 ${
                segment.sourceId === "synthesis"
                  ? "font-semibold text-orange-600 dark:text-orange-400"
                  : ""
              }`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <span
                className={`${
                  segment.sourceId !== "synthesis"
                    ? `${getColorClass(segment.color, "bg")} ${getColorClass(segment.color, "text")} px-1 rounded`
                    : ""
                }`}
                title={segment.sourceName}
              >
                {segment.text}
              </span>
            </span>
          ))}
        </div>

        {/* Source Legend */}
        {visibleSegments >= segments.length && (
          <div className="mt-4 pt-4 border-t animate-in fade-in">
            <p className="text-xs font-medium mb-2">Sources:</p>
            <div className="flex flex-wrap gap-2">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded ${doc.bgColor} ${doc.textColor}`}
                >
                  <span>{doc.icon}</span>
                  <span>{doc.name}</span>
                </div>
              ))}
              <div className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded bg-orange-500/10 text-orange-600 dark:text-orange-400">
                <Sparkles className="h-3 w-3" />
                <span>AI Synthesis</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Key Takeaway */}
      <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
        <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-2">
          💡 Why This Matters
        </p>
        <ul className="text-xs text-muted-foreground space-y-1">
          <li>
            • Answers can pull information from multiple HR documents
            simultaneously
          </li>
          <li>• Each part of the answer is color-coded to show its source</li>
          <li>
            • The AI synthesizes information intelligently (e.g., calculating
            totals)
          </li>
          <li>
            • Complete transparency - you can verify every piece of information
          </li>
        </ul>
      </div>
    </div>
  );
}
