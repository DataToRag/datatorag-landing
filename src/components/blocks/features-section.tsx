import {
  BrainCircuit,
  Code2,
  Database,
  Palette,
  BarChart3,
  FileText,
} from "lucide-react";

const features = [
  {
    icon: BrainCircuit,
    title: "Advanced RAG Processing",
    description:
      "Intelligent document parsing and vector indexing that understands context, relationships, and semantic meaning.",
  },
  {
    icon: Code2,
    title: "API-First Integration",
    description:
      "RESTful APIs and SDKs for seamless integration into any application or workflow. Deploy in minutes.",
  },
  {
    icon: Database,
    title: "Multi-Format Support",
    description:
      "Process PDFs, documents, databases, websites, and structured data. Universal data ingestion capabilities.",
  },
  {
    icon: Palette,
    title: "Custom Embeddings",
    description:
      "Fine-tune embeddings for your domain. Support for custom models and specialized vector spaces.",
  },
  {
    icon: BarChart3,
    title: "Performance Analytics",
    description:
      "Real-time monitoring of query performance, accuracy metrics, and system optimization insights.",
  },
  {
    icon: FileText,
    title: "Intelligent Chunking",
    description:
      "Smart document segmentation that preserves context and optimizes retrieval accuracy for better results.",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Everything You Need for Production-Ready RAG
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Enterprise-grade features that make building intelligent RAG systems fast, reliable, and scalable.
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