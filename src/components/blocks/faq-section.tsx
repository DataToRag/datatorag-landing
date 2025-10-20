"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const faqs = [
  {
    question: "Does my HR data ever leave our infrastructure?",
    answer:
      "No. Unlike ChatGPT or other cloud AI solutions, DatatoRAG runs entirely within your infrastructure. Your employee data, policies, and benefits information never gets sent to OpenAI, Anthropic, or any third party. Everything stays on your servers.",
  },
  {
    question: "How much time can this save our HR team?",
    answer:
      "Our customers see an average 67% reduction in routine HR tickets. Teams save 15+ hours per week by automating responses to common questions about PTO policies, benefits enrollment, parental leave, and company handbooks.",
  },
  {
    question: "What types of HR documents can I upload?",
    answer:
      "You can upload employee handbooks, benefits guides, PTO policies, onboarding documentation, compliance materials, and any other HR knowledge base content. We support PDFs, Word docs, internal wikis, and structured data.",
  },
  {
    question: "How accurate are the AI responses?",
    answer:
      "DatatoRAG uses Gemma 3 for custom embeddings specifically trained on HR terminology and concepts. This model has been battle-tested across 10,000s of documents and understands the nuances of benefits, leave policies, and HR processes better than generic AI models—reducing incorrect answers and improving employee trust.",
  },
  {
    question: "How quickly can we get started?",
    answer:
      "We're currently onboarding early customers. Join our waitlist to get priority access and work with our team to deploy DatatoRAG in your infrastructure within weeks, not months.",
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
            Everything you need to know about DatatoRAG for HR teams
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
            Ready to reduce your HR ticket volume?
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
