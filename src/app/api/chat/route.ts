import { getMockResponse } from "@/lib/demo-data";

interface SimpleMessage {
  role: string;
  content: string;
}

export async function POST(req: Request) {
  try {
    const { messages } = (await req.json()) as { messages: SimpleMessage[] };

    // Get the last user message
    const lastUserMessage = messages
      .filter((m) => m.role === "user")
      .pop()?.content;

    // Get mock response based on user message
    const mockResponse = getMockResponse(
      typeof lastUserMessage === "string" ? lastUserMessage : ""
    );

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
