import {
  Calculator,
  GraduationCap,
  Users,
  TrendingUp,
  Code2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const useCases = [
  {
    icon: Calculator,
    title: "Finance & CPAs",
    description:
      "Instant answers across tax codes, client documents, regulatory filings, and audit prep materials. Stop digging through filing cabinets of PDFs.",
    features: [
      "Tax code & regulation lookup",
      "Client document search",
      "Audit preparation support",
    ],
  },
  {
    icon: GraduationCap,
    title: "Academia & Universities",
    description:
      "Centralize research papers, course materials, institutional policies, and administrative docs into one searchable knowledge base.",
    features: [
      "Research paper discovery",
      "Course material access",
      "Institutional policy lookup",
    ],
  },
  {
    icon: Users,
    title: "HR & People Ops",
    description:
      "Employees get instant, accurate answers about policies, benefits, onboarding, and compliance — with full anonymity for sensitive questions.",
    features: [
      "Policy & handbook Q&A",
      "Onboarding automation",
      "Anonymous employee queries",
    ],
  },
  {
    icon: TrendingUp,
    title: "Sales",
    description:
      "Give your sales team instant access to playbooks, product docs, competitive intel, and deal room materials. Close faster with the right information at hand.",
    features: [
      "Sales playbook access",
      "Competitive intelligence",
      "Product knowledge base",
    ],
  },
  {
    icon: Code2,
    title: "Engineering",
    description:
      "Search across technical docs, runbooks, architecture decisions, and incident postmortems. Reduce onboarding time and knowledge silos.",
    features: [
      "Technical documentation",
      "Runbook & incident search",
      "Architecture decision records",
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
            From CPAs to engineers — DatatoRAG works wherever knowledge matters
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
            Ready to connect your team&apos;s knowledge?
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
