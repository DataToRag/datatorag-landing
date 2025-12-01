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
    const words = text.split(" ");

    // Create a readable stream that simulates typing
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        for (const word of words) {
          // Format as AI SDK data stream protocol
          const chunk = `0:"${word.replace(/"/g, '\\"')} "\n`;
          controller.enqueue(encoder.encode(chunk));
          // Simulate typing delay
          await new Promise((resolve) => setTimeout(resolve, 30));
        }
        // Send finish message
        controller.enqueue(
          encoder.encode(
            `e:{"finishReason":"stop","usage":{"promptTokens":0,"completionTokens":${words.length}}}\n`
          )
        );
        controller.enqueue(encoder.encode(`d:{"finishReason":"stop"}\n`));
        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "X-Vercel-AI-Data-Stream": "v1",
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
