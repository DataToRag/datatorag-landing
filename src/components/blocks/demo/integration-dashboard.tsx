"use client";

import { useState } from "react";
import {
  CheckCircle,
  RefreshCw,
  Settings,
  AlertCircle,
  ExternalLink,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface Integration {
  id: string;
  name: string;
  icon: string;
  type: "hris" | "storage" | "calendar";
  status: "connected" | "disconnected" | "syncing" | "error";
  lastSync: string;
  dataTypes: string[];
  documentsCount: number;
  color: string;
}

export function IntegrationDashboard() {
  const [syncingId, setSyncingId] = useState<string | null>(null);
  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: "workday",
      name: "Workday",
      icon: "💼",
      type: "hris",
      status: "connected",
      lastSync: "2 hours ago",
      dataTypes: ["Employee Data", "Org Charts", "Job Descriptions"],
      documentsCount: 24,
      color: "bg-orange-500",
    },
    {
      id: "google-drive",
      name: "Google Drive",
      icon: "📁",
      type: "storage",
      status: "connected",
      lastSync: "15 minutes ago",
      dataTypes: ["HR Policies", "Handbooks", "Benefits Guides"],
      documentsCount: 156,
      color: "bg-blue-500",
    },
    {
      id: "bamboohr",
      name: "BambooHR",
      icon: "🎋",
      type: "hris",
      status: "connected",
      lastSync: "1 hour ago",
      dataTypes: ["Benefits Info", "Time Off Policies", "Employee Records"],
      documentsCount: 89,
      color: "bg-green-500",
    },
    {
      id: "sharepoint",
      name: "SharePoint",
      icon: "📊",
      type: "storage",
      status: "connected",
      lastSync: "3 hours ago",
      dataTypes: ["Compliance Docs", "Training Materials", "Forms"],
      documentsCount: 203,
      color: "bg-purple-500",
    },
    {
      id: "adp",
      name: "ADP Workforce",
      icon: "💰",
      type: "hris",
      status: "disconnected",
      lastSync: "Never",
      dataTypes: ["Payroll Info", "Tax Documents"],
      documentsCount: 0,
      color: "bg-gray-500",
    },
  ]);

  const handleSync = (integrationId: string) => {
    setSyncingId(integrationId);
    setIntegrations((prev) =>
      prev.map((int) =>
        int.id === integrationId ? { ...int, status: "syncing" as const } : int
      )
    );

    setTimeout(() => {
      setIntegrations((prev) =>
        prev.map((int) =>
          int.id === integrationId
            ? { ...int, status: "connected" as const, lastSync: "Just now" }
            : int
        )
      );
      setSyncingId(null);
    }, 3000);
  };

  const connectedCount = integrations.filter(
    (int) => int.status === "connected"
  ).length;
  const totalDocuments = integrations.reduce(
    (sum, int) => sum + int.documentsCount,
    0
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-2xl font-bold">HRIS & Document Integrations</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Connect your HR systems to automatically sync policies and employee
          data
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-green-500/20 text-green-600 dark:text-green-400 flex items-center justify-center">
              <CheckCircle className="h-4 w-4" />
            </div>
            <p className="text-sm text-muted-foreground">Connected</p>
          </div>
          <p className="text-3xl font-bold">
            {connectedCount}/{integrations.length}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Active integrations
          </p>
        </div>

        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <RefreshCw className="h-4 w-4" />
            </div>
            <p className="text-sm text-muted-foreground">Auto-Sync</p>
          </div>
          <p className="text-3xl font-bold">Every 1h</p>
          <p className="text-xs text-muted-foreground mt-1">
            Automatic updates
          </p>
        </div>

        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center">
              <Calendar className="h-4 w-4" />
            </div>
            <p className="text-sm text-muted-foreground">Total Documents</p>
          </div>
          <p className="text-3xl font-bold">{totalDocuments}</p>
          <p className="text-xs text-muted-foreground mt-1">
            Synced from all sources
          </p>
        </div>
      </div>

      {/* Integration Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {integrations.map((integration) => (
          <div
            key={integration.id}
            className={`border rounded-lg p-4 transition-all ${
              integration.status === "syncing"
                ? "bg-blue-500/5 border-blue-500/20 shadow-lg"
                : integration.status === "disconnected"
                  ? "opacity-60"
                  : ""
            }`}
          >
            <div className="flex items-start gap-4">
              {/* Icon */}
              <div
                className={`w-12 h-12 rounded-lg ${integration.color}/20 flex items-center justify-center flex-shrink-0 text-2xl`}
              >
                {integration.icon}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">{integration.name}</h4>
                  {integration.status === "connected" && (
                    <div className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      <span>Connected</span>
                    </div>
                  )}
                  {integration.status === "syncing" && (
                    <div className="flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400">
                      <RefreshCw className="w-3 h-3 animate-spin" />
                      <span>Syncing...</span>
                    </div>
                  )}
                  {integration.status === "disconnected" && (
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <AlertCircle className="w-3 h-3" />
                      <span>Not connected</span>
                    </div>
                  )}
                </div>

                {/* Data Types */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {integration.dataTypes.map((type, index) => (
                    <span
                      key={index}
                      className="text-xs px-2 py-0.5 rounded-full bg-muted"
                    >
                      {type}
                    </span>
                  ))}
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{integration.documentsCount} documents synced</span>
                  <span>Last sync: {integration.lastSync}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 mt-4">
              {integration.status === "connected" && (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleSync(integration.id)}
                    disabled={syncingId === integration.id}
                  >
                    {syncingId === integration.id ? (
                      <>
                        <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
                        Syncing...
                      </>
                    ) : (
                      <>
                        <RefreshCw className="h-3 w-3 mr-1" />
                        Sync Now
                      </>
                    )}
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Settings className="h-3 w-3 mr-1" />
                    Configure
                  </Button>
                </>
              )}
              {integration.status === "disconnected" && (
                <Button variant="default" size="sm">
                  <ExternalLink className="h-3 w-3 mr-1" />
                  Connect
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Info Box */}
      <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
        <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-2">
          🔄 How It Works
        </p>
        <ul className="text-xs text-muted-foreground space-y-1">
          <li>
            • Integrations automatically sync documents every hour
            (configurable)
          </li>
          <li>• New documents are detected and processed immediately</li>
          <li>• Updated documents replace old versions automatically</li>
          <li>• Deleted documents are removed from the knowledge base</li>
          <li>
            • All synced data stays on our secure servers (never shared with
            third parties)
          </li>
        </ul>
      </div>
    </div>
  );
}
