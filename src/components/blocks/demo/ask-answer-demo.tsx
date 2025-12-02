"use client";

import { ChatInterface } from "./chat-interface";

export function AskAnswerDemo() {
  return (
    <div className="space-y-4">
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

      <div className="border rounded-lg h-[500px] flex flex-col overflow-hidden">
        <ChatInterface
          initialMessages={[]}
          placeholder="Ask about benefits, PTO, or policies..."
          showSources={true}
        />
      </div>

      <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
        <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-2">
          Every answer includes sources
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
