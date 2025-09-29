import {
  MessageSquare,
  Users,
  Shield,
  Link2,
  TrendingDown,
  Zap,
} from "lucide-react";

const features = [
  {
    icon: MessageSquare,
    title: "Self-Service HR Knowledge Base",
    description:
      "Employees get instant answers to benefits, policy, and procedure questions without waiting for HR responses.",
  },
  {
    icon: Users,
    title: "Consistent Onboarding Experience",
    description:
      "Ensure every new hire gets the same high-quality onboarding, reducing 90-day attrition by up to 50%.",
  },
  {
    icon: Shield,
    title: "Multi-State Compliance Management",
    description:
      "Stay compliant across all locations with automated policy updates for pay transparency, AI regulations, and local laws.",
  },
  {
    icon: Link2,
    title: "Seamless HRIS Integration",
    description:
      "Connects directly with Salesforce, Workday, SharePoint, and Slack. No IT team required for setup.",
  },
  {
    icon: TrendingDown,
    title: "67% Reduction in HR Tickets",
    description:
      "Free your HR team from repetitive questions. Track ticket volume reduction and employee satisfaction metrics.",
  },
  {
    icon: Zap,
    title: "No AI Expertise Needed",
    description:
      "Pre-built RAG infrastructure means you can deploy in days, not months. No ML engineers or data scientists required.",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Built for HR Teams, Not Engineers
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Transform scattered HR information into a unified knowledge base
            that saves 1.8 hours per employee daily.
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
