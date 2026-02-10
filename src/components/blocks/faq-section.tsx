"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const faqs = [
  {
    question: "Why is DatatoRAG more accurate than ChatGPT?",
    answer:
      "ChatGPT pulls from the internet and suffers from hallucinations and inconsistent answers. DatatoRAG only uses your approved documents — nothing else. We implement 10-person validation testing to ensure the same question always gets the same answer. Battle-tested across 10,000s of documents with zero hallucinations.",
  },
  {
    question: "What tools and services does DatatoRAG integrate with?",
    answer:
      "We integrate with Notion, Google Drive, SharePoint, Confluence, Dropbox, Slack, and more — with new integrations shipping regularly. You can also upload files directly. All sources sync automatically so your knowledge base stays current.",
  },
  {
    question: "Does my data ever leave my infrastructure?",
    answer:
      "No. Unlike ChatGPT or other cloud AI solutions, DatatoRAG runs entirely on self-hosted models. Your documents, data, and queries never get sent to OpenAI, Anthropic, or any third party. Everything stays on our secure, isolated infrastructure.",
  },
  {
    question: "How does DatatoRAG handle document updates?",
    answer:
      "Connected sources sync automatically — when a Notion page or Google Doc is updated, the knowledge base reflects it immediately. You can also manually upload or remove documents anytime. Old versions are properly replaced, unlike ChatGPT which can remember deleted content.",
  },
  {
    question: "Who is DatatoRAG built for?",
    answer:
      "DatatoRAG is built for small and medium businesses that need an AI-powered knowledge layer without enterprise complexity. Our customers span finance and accounting firms, universities, HR teams, sales organizations, and engineering teams. If your team wastes time searching for information across multiple tools, DatatoRAG is for you.",
  },
  {
    question:
      "How is this different from Glean or other enterprise search tools?",
    answer:
      "Enterprise tools like Glean are built for large organizations with dedicated IT teams and six-figure budgets. DatatoRAG delivers the same core capability — AI search across your company's knowledge — but built for growing teams. No enterprise sales cycles, no complex setup, and pricing that works for SMEs.",
  },
  {
    question: "What types of documents can I use?",
    answer:
      "DatatoRAG supports PDFs, Word docs, Google Docs, Notion pages, Confluence spaces, spreadsheets, internal wikis, and structured data. If your team uses it, we can likely connect to it.",
  },
  {
    question: "How quickly can we get started?",
    answer:
      "Most teams go live within days, not months. Connect your tools, invite your team, and start querying. No AI expertise required, no IT team needed. We're currently onboarding early customers — join our waitlist for priority access.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-background">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-muted-foreground">
            Everything you need to know about DatatoRAG
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-background rounded-2xl border shadow-lg shadow-zinc-950/5 overflow-hidden dark:shadow-zinc-950/15"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-muted/50 transition-colors"
              >
                <span className="font-semibold text-foreground">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`h-5 w-5 text-muted-foreground transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-muted-foreground">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">
            Ready to connect your team&apos;s knowledge?
          </p>
          <Button asChild>
            <Link
              href="https://tally.so/r/wa8p9q"
              target="_blank"
              rel="noopener noreferrer"
            >
              Join the Waitlist
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
