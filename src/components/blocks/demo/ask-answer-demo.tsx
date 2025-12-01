"use client";

import { useState } from "react";
import { ChatInterface } from "./chat-interface";
import { SynthesisVisualizer } from "./synthesis-visualizer";
import { AccuracyComparisonPanel } from "./accuracy-comparison-panel";
import { MessageSquare, Sparkles, Target } from "lucide-react";

type ViewMode = "chat" | "synthesis" | "accuracy";

export function AskAnswerDemo() {
  const [viewMode, setViewMode] = useState<ViewMode>("chat");

  const views = [
    {
      id: "chat" as ViewMode,
      title: "Chat with Sources",
      description: "Ask questions and see cited answers",
      icon: MessageSquare,
    },
    {
      id: "synthesis" as ViewMode,
      title: "Multi-Source Synthesis",
      description: "Watch answers built from multiple docs",
      icon: Sparkles,
    },
    {
      id: "accuracy" as ViewMode,
      title: "Accuracy Guarantee",
      description: "Same question = same answer",
      icon: Target,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Sub-navigation */}
      <div className="flex flex-wrap gap-2 border-b pb-4">
        {views.map((view) => {
          const ViewIcon = view.icon;
          const isActive = viewMode === view.id;
          return (
            <button
              key={view.id}
              onClick={() => setViewMode(view.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all ${
                isActive
                  ? "bg-primary/10 text-primary border border-primary/20"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              <ViewIcon className="h-4 w-4" />
              <div className="text-left">
                <p className="font-medium">{view.title}</p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Content */}
      {viewMode === "chat" && <ChatView />}
      {viewMode === "synthesis" && <SynthesisVisualizer />}
      {viewMode === "accuracy" && <AccuracyView />}
    </div>
  );
}

function ChatView() {
  return (
    <div className="space-y-4">
      <div className="bg-muted rounded-lg p-4">
        <p className="text-sm text-center text-muted-foreground">
          Try asking:{" "}
          <strong className="text-foreground">
            &quot;How does PTO rollover work?&quot;
          </strong>{" "}
          or{" "}
          <strong className="text-foreground">
            &quot;What health insurance options are available?&quot;
          </strong>
        </p>
      </div>

      <div className="border rounded-lg h-[500px] flex flex-col overflow-hidden">
        <ChatInterface
          initialMessages={[]}
          placeholder="Ask about benefits, PTO, or policies..."
          showSources={true}
        />
      </div>

      <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
        <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-2">
          Every answer includes sources
        </p>
        <p className="text-xs text-muted-foreground">
          Click on any source citation to see the exact document, page number,
          and section where the information came from. This builds trust and
          allows employees to verify information instantly.
        </p>
      </div>
    </div>
  );
}

function AccuracyView() {
  return (
    <div className="space-y-6">
      <AccuracyComparisonPanel />

      <div className="border-t pt-6">
        <h3 className="font-semibold mb-3">Why This Matters</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
            <p className="font-medium text-destructive mb-2">ChatGPT Problem</p>
            <p className="text-sm text-muted-foreground">
              Same question yields different answers. One employee hears 5 days
              bereavement leave, another hears 3 days. Inconsistency erodes
              trust.
            </p>
          </div>
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
            <p className="font-medium text-green-600 dark:text-green-400 mb-2">
              DatatoRAG Solution
            </p>
            <p className="text-sm text-muted-foreground">
              Deterministic responses from your documents. 10 people asking the
              same question get identical, correct answers every time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
