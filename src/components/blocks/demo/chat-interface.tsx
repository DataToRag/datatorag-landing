"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { Button } from "@/components/ui/button";
import { Send, Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { MessageDisplay } from "./message-display";

interface ChatInterfaceProps {
  initialMessages?: Array<{ role: "user" | "assistant"; content: string }>;
  placeholder?: string;
  showSources?: boolean;
  anonymous?: boolean;
}

export function ChatInterface({
  initialMessages = [],
  placeholder = "Ask a question about HR policies, benefits, or leave...",
  showSources = true,
  anonymous = false,
}: ChatInterfaceProps) {
  const [input, setInput] = useState("");

  const { messages, sendMessage, status, error, regenerate } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
    messages: initialMessages as any[],
  });

  const isLoading = status === "submitted" || status === "streaming";

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="flex flex-col h-full">
      {/* Chat messages area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-muted-foreground py-12">
            <p className="text-lg font-medium mb-2">
              👋 Welcome to DatatoRAG Demo
            </p>
            <p className="text-sm">
              Ask any question about HR policies, benefits, or leave policies
            </p>
            {anonymous && (
              <div className="mt-4 inline-flex items-center gap-2 bg-green-500/10 text-green-600 dark:text-green-400 px-4 py-2 rounded-full text-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                Your questions are completely anonymous
              </div>
            )}
          </div>
        )}

        {messages.map((message, index) => (
          <MessageDisplay
            key={message.id || index}
            message={message}
            showSources={showSources}
            anonymous={anonymous && message.role === "user"}
          />
        ))}

        {isLoading && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="text-sm">DatatoRAG is thinking...</span>
          </div>
        )}

        {error && (
          <div className="bg-destructive/10 text-destructive rounded-lg p-4">
            <p className="text-sm font-medium">Error: {error.message}</p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => regenerate()}
              className="mt-2"
            >
              Try Again
            </Button>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="border-t bg-background p-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (input.trim()) {
              sendMessage({ text: input });
              setInput("");
            }
          }}
          className="flex gap-2"
        >
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={placeholder}
            disabled={isLoading}
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background disabled:opacity-50"
          />
          <Button type="submit" disabled={isLoading || !input.trim()}>
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </form>

        <p className="text-xs text-muted-foreground mt-2 text-center">
          This is a demo with pre-scripted responses. Try asking about
          bereavement leave, PTO, or benefits.
        </p>
      </div>
    </div>
  );
}
