"use client";

import { useState } from "react";
import { ChatInterface } from "@/components/blocks/demo/chat-interface";
import { AccuracyComparisonPanel } from "@/components/blocks/demo/accuracy-comparison-panel";
import { PrivacyComparison } from "@/components/blocks/demo/privacy-indicator";
import { AdminDashboard } from "@/components/blocks/demo/admin-dashboard";
import { DocumentManager } from "@/components/blocks/demo/document-manager";
import { IntegrationDashboard } from "@/components/blocks/demo/integration-dashboard";
import { SynthesisVisualizer } from "@/components/blocks/demo/synthesis-visualizer";
import { AlertNotificationFlow } from "@/components/blocks/demo/alert-notification-flow";
import { FeatureSuggestions } from "@/components/blocks/demo/feature-suggestions";
import { Button } from "@/components/ui/button";
import {
  Target,
  ShieldCheck,
  FileSearch,
  Settings,
  ArrowLeft,
  Upload,
  Link2,
  Sparkles,
  Bell,
  Lightbulb,
} from "lucide-react";
import Link from "next/link";

const iconMap = {
  Target,
  ShieldCheck,
  FileSearch,
  Settings,
  Upload,
  Link2,
  Sparkles,
  Bell,
  Lightbulb,
};

interface DemoScenario {
  id: string;
  title: string;
  description: string;
  icon: keyof typeof iconMap;
}

const NEW_DEMO_SCENARIOS: DemoScenario[] = [
  {
    id: "document-lifecycle",
    title: "Document Management",
    description:
      "Upload, process, query, and update documents in your knowledge base",
    icon: "Upload",
  },
  {
    id: "integration",
    title: "HRIS Integrations",
    description: "Connect Workday, BambooHR, Google Drive, and more",
    icon: "Link2",
  },
  {
    id: "synthesis",
    title: "Multi-Document Synthesis",
    description: "See how answers are built from multiple sources",
    icon: "Sparkles",
  },
  {
    id: "citations",
    title: "Source Attribution",
    description: "Every answer shows exactly where information came from",
    icon: "FileSearch",
  },
  {
    id: "alerts",
    title: "Smart Alert System",
    description: "Automatic detection of sensitive topics and usage patterns",
    icon: "Bell",
  },
  {
    id: "accuracy",
    title: "Accuracy Guarantee",
    description: "Same question = same answer, every time",
    icon: "Target",
  },
  {
    id: "privacy",
    title: "Privacy & Anonymity",
    description: "Complete employee privacy with HR analytics",
    icon: "ShieldCheck",
  },
  {
    id: "admin",
    title: "HR Admin Dashboard",
    description: "Centralized control panel for all features",
    icon: "Settings",
  },
  {
    id: "features",
    title: "Additional Features",
    description: "Explore more capabilities and our roadmap",
    icon: "Lightbulb",
  },
];

export default function DemoPage() {
  const [activeScenario, setActiveScenario] = useState("document-lifecycle");

  const currentScenario = NEW_DEMO_SCENARIOS.find(
    (s) => s.id === activeScenario
  );
  const Icon = currentScenario ? iconMap[currentScenario.icon] : Upload;

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

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-[300px_1fr] gap-8">
          {/* Sidebar - Scenario navigation */}
          <div className="space-y-4">
            <div>
              <h2 className="text-sm font-semibold text-muted-foreground mb-3">
                DEMO SCENARIOS
              </h2>
              <div className="space-y-2">
                {NEW_DEMO_SCENARIOS.map((scenario) => {
                  const ScenarioIcon = iconMap[scenario.icon];
                  return (
                    <button
                      key={scenario.id}
                      onClick={() => setActiveScenario(scenario.id)}
                      className={`w-full text-left p-4 rounded-lg border transition-all ${
                        activeScenario === scenario.id
                          ? "bg-primary text-primary-foreground border-primary shadow-lg"
                          : "bg-muted hover:bg-muted/80 border-transparent"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <ScenarioIcon className="h-5 w-5 flex-shrink-0 mt-0.5" />
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm">
                            {scenario.title}
                          </p>
                          <p
                            className={`text-xs mt-1 ${
                              activeScenario === scenario.id
                                ? "text-primary-foreground/80"
                                : "text-muted-foreground"
                            }`}
                          >
                            {scenario.description}
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Info card */}
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
              <p className="text-sm text-blue-600 dark:text-blue-400 font-medium mb-2">
                💡 About this demo
              </p>
              <p className="text-xs text-muted-foreground">
                All responses are pre-scripted to demonstrate our core features.
                The actual product uses advanced AI models with your real HR
                documents.
              </p>
            </div>
          </div>

          {/* Main content area */}
          <div className="lg:min-h-[600px]">
            <div className="bg-card border rounded-lg shadow-lg overflow-hidden">
              {/* Scenario header */}
              <div className="bg-muted px-6 py-4 border-b">
                <div className="flex items-center gap-3">
                  {Icon && (
                    <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                      <Icon className="h-5 w-5" />
                    </div>
                  )}
                  <div className="flex-1">
                    <h2 className="text-xl font-bold">
                      {currentScenario?.title}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {currentScenario?.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Scenario content */}
              <div
                className={
                  activeScenario === "document-lifecycle" ? "p-0" : "p-6"
                }
              >
                {activeScenario === "document-lifecycle" && <DocumentManager />}
                {activeScenario === "integration" && <IntegrationDashboard />}
                {activeScenario === "synthesis" && <SynthesisVisualizer />}
                {activeScenario === "citations" && <CitationsScenario />}
                {activeScenario === "alerts" && <AlertNotificationFlow />}
                {activeScenario === "accuracy" && <AccuracyScenario />}
                {activeScenario === "privacy" && <PrivacyScenario />}
                {activeScenario === "admin" && <AdminScenario />}
                {activeScenario === "features" && <FeatureSuggestions />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AccuracyScenario() {
  return (
    <div className="space-y-6">
      <AccuracyComparisonPanel />

      <div className="border-t pt-6">
        <h3 className="font-semibold mb-3">Why This Matters</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
            <p className="font-medium text-destructive mb-2">
              ❌ ChatGPT Problem
            </p>
            <p className="text-sm text-muted-foreground">
              Same question yields different answers. One employee hears 5 days
              bereavement leave, another hears 3 days. Inconsistency erodes
              trust.
            </p>
          </div>
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
            <p className="font-medium text-green-600 dark:text-green-400 mb-2">
              ✅ DatatoRAG Solution
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

function PrivacyScenario() {
  return (
    <div className="space-y-6">
      <div className="bg-muted rounded-lg p-4">
        <p className="text-sm text-center text-muted-foreground">
          Try asking a sensitive question like:{" "}
          <strong className="text-foreground">
            &quot;I experienced a miscarriage. What leave options do I
            have?&quot;
          </strong>
        </p>
      </div>

      <div className="grid lg:grid-cols-[1fr_300px] gap-6">
        {/* Chat interface */}
        <div className="border rounded-lg h-[500px] flex flex-col overflow-hidden">
          <ChatInterface
            initialMessages={[]}
            placeholder="Ask a sensitive HR question anonymously..."
            showSources={true}
            anonymous={true}
          />
        </div>

        {/* Privacy comparison sidebar */}
        <div className="space-y-4">
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
            <p className="text-sm font-medium text-green-600 dark:text-green-400 mb-2">
              🔒 Complete Anonymity
            </p>
            <ul className="text-xs text-muted-foreground space-y-2">
              <li>• No name tracking</li>
              <li>• No email logging</li>
              <li>• No department visibility</li>
              <li>• No manager notifications</li>
            </ul>
          </div>

          <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
            <p className="text-sm font-medium text-purple-600 dark:text-purple-400 mb-2">
              📊 HR Sees Metrics Only
            </p>
            <ul className="text-xs text-muted-foreground space-y-2">
              <li>• Question frequency</li>
              <li>• Topic trends</li>
              <li>• Alert flags (harassment, etc.)</li>
              <li>• But NEVER who asked</li>
            </ul>
          </div>
        </div>
      </div>

      <PrivacyComparison />
    </div>
  );
}

function CitationsScenario() {
  return (
    <div className="space-y-6">
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

      <div className="border rounded-lg h-[600px] flex flex-col overflow-hidden">
        <ChatInterface
          initialMessages={[]}
          placeholder="Ask about benefits, PTO, or policies..."
          showSources={true}
        />
      </div>

      <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
        <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-2">
          📚 Every answer includes sources
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

function AdminScenario() {
  return (
    <div className="space-y-6">
      <AdminDashboard />

      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-muted rounded-lg p-4">
          <p className="text-sm font-medium mb-2">📄 Document Management</p>
          <p className="text-xs text-muted-foreground">
            Upload, update, or remove documents anytime. Changes sync instantly.
          </p>
        </div>
        <div className="bg-muted rounded-lg p-4">
          <p className="text-sm font-medium mb-2">🚨 Smart Alerts</p>
          <p className="text-xs text-muted-foreground">
            Get notified about sensitive topics without compromising anonymity.
          </p>
        </div>
        <div className="bg-muted rounded-lg p-4">
          <p className="text-sm font-medium mb-2">📊 Analytics Dashboard</p>
          <p className="text-xs text-muted-foreground">
            Track question trends and identify knowledge gaps.
          </p>
        </div>
      </div>
    </div>
  );
}
