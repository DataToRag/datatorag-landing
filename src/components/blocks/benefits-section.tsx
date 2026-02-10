import { Blocks, Clock, Target, Shield, CheckCircle } from "lucide-react";

const benefits = [
  {
    icon: CheckCircle,
    title: "Stop Searching, Start Finding",
    description:
      "Your team wastes hours hunting across Notion, Drive, SharePoint, and Slack for the right document. DatatoRAG gives them instant, accurate answers from all sources at once.",
  },
  {
    icon: Shield,
    title: "Compliance-Ready From Day One",
    description:
      "Your sensitive data is processed entirely on self-hosted models within our infrastructure. No data sent to OpenAI, Anthropic, or any third party. HIPAA and SOC2 ready.",
  },
  {
    icon: Clock,
    title: "One Source of Truth",
    description:
      "Eliminate scattered knowledge and conflicting versions. DatatoRAG syncs your tools in real time so every answer reflects the latest information — no stale docs, no confusion.",
  },
  {
    icon: Target,
    title: "Zero Hallucinations, Guaranteed",
    description:
      "Unlike ChatGPT, DatatoRAG only uses your approved documents. Same question = same answer, every time. Source citations let anyone verify in seconds.",
  },
  {
    icon: Blocks,
    title: "Deploy Without IT or AI Teams",
    description:
      "Connect your tools, invite your team, and go live. No technical expertise required, no enterprise sales cycles. Most teams are up and running in days.",
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
            Measurable results within weeks. No AI team needed, no complicated
            setup. Connect your existing tools and start seeing value
            immediately.
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
              <p className="text-muted-foreground">Integrations Supported</p>
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
