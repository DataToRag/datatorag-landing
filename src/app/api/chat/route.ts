import { getMockResponse } from "@/lib/demo-data";

interface MessagePart {
  type: string;
  text?: string;
}

interface Message {
  role: string;
  content?: string;
  parts?: MessagePart[];
}

// Extract text content from a message (handles both formats)
function getMessageContent(message: Message): string {
  // Try parts array first (AI SDK format)
  if (message.parts && Array.isArray(message.parts)) {
    return message.parts
      .filter((part) => part.type === "text" && part.text)
      .map((part) => part.text)
      .join("");
  }
  // Fall back to content string
  if (typeof message.content === "string") {
    return message.content;
  }
  return "";
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messages } = body as { messages: Message[] };

    // Get the last user message
    const lastUserMessage = messages.filter((m) => m.role === "user").pop();
    const userMessageContent = lastUserMessage
      ? getMessageContent(lastUserMessage)
      : "";

    console.log("[API] User message:", userMessageContent);

    // Get mock response based on user message
    const mockResponse = getMockResponse(userMessageContent);

    const text = mockResponse.content;

    // Create a simple text stream
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        // Stream text character by character for smooth effect
        for (let i = 0; i < text.length; i++) {
          controller.enqueue(encoder.encode(text[i]));
          // Small delay for streaming effect
          if (i % 5 === 0) {
            await new Promise((resolve) => setTimeout(resolve, 10));
          }
        }
        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    });
  } catch (error) {
    console.error("[Demo API] Error:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to process message",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
