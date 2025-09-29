"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const faqs = [
  {
    question: "How does DatatoRAG process my documents?",
    answer:
      "DatatoRAG uses advanced NLP techniques to parse, chunk, and embed your documents into high-dimensional vector spaces. Our intelligent chunking preserves semantic relationships while optimizing for retrieval accuracy and relevance scoring.",
  },
  {
    question: "What file formats are supported?",
    answer:
      "We support a wide range of formats including PDFs, Word documents, plain text, CSV, JSON, databases (PostgreSQL, MySQL, MongoDB), and structured data sources. Our system automatically detects and processes each format appropriately.",
  },
  {
    question: "How do you ensure data security and privacy?",
    answer:
      "All data is encrypted in transit and at rest using AES-256 encryption. We offer both cloud and on-premises deployment options. Data isolation is maintained per customer, and we're SOC 2 Type II compliant with enterprise-grade security measures.",
  },
  {
    question: "Can I customize the embedding models?",
    answer:
      "Yes! DatatoRAG supports custom embedding models including domain-specific fine-tuned models. You can use OpenAI, Cohere, HuggingFace models, or bring your own pre-trained embeddings for specialized use cases.",
  },
  {
    question: "What's the query performance at scale?",
    answer:
      "Our vector database delivers sub-100ms query responses even with millions of documents. We use optimized indexing algorithms and caching strategies to maintain performance. Horizontal scaling ensures consistent speed as your data grows.",
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
            Everything you need to know about building with DatatoRAG
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
          <p className="text-muted-foreground mb-4">Need technical support or have specific questions?</p>
          <Button asChild>
            <Link href="/contact">
              Contact Our Team
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}