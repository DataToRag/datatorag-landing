"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { UIMessage } from "@ai-sdk/react";
import { Bot, ShieldCheck } from "lucide-react";
import { getMockResponse, type DocumentSource } from "@/lib/demo-data";
import type { ReactElement } from "react";
import {
  Sources,
  SourcesTrigger,
  SourcesContent,
  Source,
} from "@/components/ai-elements/sources";
import {
  InlineCitation,
  InlineCitationText,
  InlineCitationCard,
  InlineCitationCardTrigger,
  InlineCitationCardBody,
  InlineCitationCarousel,
  InlineCitationCarouselContent,
  InlineCitationCarouselItem,
  InlineCitationCarouselHeader,
  InlineCitationCarouselIndex,
  InlineCitationCarouselPrev,
  InlineCitationCarouselNext,
  InlineCitationSource,
  InlineCitationQuote,
} from "@/components/ai-elements/inline-citation";
import { FileText } from "lucide-react";

interface MessageDisplayProps {
  message: UIMessage;
  showSources?: boolean;
  anonymous?: boolean;
}

// Render text with inline citations at key points
function renderTextWithCitations(
  text: string,
  sources: DocumentSource[]
): ReactElement {
  if (sources.length === 0) {
    return (
      <div
        className="whitespace-pre-wrap"
        dangerouslySetInnerHTML={{
          __html: text
            .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
            .replace(/\n/g, "<br />"),
        }}
      />
    );
  }

  // Find the first paragraph/sentence to add citation after
  const firstBreak = text.indexOf("\n\n");
  const citationPoint = firstBreak > 0 ? firstBreak : text.length;

  const beforeCitation = text.slice(0, citationPoint);
  const afterCitation = text.slice(citationPoint);

  // Create fake URLs for the citation badge (it expects URLs)
  const sourceUrls = sources.map(
    (s) => `https://docs.company.com/${s.id || "doc"}`
  );

  return (
    <div className="whitespace-pre-wrap">
      <span
        dangerouslySetInnerHTML={{
          __html: beforeCitation
            .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
            .replace(/\n/g, "<br />"),
        }}
      />
      <InlineCitation>
        <InlineCitationCard>
          <InlineCitationCardTrigger sources={sourceUrls}>
            <FileText className="h-3 w-3 mr-1" />
            {sources.length} {sources.length === 1 ? "source" : "sources"}
          </InlineCitationCardTrigger>
          <InlineCitationCardBody>
            <InlineCitationCarousel>
              <InlineCitationCarouselHeader>
                <InlineCitationCarouselPrev />
                <InlineCitationCarouselIndex />
                <InlineCitationCarouselNext />
              </InlineCitationCarouselHeader>
              <InlineCitationCarouselContent>
                {sources.map((source, index) => (
                  <InlineCitationCarouselItem key={source.id || index}>
                    <InlineCitationSource
                      title={source.title}
                      description={
                        source.section
                          ? `${source.section}${source.page ? ` (Page ${source.page})` : ""}`
                          : undefined
                      }
                    />
                    <InlineCitationQuote>{source.excerpt}</InlineCitationQuote>
                  </InlineCitationCarouselItem>
                ))}
              </InlineCitationCarouselContent>
            </InlineCitationCarousel>
          </InlineCitationCardBody>
        </InlineCitationCard>
      </InlineCitation>
      {afterCitation && (
        <span
          dangerouslySetInnerHTML={{
            __html: afterCitation
              .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
              .replace(/\n/g, "<br />"),
          }}
        />
      )}
    </div>
  );
}

export function MessageDisplay({
  message,
  showSources = true,
  anonymous = false,
}: MessageDisplayProps): ReactElement {
  const isUser = message.role === "user";

  // Extract text content from message parts
  let textContent = "";
  try {
    if (
      message.parts &&
      Array.isArray(message.parts) &&
      message.parts.length > 0
    ) {
      textContent = message.parts
        .filter((part: any) => part != null)
        .map((part: any) => {
          if (part && part.type === "text" && typeof part.text === "string") {
            return part.text;
          }
          return "";
        })
        .join("");
    }
    if (!textContent && (message as any).content) {
      textContent = String((message as any).content);
    }
  } catch {
    textContent = "";
  }

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
      {/* Avatar - only show for assistant messages */}
      {!isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-primary/20 text-primary">
          <Bot className="h-4 w-4" />
        </div>
      )}

      {/* Message content */}
      <div
        className={`flex-1 ${isUser ? "max-w-full items-end text-right" : "max-w-[80%] items-start"} flex flex-col gap-2`}
      >
        {/* Message bubble */}
        <div
          className={`${
            isUser
              ? "text-foreground"
              : "rounded-lg px-4 py-3 bg-muted text-foreground"
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
            {textContent ? (
              showSources ? (
                renderTextWithCitations(textContent, sources)
              ) : (
                <div
                  className="whitespace-pre-wrap"
                  dangerouslySetInnerHTML={{
                    __html: textContent
                      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                      .replace(/\n/g, "<br />"),
                  }}
                />
              )
            ) : (
              !isUser && <span className="text-muted-foreground">...</span>
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
                  HR Alert: This question has been flagged for review
                </span>
              </div>
            </div>
          )}

          {/* Sources panel using AI Elements Sources component */}
          {!isUser && showSources && sources.length > 0 && (
            <div className="mt-4 pt-3 border-t border-border">
              <Sources>
                <SourcesTrigger count={sources.length} />
                <SourcesContent>
                  {sources.map((source, index) => (
                    <Source
                      key={source.id || index}
                      href={`#${source.id}`}
                      title={`${source.title}${source.page ? ` (p. ${source.page})` : ""}`}
                    />
                  ))}
                </SourcesContent>
              </Sources>
            </div>
          )}
        </div>

        {/* Timestamp */}
        <p className="text-xs text-muted-foreground px-1">10:00 AM</p>
      </div>
    </div>
  );
}
