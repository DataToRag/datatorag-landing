import { UserPlus, FileText, Shield, Globe, Clock, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const useCases = [
  {
    icon: UserPlus,
    title: "Employee Onboarding",
    description:
      "Reduce 90-day attrition by 50% with consistent, intelligent onboarding that adapts to each role and location.",
    features: [
      "Day-one readiness",
      "Role-specific training paths",
      "Manager handoff automation",
    ],
  },
  {
    icon: FileText,
    title: "Policy & Handbook Management",
    description:
      "Turn your employee handbook and policies into an AI assistant that provides instant, accurate answers.",
    features: [
      "Natural language queries",
      "Policy version control",
      "Compliance tracking",
    ],
  },
  {
    icon: Lock,
    title: "Sensitive & Personal Questions",
    description:
      "Employees get confidential answers about miscarriage bereavement, personal leave, or embarrassing questions without HR knowing who asked.",
    features: [
      "Complete anonymity guaranteed",
      "Sensitive topic detection & alerts",
      "Privacy-first architecture",
    ],
  },
  {
    icon: Shield,
    title: "Compliance & Regulations",
    description:
      "Navigate pay transparency, AI regulations, and multi-state requirements with automated compliance updates.",
    features: [
      "State-specific policies",
      "Regulatory alerts",
      "Audit-ready documentation",
    ],
  },
  {
    icon: Globe,
    title: "Remote Workforce Support",
    description:
      "Eliminate the 63% training gap for remote employees with 24/7 access to personalized HR support.",
    features: [
      "Time-zone aware assistance",
      "Remote-specific resources",
      "Cultural adaptation",
    ],
  },
  {
    icon: Clock,
    title: "Benefits & Time-off Management",
    description:
      "Answer complex benefits questions instantly. Handle PTO requests, enrollment, and eligibility queries automatically.",
    features: [
      "Benefits calculator",
      "PTO requests",
      "Open enrollment support",
    ],
  },
];

export function UseCasesSection() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Solve Your Biggest HR Challenges
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join 50+ HR teams who&apos;ve reduced ticket volume by 80%
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
            Ready to transform your HR operations with AI?
          </p>
          <Button asChild variant="ghost" className="font-semibold">
            <Link href="/contact">See ROI calculator →</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
