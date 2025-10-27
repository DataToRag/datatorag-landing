import { Link2, Brain, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const steps = [
  {
    number: "1",
    icon: Link2,
    title: "Connect Your Data Securely",
    description:
      "Connect your HRIS (Workday, Rippling, BambooHR, ADP), document storage (SharePoint, Box, FTP), or upload files directly.",
  },
  {
    number: "2",
    icon: Brain,
    title: "Process Your Data With AI Models",
    description:
      "Our self-hosted models securely process your data. We're experts in HR data and offer the ability to choose your own model to fit your needs.",
  },
  {
    number: "3",
    icon: MessageSquare,
    title: "Query with Confidence",
    description:
      "Fast, accurate answers all within the context of your data. Control who has access and what they access. Integrate into Slack, Teams, API, or custom UI.",
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Secure AI for HR in 3 Simple Steps
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From secure data ingestion to private AI-powered context, integrate AI
            into your workflow with ease.
          </p>
        </div>

        <div className="relative">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-border -translate-y-1/2 hidden lg:block" />

          <div className="grid md:grid-cols-3 gap-8 relative">
            {steps.map((step, index) => (
              <div key={step.number} className="relative">
                <div className="bg-background p-8 rounded-2xl text-center border shadow-lg shadow-zinc-950/5 dark:shadow-zinc-950/15">
                  <div className="w-16 h-16 bg-foreground text-background rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 relative z-10">
                    {step.number}
                  </div>
                  <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center mx-auto mb-4">
                    <step.icon className="h-6 w-6 text-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <svg
                      className="w-8 h-8 text-muted-foreground/50"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <Button asChild size="lg" className="rounded-xl px-8">
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
