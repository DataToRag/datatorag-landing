"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const faqs = [
  {
    question: "Why is DatatoRAG more accurate than ChatGPT?",
    answer:
      "ChatGPT wasn't built for HR and suffers from hallucinations, inconsistent answers, and pulling information from the internet. DatatoRAG guarantees accuracy - we use only your approved documents, implement 10-person validation testing, and ensure the same question always gets the same answer. We've been battle-tested across 10,000s of documents with zero hallucinations.",
  },
  {
    question: "Can employees ask questions anonymously?",
    answer:
      "Yes, complete anonymity is guaranteed. Employees can ask sensitive questions about bereavement, personal leave, or other private matters without HR knowing who asked. HR teams receive anonymized metrics showing question frequency and topics, plus alerts when sensitive issues like harassment are raised - all without compromising employee privacy.",
  },
  {
    question: "Does my HR data ever leave our infrastructure?",
    answer:
      "No. Unlike ChatGPT or other cloud AI solutions, DatatoRAG runs entirely within our infrastructure. Your employee data, policies, and benefits information never gets sent to OpenAI, Anthropic, or any third party. Everything stays on our secure servers.",
  },
  {
    question: "How do I update documents when policies change?",
    answer:
      "Our document management interface gives HR teams complete control. Upload or remove documents anytime - typically needed during annual benefits updates (end of year) and policy refreshes (beginning of year). Changes sync from Google Drive, and old versions are completely removed (unlike ChatGPT which remembers deleted documents).",
  },
  {
    question:
      "What happens when someone asks about harassment or discrimination?",
    answer:
      "Our smart alert system automatically flags sensitive questions about harassment, discrimination, or other serious issues for HR team attention. You'll know these topics are being raised without seeing who asked, allowing you to take proactive action while maintaining employee confidentiality.",
  },
  {
    question: "How much time can this save our HR team?",
    answer:
      "Our customers see an average 80% reduction in routine HR requests. Teams save 15+ hours per week by automating responses to common questions about PTO policies, benefits enrollment, parental leave, and company handbooks.",
  },
  {
    question: "What types of HR documents can I upload?",
    answer:
      "You can upload employee handbooks, benefits guides, PTO policies, onboarding documentation, compliance materials, state-specific addendums, and any other HR knowledge base content. We support PDFs, Word docs, Google Drive sync, internal wikis, and structured data.",
  },
  {
    question: "How quickly can we get started?",
    answer:
      "We're currently onboarding early customers. Join our waitlist to get priority access and work with our team to integrate DatatoRAG into your workflow. Most teams go live within days, not months.",
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
