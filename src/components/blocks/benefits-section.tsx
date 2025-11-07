import { Blocks, Clock, Target, Shield, CheckCircle } from "lucide-react";

const benefits = [
  {
    icon: CheckCircle,
    title: "Eliminate ChatGPT's Hallucination Problem",
    description:
      "Unlike ChatGPT, we guarantee consistency. Same question = same answer, every time. No more contradictory responses, no made-up policies, no pulling from the internet. Only your approved documents.",
  },
  {
    icon: Shield,
    title: "Compliance-Ready: Your Data Never Leaves Our Infrastructure",
    description:
      "Unlike solutions built on ChatGPT or Claude API, your sensitive employee data is processed entirely on self-hosted models within our infrastructure. Comply with HIPAA, SOC2, and data residency requirements.",
  },
  {
    icon: Clock,
    title: "Increase Employee Productivity From Day 1",
    description:
      "Stop the endless search for information. Reduce friction and tribal knowledge, help employees find answers instantly and boost productivity across your organization.",
  },
  {
    icon: Target,
    title: "Reduce Your 90-Day Attrition Rate",
    description:
      "Only 12% of employees rate onboarding as 'great'. Create great experiences for new hires and start on the right path to success",
  },
  {
    icon: Blocks,
    title: "Deploy Without IT or AI Teams",
    description:
      "Works with Workday, Rippling, BambooHR, ADP, and major HRIS platforms. Go live on your terms, no technical expertise required.",
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
            Experience results within months. No dedicated AI team needed or
            complicated integrations. Integrate with your existing HRIS stack
            today.
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
              <div className="text-4xl font-bold text-foreground mb-2">80%</div>
              <p className="text-muted-foreground">Reduction in HR Requests</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-foreground mb-2">1</div>
              <p className="text-muted-foreground">Centralized Solution</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-foreground mb-2">
                3 mo
              </div>
              <p className="text-muted-foreground">Average Time to ROI</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
