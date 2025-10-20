import { MessageSquare, Users, Link2, Zap, Lock, Brain } from "lucide-react";

const features = [
  {
    icon: Lock,
    title: "Your Data Stays on Your Infrastructure",
    description:
      "Unlike ChatGPT or public AI services, your employee data, compensation info, and benefits details never leave your AWS environment. Self-hosted models ensure compliance with privacy regulations.",
  },
  {
    icon: Brain,
    title: "Purpose-Built for HR Language",
    description:
      "Custom embeddings trained on HR terminology understand the nuance between 'PTO accrual,' 'rollover,' and 'payout.' Better accuracy than generic models on benefits, policies, and compliance questions.",
  },
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
    icon: Link2,
    title: "Seamless HRIS Integration",
    description:
      "Connects with Workday, Rippling, BambooHR, ADP, SharePoint, and more. Works with your existing HR tech stack without requiring a complete system overhaul.",
  },
  {
    icon: Zap,
    title: "No AI Expertise Needed",
    description:
      "Pre-built on AWS SageMaker and OpenSearch for enterprise-grade infrastructure without vendor lock-in to public AI services. Deploy in days, not months.",
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
