import { MessageSquare, Users, Link2, Zap, Lock, Brain } from "lucide-react";

const features = [
  {
    icon: Lock,
    title: "Your Data Is Secure",
    description:
      "Self-hosted models ensure compliance with privacy. No ChatGPT or public AI services allowed! Your data never leaves our infrastructure.",
  },
  {
    icon: Brain,
    title: "Purpose-Built for Your Usecase",
    description:
      "We support all models! Choose the one that suits your needs for HR terms like 'PTO accrual,' 'rollover,' and 'payout.'",
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
      "Ensure every new hire receives the same high-quality onboarding, reducing 90-day attrition by up to 50%.",
  },
  {
    icon: Link2,
    title: "Seamless HRIS Integration",
    description:
      "Connects with Workday, Rippling, BambooHR, ADP, SharePoint, and more. Works with your existing HR tech without requiring a complete system overhaul.",
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
