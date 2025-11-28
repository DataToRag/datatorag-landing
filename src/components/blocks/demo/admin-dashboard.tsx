"use client";

import { MOCK_ANALYTICS } from "@/lib/demo-data";
import {
  FileText,
  AlertCircle,
  TrendingUp,
  Settings,
  Upload,
  Trash2,
  Bell,
  Shield,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<
    "overview" | "documents" | "alerts"
  >("overview");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold">HR Admin Dashboard</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Manage documents, configure alerts, and view anonymized analytics
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-green-600 dark:text-green-400" />
          <span className="text-sm text-green-600 dark:text-green-400 font-medium">
            Privacy Protected
          </span>
        </div>
      </div>

      {/* Tab navigation */}
      <div className="border-b flex gap-4">
        <button
          onClick={() => setActiveTab("overview")}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "overview"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab("documents")}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "documents"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          Documents
        </button>
        <button
          onClick={() => setActiveTab("alerts")}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "alerts"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          Alerts & Monitoring
        </button>
      </div>

      {/* Tab content */}
      <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
        {activeTab === "overview" && <OverviewTab />}
        {activeTab === "documents" && <DocumentsTab />}
        {activeTab === "alerts" && <AlertsTab />}
      </div>
    </div>
  );
}

function OverviewTab() {
  return (
    <div className="space-y-6">
      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <p className="text-sm text-muted-foreground">Total Questions</p>
          </div>
          <p className="text-3xl font-bold">{MOCK_ANALYTICS.totalQuestions}</p>
          <p className="text-xs text-green-600 dark:text-green-400 mt-1">
            +{MOCK_ANALYTICS.thisWeek} this week
          </p>
        </div>

        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            <p className="text-sm text-muted-foreground">Active Documents</p>
          </div>
          <p className="text-3xl font-bold">
            {MOCK_ANALYTICS.documents.length}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Last updated today
          </p>
        </div>

        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="h-4 w-4 text-orange-600 dark:text-orange-400" />
            <p className="text-sm text-muted-foreground">Pending Alerts</p>
          </div>
          <p className="text-3xl font-bold">{MOCK_ANALYTICS.alerts.length}</p>
          <p className="text-xs text-orange-600 dark:text-orange-400 mt-1">
            Requires attention
          </p>
        </div>
      </div>

      {/* Top questions */}
      <div className="bg-muted rounded-lg p-6">
        <h4 className="font-semibold mb-4 flex items-center gap-2">
          <TrendingUp className="h-4 w-4" />
          Most Asked Questions (Anonymous)
        </h4>
        <div className="space-y-3">
          {MOCK_ANALYTICS.topQuestions.map((item, index) => (
            <div key={index} className="flex items-center gap-3">
              <span className="text-2xl font-bold text-muted-foreground w-8">
                {index + 1}
              </span>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium">{item.question}</p>
                  <span className="text-sm text-muted-foreground">
                    {item.count} asks
                  </span>
                </div>
                <div className="w-full bg-background rounded-full h-2">
                  <div
                    className="bg-primary rounded-full h-2 transition-all"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-4 flex items-center gap-2">
          <Shield className="h-3 w-3" />
          All metrics are fully anonymized. Individual user identities are never
          tracked.
        </p>
      </div>
    </div>
  );
}

function DocumentsTab() {
  return (
    <div className="space-y-6">
      {/* Upload section */}
      <div className="bg-muted rounded-lg p-6 border-2 border-dashed">
        <div className="text-center space-y-3">
          <Upload className="h-12 w-12 mx-auto text-muted-foreground" />
          <div>
            <h4 className="font-semibold">Upload HR Documents</h4>
            <p className="text-sm text-muted-foreground mt-1">
              Drag and drop files or click to browse
            </p>
          </div>
          <Button variant="outline">Choose Files</Button>
          <p className="text-xs text-muted-foreground">
            Supports PDF, DOCX, TXT • Max 50MB per file
          </p>
        </div>
      </div>

      {/* Document list */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold">Active Documents</h4>
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Sync with Google Drive
          </Button>
        </div>

        {MOCK_ANALYTICS.documents.map((doc) => (
          <div
            key={doc.id}
            className="bg-muted rounded-lg p-4 flex items-center gap-4"
          >
            <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
              <FileText className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{doc.name}</p>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-xs text-muted-foreground capitalize">
                  {doc.type}
                </span>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  Updated {new Date(doc.lastUpdated).toLocaleDateString()}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs px-2 py-1 rounded bg-green-500/10 text-green-600 dark:text-green-400">
                Active
              </span>
              <Button variant="ghost" size="sm">
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs text-muted-foreground flex items-center gap-2">
        <Shield className="h-3 w-3" />
        Documents are processed securely. Old versions are completely removed
        when replaced.
      </p>
    </div>
  );
}

function AlertsTab() {
  return (
    <div className="space-y-6">
      {/* Alert configuration */}
      <div className="bg-muted rounded-lg p-6">
        <h4 className="font-semibold mb-4 flex items-center gap-2">
          <Bell className="h-4 w-4" />
          Alert Configuration
        </h4>
        <div className="space-y-4">
          <label className="flex items-center justify-between p-3 bg-background rounded-lg">
            <div>
              <p className="text-sm font-medium">Harassment & Discrimination</p>
              <p className="text-xs text-muted-foreground mt-1">
                Alert when employees ask about harassment or discrimination
              </p>
            </div>
            <input
              type="checkbox"
              defaultChecked
              className="w-4 h-4 rounded border-gray-300"
            />
          </label>

          <label className="flex items-center justify-between p-3 bg-background rounded-lg">
            <div>
              <p className="text-sm font-medium">Medical & Sensitive Topics</p>
              <p className="text-xs text-muted-foreground mt-1">
                Alert for medical leave, bereavement, or personal issues
              </p>
            </div>
            <input
              type="checkbox"
              defaultChecked
              className="w-4 h-4 rounded border-gray-300"
            />
          </label>

          <label className="flex items-center justify-between p-3 bg-background rounded-lg">
            <div>
              <p className="text-sm font-medium">Policy Questions Spike</p>
              <p className="text-xs text-muted-foreground mt-1">
                Alert when specific policy questions increase by 50%+
              </p>
            </div>
            <input
              type="checkbox"
              className="w-4 h-4 rounded border-gray-300"
            />
          </label>
        </div>
      </div>

      {/* Recent alerts */}
      <div className="space-y-3">
        <h4 className="font-semibold">Recent Alerts</h4>
        {MOCK_ANALYTICS.alerts.map((alert) => (
          <div
            key={alert.id}
            className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4"
          >
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-orange-600 dark:text-orange-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-semibold text-orange-600 dark:text-orange-400">
                    {alert.summary}
                  </p>
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      alert.status === "pending"
                        ? "bg-orange-500/20 text-orange-600 dark:text-orange-400"
                        : "bg-blue-500/20 text-blue-600 dark:text-blue-400"
                    }`}
                  >
                    {alert.status}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  {new Date(alert.timestamp).toLocaleString()}
                </p>
                <div className="mt-3 flex gap-2">
                  <Button size="sm" variant="outline">
                    Review
                  </Button>
                  <Button size="sm" variant="ghost">
                    Dismiss
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
        <div className="flex items-start gap-2">
          <Shield className="h-4 w-4 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
              Privacy Protection
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Alerts notify you that sensitive topics are being raised, but
              never reveal who asked the question. Employee anonymity is always
              preserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
