import { TrendingDown, Clock, Zap, Users } from "lucide-react";

const benefits = [
  {
    icon: TrendingDown,
    title: "Reduce Development Time by 80%",
    description:
      "Skip the complexity of building RAG from scratch. Focus on your application logic while we handle the infrastructure.",
  },
  {
    icon: Clock,
    title: "Scale to Millions of Documents",
    description:
      "Enterprise-grade vector storage and retrieval that grows with your data. No performance degradation at scale.",
  },
  {
    icon: Zap,
    title: "Sub-second Query Response",
    description:
      "Lightning-fast semantic search and retrieval. Optimized vector operations deliver results in milliseconds.",
  },
  {
    icon: Users,
    title: "Production-Ready Infrastructure",
    description:
      "Built for enterprise deployment with monitoring, security, and reliability features out of the box.",
  },
];

export function BenefitsSection() {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Why Choose DatatoRAG
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Built by AI engineers for AI engineers. The fastest path from data to production-ready RAG systems.
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
              <div className="text-4xl font-bold text-foreground mb-2">99.9%</div>
              <p className="text-muted-foreground">System Uptime</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-foreground mb-2">&lt;100ms</div>
              <p className="text-muted-foreground">Average Query Time</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-foreground mb-2">1M+</div>
              <p className="text-muted-foreground">Documents Processed</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}