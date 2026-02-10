import {
  Link2,
  Zap,
  Lock,
  Target,
  ShieldCheck,
  FileSearch,
  RefreshCw,
  Users,
  MessageSquare,
} from "lucide-react";

const features = [
  {
    icon: Link2,
    title: "Deep Integrations",
    description:
      "Connect Notion, Google Drive, SharePoint, Confluence, Slack, Dropbox, and more. Your knowledge stays in sync across every tool your team uses.",
  },
  {
    icon: Target,
    title: "Guaranteed Accuracy",
    description:
      "Ask the same question ten times and get the same correct answer every time. Battle-tested across tens of thousands of documents with zero hallucinations.",
  },
  {
    icon: Lock,
    title: "Private & Secure",
    description:
      "Self-hosted models ensure compliance. Your data never leaves our infrastructure — no ChatGPT, no public AI services, no third-party access.",
  },
  {
    icon: MessageSquare,
    title: "Works Where You Work",
    description:
      "Deploy via Slack, Teams, a custom UI, or API. Your team gets answers right where they already collaborate — no new tools to learn.",
  },
  {
    icon: FileSearch,
    title: "Source Citation",
    description:
      "Every answer shows exactly which document and page it came from. Verify information instantly with transparent, traceable responses.",
  },
  {
    icon: RefreshCw,
    title: "Real-time Sync",
    description:
      "Documents update automatically when your source files change. Old versions are removed completely — no stale information, ever.",
  },
  {
    icon: Zap,
    title: "No AI Expertise Needed",
    description:
      "Go live in days, not months. No vendor lock-in, no complicated setup, no dedicated AI team required.",
  },
  {
    icon: ShieldCheck,
    title: "Role-based Access",
    description:
      "Control who sees what with granular permissions. Sensitive documents stay visible only to the right teams.",
  },
  {
    icon: Users,
    title: "Built for Growing Teams",
    description:
      "Designed for SMBs and mid-market companies. Enterprise-grade capabilities without the enterprise sales cycle or price tag.",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Built for Teams That Run on Knowledge
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Turn scattered information across dozens of tools into instant,
            accurate answers for your entire team
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-background rounded-2xl p-8 border shadow-lg shadow-zinc-950/5 hover:shadow-xl hover:shadow-zinc-950/10 transition-all duration-300 dark:shadow-zinc-950/15"
            >
              <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
