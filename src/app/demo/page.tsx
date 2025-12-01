"use client";

import { useState } from "react";
import { AdminDashboard } from "@/components/blocks/demo/admin-dashboard";
import { DocumentManager } from "@/components/blocks/demo/document-manager";
import { AskAnswerDemo } from "@/components/blocks/demo/ask-answer-demo";
import { FeatureSuggestions } from "@/components/blocks/demo/feature-suggestions";
import { Button } from "@/components/ui/button";
import {
  Settings,
  ArrowLeft,
  FileText,
  MessageSquare,
  Lightbulb,
} from "lucide-react";
import Link from "next/link";

const iconMap = {
  FileText,
  MessageSquare,
  Settings,
  Lightbulb,
};

interface DemoTab {
  id: string;
  title: string;
  description: string;
  icon: keyof typeof iconMap;
}

const DEMO_TABS: DemoTab[] = [
  {
    id: "documents",
    title: "Documents",
    description: "Manage your knowledge base",
    icon: "FileText",
  },
  {
    id: "ask-answer",
    title: "Ask & Answer",
    description: "See AI responses with sources",
    icon: "MessageSquare",
  },
  {
    id: "admin",
    title: "Admin",
    description: "Dashboard, alerts, and privacy",
    icon: "Settings",
  },
  {
    id: "features",
    title: "Features",
    description: "Explore more capabilities",
    icon: "Lightbulb",
  },
];

export default function DemoPage() {
  const [activeTab, setActiveTab] = useState("documents");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <div className="h-6 w-px bg-border" />
              <div>
                <h1 className="text-xl font-bold">
                  DatatoRAG Interactive Demo
                </h1>
                <p className="text-sm text-muted-foreground">
                  Experience the future of HR knowledge management
                </p>
              </div>
            </div>
            <Link
              href="https://tally.so/r/wa8p9q"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button>Join Waitlist</Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Horizontal Tabs */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {DEMO_TABS.map((tab) => {
              const TabIcon = iconMap[tab.icon];
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-lg border transition-all ${
                    isActive
                      ? "bg-primary text-primary-foreground border-primary shadow-md"
                      : "bg-muted hover:bg-muted/80 border-transparent hover:border-border"
                  }`}
                >
                  <TabIcon className="h-4 w-4" />
                  <div className="text-left">
                    <p className="font-semibold text-sm">{tab.title}</p>
                    <p
                      className={`text-xs ${
                        isActive
                          ? "text-primary-foreground/80"
                          : "text-muted-foreground"
                      }`}
                    >
                      {tab.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Info text */}
          <p className="text-xs text-muted-foreground mt-3">
            All responses are pre-scripted to demonstrate core features. The
            actual product uses advanced AI with your real HR documents.
          </p>
        </div>

        {/* Main content area */}
        <div className="min-h-[600px]">
          <div className="bg-card border rounded-lg shadow-lg overflow-hidden">
            {/* Tab content */}
            <div className={activeTab === "documents" ? "p-0" : "p-6"}>
              {activeTab === "documents" && <DocumentManager />}
              {activeTab === "ask-answer" && <AskAnswerDemo />}
              {activeTab === "admin" && <AdminDashboard />}
              {activeTab === "features" && <FeatureSuggestions />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
