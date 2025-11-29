"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  Loader2,
  Link2,
  RefreshCw,
  ExternalLink,
  FolderOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { type DataSource, type DataSourceId } from "@/lib/demo-data";

// Data source brand icons
const DataSourceLogos: Record<
  DataSourceId,
  React.FC<{ className?: string }>
> = {
  gdrive: ({ className }) => (
    <svg className={className} viewBox="0 0 87.3 78" fill="none">
      <path
        d="m6.6 66.85 3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8H0c0 1.55.4 3.1 1.2 4.5l5.4 9.35z"
        fill="#0066DA"
      />
      <path
        d="m43.65 25-13.75-23.8c-1.35.8-2.5 1.9-3.3 3.3l-25.4 44a9.06 9.06 0 0 0-1.2 4.5h27.5l16.15-28z"
        fill="#00AC47"
      />
      <path
        d="M73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5H59.85l5.85 10.85 7.85 12.95z"
        fill="#EA4335"
      />
      <path
        d="M43.65 25 57.4 1.2c-1.35-.8-2.9-1.2-4.5-1.2H34.35c-1.6 0-3.15.45-4.5 1.2l13.8 23.8z"
        fill="#00832D"
      />
      <path
        d="M59.8 53H27.5l-13.75 23.8c1.35.8 2.9 1.2 4.5 1.2h50.4c1.6 0 3.15-.45 4.5-1.2L59.8 53z"
        fill="#2684FC"
      />
      <path
        d="M73.4 26.5 60.65 3.3c-.8-1.4-1.95-2.5-3.3-3.3L43.6 25l16.15 28H87.3c0-1.55-.4-3.1-1.2-4.5l-12.7-22z"
        fill="#FFBA00"
      />
    </svg>
  ),
  sharepoint: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <circle cx="9" cy="9" r="7" fill="#038387" />
      <circle cx="15" cy="13" r="5" fill="#1A9BA1" />
      <circle cx="9" cy="17" r="4" fill="#37C6D0" />
    </svg>
  ),
  notion: ({ className }) => (
    <svg className={className} viewBox="0 0 100 100" fill="currentColor">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.777 9.51c3.05 2.347 4.244 2.183 10.05 1.74l54.66-3.282c1.2 0 .202-1.196-.197-1.36l-9.076-6.54c-1.788-1.36-4.193-2.85-8.747-2.52L9.37 2.57c-2.005.164-2.403 1.196-1.6 1.97l7.007 4.969zm3.178 13.84v57.467c0 3.11 1.6 4.27 5.203 4.107l59.957-3.445c3.604-.164 4.007-2.362 4.007-4.926V19.255c0-2.556-1.002-3.888-3.205-3.724l-62.76 3.61c-2.402.163-3.202 1.36-3.202 4.11zm59.163 2.685c.4 1.8 0 3.6-1.803 3.765l-2.801.528v42.448c-2.403 1.305-4.605 2.016-6.448 2.016-2.99 0-3.79-.93-6.03-3.712l-18.5-29.073v28.14l5.792 1.306s0 3.6-5.005 3.6l-13.79.793c-.401-.793 0-2.76 1.4-3.118l3.61-.958V35.168l-5.015-.397c-.4-1.8.6-4.37 3.395-4.535l14.793-.958 19.209 29.401V32.65l-4.877-.56c-.398-2.082 1.133-3.606 3.013-3.77l13.057-.786z"
      />
    </svg>
  ),
  confluence: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path
        d="M2.727 18.041c-.327.523-.68 1.108-.735 1.212a.714.714 0 00.261.96l3.42 2.058a.709.709 0 00.97-.217c.05-.085.4-.663.823-1.39 1.783-3.063 3.597-2.63 6.89-.935l3.538 1.823a.71.71 0 00.964-.296l1.847-3.661a.716.716 0 00-.315-.944c-.458-.235-1.085-.556-1.813-.924-5.856-2.969-10.96-2.79-15.85 2.314z"
        fill="url(#confluence-a)"
      />
      <path
        d="M21.273 5.959c.327-.523.68-1.108.735-1.212a.714.714 0 00-.261-.96L18.327 1.73a.709.709 0 00-.97.217c-.05.085-.4.663-.823 1.39-1.783 3.063-3.597 2.63-6.89.935L6.106 2.449a.71.71 0 00-.964.296L3.295 6.406a.716.716 0 00.315.944c.458.235 1.085.556 1.813.924 5.856 2.969 10.96 2.79 15.85-2.314z"
        fill="url(#confluence-b)"
      />
      <defs>
        <linearGradient
          id="confluence-a"
          x1="2.194"
          y1="20.564"
          x2="12.752"
          y2="14.161"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0052CC" />
          <stop offset="1" stopColor="#2684FF" />
        </linearGradient>
        <linearGradient
          id="confluence-b"
          x1="21.806"
          y1="3.436"
          x2="11.248"
          y2="9.839"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0052CC" />
          <stop offset="1" stopColor="#2684FF" />
        </linearGradient>
      </defs>
    </svg>
  ),
  dropbox: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="#0061FF">
      <path d="M6 2l6 3.75L6 9.5 0 5.75 6 2zm12 0l6 3.75-6 3.75-6-3.75L18 2zM0 13.25L6 9.5l6 3.75-6 3.75-6-3.75zm18-3.75l6 3.75-6 3.75-6-3.75 6-3.75zM6 18.25l6-3.75 6 3.75-6 3.75-6-3.75z" />
    </svg>
  ),
};

interface DataSourceCardProps {
  source: DataSource;
  onConnect: (id: DataSourceId) => void;
  onDisconnect: (id: DataSourceId) => void;
}

function DataSourceCard({
  source,
  onConnect,
  onDisconnect,
}: DataSourceCardProps) {
  const [status, setStatus] = useState<
    "idle" | "connecting" | "connected" | "disconnecting"
  >(source.connected ? "connected" : "idle");

  const Logo = DataSourceLogos[source.id];

  const handleConnect = async () => {
    setStatus("connecting");
    // Simulate connection delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setStatus("connected");
    onConnect(source.id);
  };

  const handleDisconnect = async () => {
    setStatus("disconnecting");
    await new Promise((resolve) => setTimeout(resolve, 800));
    setStatus("idle");
    onDisconnect(source.id);
  };

  const isConnected = status === "connected" || status === "disconnecting";
  const isDisconnecting = status === "disconnecting";
  const isConnecting = status === "connecting";
  const isLoading = isConnecting || isDisconnecting;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "group relative rounded-xl border p-5 transition-all duration-200",
        isConnected
          ? "border-green-500/30 bg-green-500/5"
          : "border-border bg-background hover:border-primary/30 hover:bg-muted/50"
      )}
    >
      {/* Connected badge */}
      <AnimatePresence>
        {isConnected && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute -top-2 -right-2"
          >
            <div className="flex items-center gap-1 rounded-full bg-green-500 px-2 py-0.5 text-xs font-medium text-white">
              <Check className="h-3 w-3" />
              Connected
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Logo and Info */}
      <div className="flex items-start gap-4">
        <div
          className="flex h-12 w-12 items-center justify-center rounded-lg"
          style={{ backgroundColor: `${source.color}15` }}
        >
          <Logo className="h-7 w-7" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground">{source.name}</h3>
          <p className="text-sm text-muted-foreground mt-0.5">
            {source.description}
          </p>
        </div>
      </div>

      {/* Stats (if connected) */}
      {isConnected && source.documentsCount > 0 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="mt-4 flex items-center gap-4 text-sm"
        >
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <FolderOpen className="h-4 w-4" />
            <span>{source.documentsCount} documents</span>
          </div>
          {source.lastSync && (
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <RefreshCw className="h-3.5 w-3.5" />
              <span>Synced {formatTimeAgo(source.lastSync)}</span>
            </div>
          )}
        </motion.div>
      )}

      {/* Actions */}
      <div className="mt-4 flex items-center gap-2">
        {isConnected ? (
          <>
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={handleDisconnect}
              disabled={isLoading}
            >
              {isDisconnecting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Disconnecting...
                </>
              ) : (
                <>
                  <Link2 className="h-4 w-4 mr-2" />
                  Disconnect
                </>
              )}
            </Button>
            <Button variant="ghost" size="sm">
              <ExternalLink className="h-4 w-4" />
            </Button>
          </>
        ) : (
          <Button
            size="sm"
            className="w-full"
            onClick={handleConnect}
            disabled={isLoading}
          >
            {isConnecting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Connecting...
              </>
            ) : (
              <>
                <Link2 className="h-4 w-4 mr-2" />
                Connect
              </>
            )}
          </Button>
        )}
      </div>
    </motion.div>
  );
}

function formatTimeAgo(date: Date): string {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

  if (seconds < 60) return "just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)} min ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
  return `${Math.floor(seconds / 86400)} days ago`;
}

interface DataSourcesGridProps {
  sources: DataSource[];
  onSourceUpdate: (sources: DataSource[]) => void;
}

export function DataSourcesGrid({
  sources,
  onSourceUpdate,
}: DataSourcesGridProps) {
  const handleConnect = (id: DataSourceId) => {
    onSourceUpdate(
      sources.map((s) =>
        s.id === id
          ? {
              ...s,
              connected: true,
              lastSync: new Date(),
              documentsCount: Math.floor(Math.random() * 50) + 10,
            }
          : s
      )
    );
  };

  const handleDisconnect = (id: DataSourceId) => {
    onSourceUpdate(
      sources.map((s) =>
        s.id === id
          ? { ...s, connected: false, lastSync: null, documentsCount: 0 }
          : s
      )
    );
  };

  const connectedSources = sources.filter((s) => s.connected);
  const availableSources = sources.filter((s) => !s.connected);

  return (
    <div className="space-y-8">
      {/* Connected Sources */}
      {connectedSources.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-4">
            Connected Sources
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {connectedSources.map((source) => (
              <DataSourceCard
                key={source.id}
                source={source}
                onConnect={handleConnect}
                onDisconnect={handleDisconnect}
              />
            ))}
          </div>
        </div>
      )}

      {/* Available Sources */}
      {availableSources.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-4">
            Available Integrations
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {availableSources.map((source) => (
              <DataSourceCard
                key={source.id}
                source={source}
                onConnect={handleConnect}
                onDisconnect={handleDisconnect}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
