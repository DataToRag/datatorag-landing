import {
  Link2,
  Zap,
  Lock,
  Target,
  FileSearch,
  MessageSquare,
  RefreshCw,
  ShieldCheck,
  Building2,
} from "lucide-react";

const features = [
  {
    icon: Link2,
    title: "Deep Integrations",
    description:
      "Connect Notion, Google Drive, SharePoint, Confluence, Dropbox, Slack, and more. Your knowledge lives in many places — DatatoRAG brings it all together.",
  },
  {
    icon: Target,
    title: "Guaranteed Accuracy",
    description:
      "Every answer is sourced from your approved documents only. Zero hallucinations, zero internet data. Ask the same question 10 times, get the same answer 10 times.",
  },
  {
    icon: Lock,
    title: "Private & Secure",
    description:
      "Self-hosted models ensure your data never leaves your infrastructure. No ChatGPT, no third-party APIs touching your sensitive information. HIPAA and SOC2 ready.",
  },
  {
    icon: MessageSquare,
    title: "Works Where You Work",
    description:
      "Deploy via Slack slash commands, Microsoft Teams, a custom UI, or API. Your team gets answers right where they already work — no new tools to learn.",
  },
  {
    icon: FileSearch,
    title: "Source Citation",
    description:
      "Every answer shows exactly which document, page, and section it came from. Verify information instantly with transparent, traceable responses.",
  },
  {
    icon: RefreshCw,
    title: "Real-time Sync",
    description:
      "When documents update, answers update. Automatic syncing from connected tools means your knowledge base is always current — no manual re-uploads.",
  },
  {
    icon: Zap,
    title: "No AI Expertise Needed",
    description:
      "Go live in days, not months. No vendor lock-in, no dedicated AI team required. Connect your tools and start getting answers immediately.",
  },
  {
    icon: ShieldCheck,
    title: "Role-based Access",
    description:
      "Control who can see what. Set permissions by team, department, or role so sensitive documents stay accessible only to the right people.",
  },
  {
    icon: Building2,
    title: "Built for Growing Teams",
    description:
      "Affordable pricing without enterprise sales cycles. Whether you're a 10-person startup or a 500-person firm, DatatoRAG scales with you.",
  },
];

export function FeaturesSection() {
  return (
    <section id="integrations" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Built for Teams That Run on Knowledge
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Connect your scattered tools into one AI-powered knowledge layer
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
