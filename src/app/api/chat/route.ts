/* eslint-disable @typescript-eslint/no-explicit-any */
import { streamText } from "ai";
import { getMockResponse } from "@/lib/demo-data";

interface SimpleMessage {
  role: string;
  content: string;
}

// Mock model that returns pre-scripted responses
const mockModel = {
  specificationVersion: "v1",
  provider: "mock",
  modelId: "demo",
  defaultObjectGenerationMode: "json",

  // Simulate text generation with pre-scripted responses
  doGenerate: async (options: any) => {
    const messages = options.prompt.messages as SimpleMessage[];
    const lastUserMessage = messages
      .filter((m) => m.role === "user")
      .pop()?.content;

    // Get mock response based on user message
    const mockResponse = getMockResponse(
      typeof lastUserMessage === "string" ? lastUserMessage : ""
    );

    // Simulate streaming by returning text in chunks
    const text = mockResponse.content;
    const chunks = text.split(" ");

    return {
      text,
      usage: {
        promptTokens: 0,
        completionTokens: chunks.length,
      },
      finishReason: "stop",
      rawCall: {
        rawPrompt: lastUserMessage,
        rawSettings: {},
      },
    };
  },

  doStream: async (options: any) => {
    const messages = options.prompt.messages as SimpleMessage[];
    const lastUserMessage = messages
      .filter((m) => m.role === "user")
      .pop()?.content;

    // Get mock response
    const mockResponse = getMockResponse(
      typeof lastUserMessage === "string" ? lastUserMessage : ""
    );

    const text = mockResponse.content;
    const words = text.split(" ");

    // Create async generator for streaming
    async function* streamWords() {
      for (const word of words) {
        yield {
          type: "text-delta" as const,
          textDelta: word + " ",
        };
        // Simulate typing delay
        await new Promise((resolve) => setTimeout(resolve, 30));
      }

      // Include sources as metadata if available
      if (mockResponse.sources && mockResponse.sources.length > 0) {
        yield {
          type: "text-delta" as const,
          textDelta: "",
        };
      }
    }

    return {
      stream: streamWords(),
      rawCall: {
        rawPrompt: lastUserMessage,
        rawSettings: {},
      },
    };
  },
};

export async function POST(req: Request) {
  try {
    const { messages } = (await req.json()) as { messages: SimpleMessage[] };

    // Use streamText with our mock model
    const result = streamText({
      model: mockModel as any,
      messages: messages as any,
      async onFinish({ text, usage }) {
        // Optional: Log analytics
        console.log("[Demo] Message processed:", {
          length: text.length,
          usage,
        });
      },
    });

    return result.toTextStreamResponse();
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
