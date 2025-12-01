"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { UIMessage } from "@ai-sdk/react";
import { User, Bot, ShieldCheck } from "lucide-react";
import { SourceCitationCard } from "./source-citation-card";
import { getMockResponse } from "@/lib/demo-data";
import type { ReactElement } from "react";

interface MessageDisplayProps {
  message: UIMessage;
  showSources?: boolean;
  anonymous?: boolean;
}

export function MessageDisplay({
  message,
  showSources = true,
  anonymous = false,
}: MessageDisplayProps): ReactElement {
  const isUser = message.role === "user";

  // Extract text content from message parts
  const textContent = message.parts
    ? message.parts
        .filter((part: any) => part.type === "text")
        .map((part: any) => part.text)
        .join("\n")
    : "";

  // Extract sources from mock data based on message content
  const mockMessage =
    !isUser && textContent ? getMockResponse(textContent) : null;
  const sources = mockMessage?.sources || [];
  const hasAlert = Boolean(
    mockMessage?.metadata && "alert" in mockMessage.metadata
      ? mockMessage.metadata.alert
      : false
  );

  return (
    <div
      className={`flex gap-3 ${isUser ? "flex-row-reverse" : "flex-row"} group`}
    >
      {/* Avatar */}
      <div
        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          isUser
            ? anonymous
              ? "bg-green-500/20 text-green-600 dark:text-green-400"
              : "bg-blue-500/20 text-blue-600 dark:text-blue-400"
            : "bg-primary/20 text-primary"
        }`}
      >
        {isUser ? (
          anonymous ? (
            <ShieldCheck className="h-4 w-4" />
          ) : (
            <User className="h-4 w-4" />
          )
        ) : (
          <Bot className="h-4 w-4" />
        )}
      </div>

      {/* Message content */}
      <div
        className={`flex-1 max-w-[80%] ${isUser ? "items-end" : "items-start"} flex flex-col gap-2`}
      >
        {/* Message bubble */}
        <div
          className={`rounded-lg px-4 py-3 ${
            isUser
              ? anonymous
                ? "bg-green-500/10 text-foreground border border-green-500/20"
                : "bg-blue-500/10 text-foreground"
              : "bg-muted text-foreground"
          }`}
        >
          {/* Anonymous indicator */}
          {isUser && anonymous && (
            <div className="flex items-center gap-2 text-xs text-green-600 dark:text-green-400 mb-2">
              <ShieldCheck className="h-3 w-3" />
              <span>Anonymous Question</span>
            </div>
          )}

          <div className="prose prose-sm dark:prose-invert max-w-none">
            {textContent && (
              <div
                className="whitespace-pre-wrap"
                dangerouslySetInnerHTML={{
                  __html: textContent
                    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                    .replace(/\n/g, "<br />"),
                }}
              />
            )}
          </div>

          {hasAlert && (
            <div className="mt-3 pt-3 border-t border-orange-500/20">
              <div className="flex items-center gap-2 text-xs bg-orange-500/10 text-orange-600 dark:text-orange-400 px-3 py-2 rounded">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                </span>
                <span className="font-medium">
                  🚨 HR Alert: This question has been flagged for review
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Source citations */}
        {!isUser && showSources && sources.length > 0 && (
          <div className="space-y-2 w-full">
            <p className="text-xs text-muted-foreground px-1">
              Sources ({sources.length}):
            </p>
            {sources.map((source, index) => (
              <SourceCitationCard key={source.id || index} source={source} />
            ))}
          </div>
        )}

        {/* Timestamp */}
        <p className="text-xs text-muted-foreground px-1">
          {new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
    </div>
  );
}
