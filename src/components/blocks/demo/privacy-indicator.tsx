"use client";

import { ShieldCheck, Eye, EyeOff } from "lucide-react";

interface PrivacyIndicatorProps {
  anonymous?: boolean;
  className?: string;
}

export function PrivacyIndicator({
  anonymous = true,
  className = "",
}: PrivacyIndicatorProps) {
  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${
        anonymous
          ? "bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20"
          : "bg-muted text-muted-foreground border border-border"
      } ${className}`}
    >
      {anonymous ? (
        <>
          <ShieldCheck className="h-4 w-4" />
          <span className="font-medium">Anonymous Mode</span>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
        </>
      ) : (
        <>
          <Eye className="h-4 w-4" />
          <span>Public Mode</span>
        </>
      )}
    </div>
  );
}

interface PrivacyComparisonProps {
  className?: string;
}

export function PrivacyComparison({ className = "" }: PrivacyComparisonProps) {
  return (
    <div className={`grid md:grid-cols-2 gap-6 ${className}`}>
      {/* Employee View */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center">
            <ShieldCheck className="h-4 w-4" />
          </div>
          <div>
            <h4 className="text-sm font-semibold">Employee Experience</h4>
            <p className="text-xs text-muted-foreground">
              Complete privacy guaranteed
            </p>
          </div>
        </div>

        <div className="bg-muted rounded-lg p-4 space-y-3">
          <div className="flex items-start gap-2">
            <ShieldCheck className="h-4 w-4 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-green-600 dark:text-green-400">
                Your identity is protected
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Ask sensitive questions about leave, medical issues, or personal
                matters without anyone knowing who asked.
              </p>
            </div>
          </div>

          <div className="border-t pt-3 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Name</span>
              <span className="font-mono">***********</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Email</span>
              <span className="font-mono">***********</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Department</span>
              <span className="font-mono">***********</span>
            </div>
          </div>
        </div>
      </div>

      {/* HR Admin View */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center">
            <EyeOff className="h-4 w-4" />
          </div>
          <div>
            <h4 className="text-sm font-semibold">HR Dashboard View</h4>
            <p className="text-xs text-muted-foreground">
              Metrics without identity
            </p>
          </div>
        </div>

        <div className="bg-muted rounded-lg p-4 space-y-3">
          <div className="flex items-start gap-2">
            <Eye className="h-4 w-4 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-purple-600 dark:text-purple-400">
                Anonymous analytics only
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                HR sees what questions are being asked and how often, but never
                who asked them.
              </p>
            </div>
          </div>

          <div className="border-t pt-3 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Total Questions</span>
              <span className="font-semibold">1,247</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">This Week</span>
              <span className="font-semibold">89</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Top Topic</span>
              <span className="font-semibold">PTO Policies</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
