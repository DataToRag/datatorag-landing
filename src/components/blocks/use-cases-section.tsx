import {
  Calculator,
  GraduationCap,
  Users,
  TrendingUp,
  Code,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const useCases = [
  {
    icon: Calculator,
    title: "Finance & CPAs",
    description:
      "Surface tax codes, audit standards, and regulatory guidance instantly. Keep your team aligned on the latest compliance requirements across clients.",
    features: [
      "Instant tax & regulatory lookups",
      "Client knowledge base per engagement",
      "Audit-ready source citations",
    ],
  },
  {
    icon: GraduationCap,
    title: "Academia & Universities",
    description:
      "Unify faculty handbooks, research databases, and institutional policies. Give staff and students instant access to the answers they need.",
    features: [
      "Policy & handbook Q&A",
      "Research knowledge search",
      "Multi-department access control",
    ],
  },
  {
    icon: Users,
    title: "HR & People Ops",
    description:
      "Centralize benefits guides, employee handbooks, and onboarding docs. Answer policy questions accurately and consistently across the entire org.",
    features: [
      "Consistent policy answers",
      "Onboarding automation",
      "Anonymous sensitive Q&A",
    ],
  },
  {
    icon: TrendingUp,
    title: "Sales",
    description:
      "Give reps instant access to battlecards, product specs, pricing guides, and competitive intel — right in Slack or your CRM.",
    features: [
      "Battlecard & competitive intel",
      "Product knowledge on demand",
      "Deal-specific context retrieval",
    ],
  },
  {
    icon: Code,
    title: "Engineering",
    description:
      "Connect internal docs, runbooks, architecture decisions, and code wikis. New engineers ramp faster and everyone finds answers without pinging leads.",
    features: [
      "Runbook & incident lookups",
      "Architecture decision search",
      "Onboarding knowledge base",
    ],
  },
];

export function UseCasesSection() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            One Platform, Every Team
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            DatatoRAG works across verticals — wherever teams need fast,
            accurate answers from their own knowledge
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
              <p className="text-muted-foreground mb-4">
                {useCase.description}
              </p>
              <ul className="space-y-2">
                {useCase.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center text-sm text-muted-foreground"
                  >
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
            Ready to give your team instant access to everything they know?
          </p>
          <Button asChild variant="ghost" className="font-semibold">
            <Link
              href="https://tally.so/r/wa8p9q"
              target="_blank"
              rel="noopener noreferrer"
            >
              Get started →
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
