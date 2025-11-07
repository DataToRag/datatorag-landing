import {
  MessageSquare,
  Users,
  Link2,
  Zap,
  Lock,
  Target,
  ShieldCheck,
  Bell,
  FileSearch,
} from "lucide-react";

const features = [
  {
    icon: Target,
    title: "Guaranteed Accuracy",
    description:
      "10 employees asking the same question get identical, correct answers every time. Battle-tested across 10,000s of documents with zero hallucinations. Same question = same answer, always.",
  },
  {
    icon: ShieldCheck,
    title: "Anonymous & Private",
    description:
      "Employees ask sensitive questions confidentially about bereavement, personal leave, or embarrassing topics. HR gets anonymized metrics without seeing who asked what.",
  },
  {
    icon: Bell,
    title: "Smart Alert System",
    description:
      "Automatically flags harassment or discrimination questions for HR action while keeping employee identity completely private. Know when issues arise without compromising confidentiality.",
  },
  {
    icon: Lock,
    title: "Your Data Is Secure",
    description:
      "Self-hosted models ensure compliance with privacy. No ChatGPT or public AI services allowed! Your data never leaves our infrastructure.",
  },
  {
    icon: FileSearch,
    title: "Source Citation",
    description:
      "Every answer shows exactly which document and page it came from. Verify information instantly and build trust with transparent, traceable responses.",
  },
  {
    icon: MessageSquare,
    title: "Self-Service via Slack",
    description:
      "Employees get instant answers to benefits, policy, and procedure questions via Slack slash commands - right where they already work. No new tools to learn.",
  },
  {
    icon: Users,
    title: "Consistent Onboarding Experience",
    description:
      "Ensure every new hire receives the same high-quality onboarding, reducing 90-day attrition by up to 50%.",
  },
  {
    icon: Link2,
    title: "Seamless Integration",
    description:
      "Connects with Workday, Rippling, BambooHR, ADP, SharePoint, Google Drive, and more. Easy document updates for annual policy and benefits changes.",
  },
  {
    icon: Zap,
    title: "No AI Expertise Needed",
    description:
      "Ready to go when you are without vendor lock-ins or questionable public AI services. Getting going in days, not months.",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Built for HR Teams Like Yours
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Centralize scattered HR information into a unified knowledge base
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
