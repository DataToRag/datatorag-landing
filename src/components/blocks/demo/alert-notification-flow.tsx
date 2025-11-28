"use client";

import { useState, useEffect } from "react";
import { AlertCircle, Bell, CheckCircle, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Alert {
  id: string;
  type: "harassment" | "policy-spike" | "unusual-pattern";
  title: string;
  description: string;
  question: string;
  priority: "high" | "medium" | "low";
  status: "new" | "reviewing" | "resolved";
  icon: string;
  color: string;
  timestamp: string;
}

const DEMO_ALERTS: Alert[] = [
  {
    id: "alert1",
    type: "harassment",
    title: "Harassment Question Detected",
    description:
      "An anonymous employee asked about reporting workplace harassment",
    question: "How do I report harassment at work?",
    priority: "high",
    status: "new",
    icon: "🚨",
    color: "red",
    timestamp: "2 minutes ago",
  },
  {
    id: "alert2",
    type: "policy-spike",
    title: "PTO Policy Question Spike",
    description:
      "50+ questions about PTO policy in the last 24 hours (300% increase)",
    question: "Various PTO-related questions",
    priority: "medium",
    status: "new",
    icon: "⚠️",
    color: "orange",
    timestamp: "1 hour ago",
  },
  {
    id: "alert3",
    type: "unusual-pattern",
    title: "New Topic Emerging",
    description:
      "15 questions about 'remote work policy' - not previously asked",
    question: "What's the remote work policy?",
    priority: "low",
    status: "new",
    icon: "📊",
    color: "blue",
    timestamp: "3 hours ago",
  },
];

export function AlertNotificationFlow() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [visibleAlerts, setVisibleAlerts] = useState<Alert[]>([]);
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);

  const steps = [
    {
      title: "Alert Detected",
      description: "System identifies a sensitive question",
    },
    {
      title: "Alert Created",
      description: "Alert logged with context and priority",
    },
    { title: "HR Notified", description: "Alert appears in HR dashboard" },
    {
      title: "HR Reviews",
      description: "HR team can see pattern without identity",
    },
    { title: "Action Taken", description: "HR can respond proactively" },
  ];

  useEffect(() => {
    if (!isPlaying) return;

    const timer = setTimeout(() => {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);

        // Add alerts progressively
        if (currentStep === 1 && visibleAlerts.length === 0) {
          setVisibleAlerts([DEMO_ALERTS[0]]);
        } else if (currentStep === 2 && visibleAlerts.length === 1) {
          setVisibleAlerts([DEMO_ALERTS[0], DEMO_ALERTS[1]]);
        } else if (currentStep === 3 && visibleAlerts.length === 2) {
          setVisibleAlerts(DEMO_ALERTS);
          setSelectedAlert(DEMO_ALERTS[0]);
        }
      } else {
        setIsPlaying(false);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [isPlaying, currentStep, visibleAlerts.length, steps.length]);

  const handleStart = () => {
    setCurrentStep(0);
    setIsPlaying(true);
    setVisibleAlerts([]);
    setSelectedAlert(null);
  };

  const handleReset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
    setVisibleAlerts([]);
    setSelectedAlert(null);
  };

  const getPriorityColor = (priority: Alert["priority"]) => {
    switch (priority) {
      case "high":
        return "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20";
      case "medium":
        return "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20";
      case "low":
        return "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold">Smart Alert System</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Automatically detect and flag sensitive topics while maintaining
            employee privacy
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

      {/* Progress Steps */}
      <div className="bg-muted rounded-lg p-4">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center">
              <div className="flex flex-col items-center gap-2">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                    index <= currentStep
                      ? "bg-primary text-primary-foreground scale-110"
                      : "bg-muted-foreground/20 text-muted-foreground"
                  }`}
                >
                  {index < currentStep ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : index === currentStep ? (
                    <div className="w-3 h-3 rounded-full bg-current animate-pulse" />
                  ) : (
                    <span className="text-sm font-semibold">{index + 1}</span>
                  )}
                </div>
                <div className="text-center">
                  <p
                    className={`text-xs font-medium ${index <= currentStep ? "text-foreground" : "text-muted-foreground"}`}
                  >
                    {step.title}
                  </p>
                  <p className="text-xs text-muted-foreground hidden md:block">
                    {step.description}
                  </p>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`h-0.5 w-12 mx-2 transition-all ${
                    index < currentStep
                      ? "bg-primary"
                      : "bg-muted-foreground/20"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Alert Dashboard */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Alert List */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Active Alerts ({visibleAlerts.length})
            </h4>
            {visibleAlerts.length > 0 && (
              <span className="text-xs px-2 py-1 rounded-full bg-red-500/10 text-red-600 dark:text-red-400">
                {visibleAlerts.filter((a) => a.priority === "high").length} High
                Priority
              </span>
            )}
          </div>

          {visibleAlerts.length === 0 ? (
            <div className="border rounded-lg p-8 text-center">
              <Bell className="h-12 w-12 mx-auto mb-2 text-muted-foreground opacity-50" />
              <p className="text-sm text-muted-foreground">No alerts yet</p>
            </div>
          ) : (
            visibleAlerts.map((alert, index) => (
              <div
                key={alert.id}
                className={`border rounded-lg p-4 cursor-pointer transition-all animate-in fade-in slide-in-from-right-2 ${getPriorityColor(
                  alert.priority
                )} ${selectedAlert?.id === alert.id ? "ring-2 ring-current scale-105" : "hover:scale-102"}`}
                style={{ animationDelay: `${index * 200}ms` }}
                onClick={() => setSelectedAlert(alert)}
              >
                <div className="flex items-start gap-3">
                  <div className="text-2xl">{alert.icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-semibold">{alert.title}</p>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${getPriorityColor(alert.priority)}`}
                      >
                        {alert.priority}
                      </span>
                    </div>
                    <p className="text-xs opacity-90 mb-2">
                      {alert.description}
                    </p>
                    <p className="text-xs opacity-70">{alert.timestamp}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Alert Detail */}
        <div>
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            <AlertCircle className="h-4 w-4" />
            Alert Details
          </h4>

          {selectedAlert ? (
            <div className="border rounded-lg p-4 space-y-4 animate-in fade-in slide-in-from-bottom-2">
              <div>
                <p className="text-xs text-muted-foreground mb-1">
                  Alert Type:
                </p>
                <p className="font-medium">{selectedAlert.title}</p>
              </div>

              <div>
                <p className="text-xs text-muted-foreground mb-1">
                  Question (Anonymous):
                </p>
                <div className="bg-muted rounded p-3 italic text-sm">
                  &quot;{selectedAlert.question}&quot;
                </div>
              </div>

              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <Shield className="h-4 w-4 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-green-600 dark:text-green-400">
                      Privacy Protected
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      You can see that this question was asked, but employee
                      identity is completely protected.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-xs text-muted-foreground mb-2">
                  Recommended Actions:
                </p>
                <div className="space-y-2">
                  {selectedAlert.type === "harassment" && (
                    <>
                      <div className="text-xs bg-muted rounded p-2">
                        ✓ Review anti-harassment policy visibility
                      </div>
                      <div className="text-xs bg-muted rounded p-2">
                        ✓ Consider proactive team communication
                      </div>
                      <div className="text-xs bg-muted rounded p-2">
                        ✓ Ensure reporting channels are accessible
                      </div>
                    </>
                  )}
                  {selectedAlert.type === "policy-spike" && (
                    <>
                      <div className="text-xs bg-muted rounded p-2">
                        ✓ Review PTO policy for clarity
                      </div>
                      <div className="text-xs bg-muted rounded p-2">
                        ✓ Send company-wide policy reminder
                      </div>
                    </>
                  )}
                  {selectedAlert.type === "unusual-pattern" && (
                    <>
                      <div className="text-xs bg-muted rounded p-2">
                        ✓ Create FAQ document for remote work
                      </div>
                      <div className="text-xs bg-muted rounded p-2">
                        ✓ Consider policy update or clarification
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="flex gap-2">
                <Button size="sm" className="flex-1">
                  Mark as Reviewed
                </Button>
                <Button size="sm" variant="outline">
                  Take Action
                </Button>
              </div>
            </div>
          ) : (
            <div className="border rounded-lg p-8 text-center">
              <AlertCircle className="h-12 w-12 mx-auto mb-2 text-muted-foreground opacity-50" />
              <p className="text-sm text-muted-foreground">
                Select an alert to view details
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
        <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-2">
          🔔 Alert Types
        </p>
        <div className="grid md:grid-cols-3 gap-4 text-xs">
          <div>
            <p className="font-medium mb-1">🚨 High Priority</p>
            <p className="text-muted-foreground">
              Harassment, discrimination, safety concerns
            </p>
          </div>
          <div>
            <p className="font-medium mb-1">⚠️ Medium Priority</p>
            <p className="text-muted-foreground">
              Policy question spikes, repeated confusion
            </p>
          </div>
          <div>
            <p className="font-medium mb-1">📊 Low Priority</p>
            <p className="text-muted-foreground">
              New topics emerging, usage patterns
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
