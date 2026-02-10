import { Blocks, Search, Target, Shield, CheckCircle } from "lucide-react";

const benefits = [
  {
    icon: Search,
    title: "Stop Searching, Start Finding",
    description:
      "Your team wastes hours digging through Notion pages, Google Docs, and Slack threads. DatatoRAG surfaces the right answer instantly — from any connected source.",
  },
  {
    icon: Shield,
    title: "Compliance-Ready",
    description:
      "Your data is processed entirely on self-hosted models within our infrastructure. Meet HIPAA, SOC2, and data residency requirements without compromise.",
  },
  {
    icon: Target,
    title: "One Source of Truth",
    description:
      "No more conflicting answers from different tools. DatatoRAG unifies your knowledge base so every team member gets the same accurate, up-to-date information.",
  },
  {
    icon: CheckCircle,
    title: "Zero Hallucinations",
    description:
      "Unlike general-purpose AI, DatatoRAG only answers from your approved documents. No made-up facts, no internet pulls — just verified information with source citations.",
  },
  {
    icon: Blocks,
    title: "Deploy Without IT",
    description:
      "Connect your tools, invite your team, and go live. No dedicated AI team, no complex infrastructure, no months-long implementation.",
  },
];

export function BenefitsSection() {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            The ROI Is Clear
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Real results without a dedicated AI team or complicated
            integrations. Connect your tools and see the impact immediately.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                  <benefit.icon className="h-6 w-6 text-foreground" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-muted/30 rounded-2xl p-8 border shadow-lg shadow-zinc-950/5 dark:shadow-zinc-950/15">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-foreground mb-2">
                100%
              </div>
              <p className="text-muted-foreground">Answer Accuracy</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-foreground mb-2">10+</div>
              <p className="text-muted-foreground">Integrations</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-foreground mb-2">
                Days
              </div>
              <p className="text-muted-foreground">To Go Live</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-foreground mb-2">0</div>
              <p className="text-muted-foreground">Hallucinations</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
