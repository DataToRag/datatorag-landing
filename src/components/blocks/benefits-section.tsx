import { TrendingDown, Clock, Target, DollarSign } from "lucide-react";

const benefits = [
  {
    icon: Clock,
    title: "Save 1.8 Hours Per Employee Daily",
    description:
      "Stop the endless search for information. Employees find answers instantly, boosting productivity across your organization.",
  },
  {
    icon: Target,
    title: "Reduce 90-Day Attrition by 50%",
    description:
      "Only 12% of employees rate onboarding as &apos;great.&apos; Our AI ensures consistent, engaging experiences that keep new hires.",
  },
  {
    icon: TrendingDown,
    title: "Cut HR Ticket Volume by 67%",
    description:
      "Free your HR team from repetitive questions about benefits, policies, and procedures. Focus on strategic initiatives instead.",
  },
  {
    icon: DollarSign,
    title: "Deploy Without IT or AI Teams",
    description:
      "Pre-built integrations with Salesforce, Workday, SharePoint, and Slack. Go live in days, not months—no technical expertise required.",
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
            Mid-market companies see ROI in 3 months. No AI team needed, works
            with your existing HRIS stack.
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
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-foreground mb-2">67%</div>
              <p className="text-muted-foreground">Reduction in HR Tickets</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-foreground mb-2">
                1.8hrs
              </div>
              <p className="text-muted-foreground">Saved Per Employee Daily</p>
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
