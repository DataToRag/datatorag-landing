"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const faqs = [
  {
    question: "What integrations does DatatoRAG support?",
    answer:
      "DatatoRAG connects with Notion, Google Drive, SharePoint, Confluence, Slack, Dropbox, and more — with new integrations shipping regularly. You can also upload files directly. All sources stay in sync automatically so your answers are always up to date.",
  },
  {
    question: "Who is DatatoRAG built for?",
    answer:
      "DatatoRAG is built for growing teams and SMBs that need fast, accurate answers from their own knowledge — without enterprise sales cycles or dedicated AI teams. Our customers span finance, academia, HR, sales, engineering, and more.",
  },
  {
    question: "How is this different from Glean?",
    answer:
      "Glean is built for large enterprises with long implementation timelines and six-figure contracts. DatatoRAG delivers the same core value — unified knowledge search with AI — but is purpose-built for SMBs: fast setup, transparent pricing, self-hosted models for privacy, and zero hallucinations guaranteed.",
  },
  {
    question: "What types of documents can DatatoRAG process?",
    answer:
      "We support PDFs, Word docs, Google Docs, Notion pages, Confluence pages, Markdown files, spreadsheets, presentations, and more. Content syncs automatically from connected integrations, and you can also upload files directly.",
  },
  {
    question: "How does DatatoRAG handle data privacy?",
    answer:
      "Your data is processed entirely on self-hosted models within our secure infrastructure. Nothing is sent to OpenAI, Anthropic, or any third-party AI service. We support HIPAA, SOC2, and data residency requirements out of the box.",
  },
  {
    question: "How accurate are the answers?",
    answer:
      "DatatoRAG guarantees zero hallucinations. Every answer is sourced exclusively from your approved documents with full citations showing the exact document and page. The same question always returns the same correct answer — no matter who asks or when.",
  },
  {
    question: "How quickly can we get started?",
    answer:
      "Most teams go live in days, not months. Connect your tools, invite your team, and start getting answers. No AI expertise, no complex infrastructure, and no lengthy onboarding required. Join our waitlist for priority access.",
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
