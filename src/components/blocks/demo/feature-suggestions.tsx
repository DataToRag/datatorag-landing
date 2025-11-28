"use client";

import {
  History,
  Sparkles,
  FileCheck,
  Globe,
  Smartphone,
  Palette,
  MessageSquare,
  BarChart3,
  Shield,
  Clock,
} from "lucide-react";

interface Feature {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  category: "high-value" | "medium-value" | "nice-to-have";
  status: "available" | "coming-soon" | "roadmap";
}

const FEATURES: Feature[] = [
  // High Value
  {
    id: "audit-trail",
    title: "Complete Audit Trail",
    description:
      "Track every question asked with filters by date, topic, and alert status for compliance",
    icon: History,
    category: "high-value",
    status: "available",
  },
  {
    id: "response-validation",
    title: "HR Approval Workflow",
    description:
      "HR can review and approve answers before they go live to employees",
    icon: FileCheck,
    category: "high-value",
    status: "available",
  },
  {
    id: "custom-terminology",
    title: "Custom Terminology Training",
    description:
      "Teach the bot company-specific terms like 'PTO' vs 'Vacation Days'",
    icon: Sparkles,
    category: "high-value",
    status: "available",
  },
  {
    id: "compliance-exports",
    title: "Compliance Exports",
    description:
      "One-click export of all Q&A for compliance audits and reporting",
    icon: BarChart3,
    category: "high-value",
    status: "available",
  },

  // Medium Value
  {
    id: "version-history",
    title: "Document Version History",
    description:
      "See all previous versions of documents with one-click rollback option",
    icon: Clock,
    category: "medium-value",
    status: "available",
  },
  {
    id: "smart-suggestions",
    title: "Smart Question Suggestions",
    description:
      "Bot suggests questions based on what other employees have asked",
    icon: MessageSquare,
    category: "medium-value",
    status: "coming-soon",
  },
  {
    id: "confidence-scores",
    title: "Confidence Scores",
    description: "Show how confident the AI is in each answer (0-100%)",
    icon: Shield,
    category: "medium-value",
    status: "coming-soon",
  },

  // Nice to Have
  {
    id: "mobile-experience",
    title: "Mobile-Optimized Interface",
    description: "Fully responsive mobile experience for on-the-go questions",
    icon: Smartphone,
    category: "nice-to-have",
    status: "available",
  },
  {
    id: "white-label",
    title: "White-Label Branding",
    description:
      "Customize colors, logo, and bot name to match your company brand",
    icon: Palette,
    category: "nice-to-have",
    status: "roadmap",
  },
  {
    id: "multilingual",
    title: "Multilingual Support",
    description: "Support for multiple languages with auto-translation",
    icon: Globe,
    category: "nice-to-have",
    status: "roadmap",
  },
];

const categoryLabels = {
  "high-value": "High Value Features",
  "medium-value": "Enhanced Experience",
  "nice-to-have": "Additional Capabilities",
};

const statusColors = {
  available: "bg-green-500/10 text-green-600 dark:text-green-400",
  "coming-soon": "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  roadmap: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
};

const statusLabels = {
  available: "Available",
  "coming-soon": "Coming Soon",
  roadmap: "Roadmap",
};

export function FeatureSuggestions() {
  const groupedFeatures = FEATURES.reduce(
    (acc, feature) => {
      if (!acc[feature.category]) {
        acc[feature.category] = [];
      }
      acc[feature.category].push(feature);
      return acc;
    },
    {} as Record<string, Feature[]>
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h3 className="text-2xl font-bold">Additional Features & Roadmap</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Explore more capabilities to enhance your HR knowledge management
        </p>
      </div>

      {/* Feature Categories */}
      {(Object.keys(groupedFeatures) as Array<keyof typeof categoryLabels>).map(
        (category) => (
          <div key={category}>
            <h4 className="text-lg font-semibold mb-4">
              {categoryLabels[category]}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {groupedFeatures[category].map((feature) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={feature.id}
                    className="border rounded-lg p-4 hover:shadow-lg transition-all group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <Icon className="h-6 w-6" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-semibold">{feature.title}</h5>
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full ${statusColors[feature.status]}`}
                          >
                            {statusLabels[feature.status]}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )
      )}

      {/* CTA Box */}
      <div className="bg-primary/10 border border-primary/20 rounded-lg p-6 text-center">
        <h4 className="text-lg font-bold mb-2">
          Want to see a specific feature?
        </h4>
        <p className="text-sm text-muted-foreground mb-4">
          Join our waitlist and let us know which features matter most to your
          team
        </p>
        <a
          href="https://tally.so/r/wa8p9q"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
        >
          <MessageSquare className="h-4 w-4" />
          <span>Join Waitlist & Share Feedback</span>
        </a>
      </div>
    </div>
  );
}
