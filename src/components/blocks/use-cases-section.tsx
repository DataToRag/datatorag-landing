import {
  Headphones,
  BookOpen,
  TrendingUp,
  Users2,
  ShoppingBag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const useCases = [
  {
    icon: Headphones,
    title: "Customer Support",
    description:
      "Build intelligent helpdesks that understand context from tickets, knowledge bases, and product documentation.",
    features: ["Context-aware responses", "Multi-source knowledge", "Escalation handling"],
  },
  {
    icon: BookOpen,
    title: "Document Intelligence",
    description:
      "Transform legal documents, research papers, and technical manuals into queryable knowledge systems.",
    features: ["Legal document analysis", "Research synthesis", "Technical Q&A"],
  },
  {
    icon: TrendingUp,
    title: "Business Intelligence",
    description:
      "Query financial reports, market data, and business metrics using natural language for instant insights.",
    features: ["Financial analysis", "Market research", "KPI monitoring"],
  },
  {
    icon: Users2,
    title: "Knowledge Management",
    description:
      "Create internal wikis and knowledge bases that employees can query naturally for company information.",
    features: ["HR policies", "Process documentation", "Training materials"],
  },
  {
    icon: ShoppingBag,
    title: "E-commerce Intelligence",
    description:
      "Power product recommendations and customer queries using comprehensive product catalogs and user behavior.",
    features: ["Product discovery", "Inventory insights", "Customer analytics"],
  },
];

export function UseCasesSection() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Built for Every Industry
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From enterprise knowledge management to AI-powered applications, DatatoRAG scales across use cases.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {useCases.map((useCase) => (
            <div
              key={useCase.title}
              className="bg-background rounded-2xl p-6 border shadow-lg shadow-zinc-950/5 hover:shadow-xl hover:shadow-zinc-950/10 transition-all duration-300 dark:shadow-zinc-950/15"
            >
              <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center mb-4">
                <useCase.icon className="h-5 w-5 text-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {useCase.title}
              </h3>
              <p className="text-muted-foreground mb-4">{useCase.description}</p>
              <ul className="space-y-2">
                {useCase.features.map((feature) => (
                  <li key={feature} className="flex items-center text-sm text-muted-foreground">
                    <svg
                      className="w-4 h-4 text-muted-foreground mr-2 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">
            Need a custom RAG solution for your specific use case?
          </p>
          <Button asChild variant="ghost" className="font-semibold">
            <Link href="/contact">
              Schedule a consultation →
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}