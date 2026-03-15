import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const integrations = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/integrations" }),
  schema: z.object({
    name: z.string(),
    description: z.string(),
    category: z.enum([
      "data-sources",
      "productivity",
      "developer-tools",
      "communication",
      "analytics",
    ]),
    industries: z.array(z.string()),
    difficulty: z.enum(["beginner", "intermediate"]),
    setupTime: z.string(),
    repoUrl: z.string().url(),
    featured: z.boolean().default(false),
    icon: z.string().optional(),
    compatibility: z
      .object({
        claudeDesktop: z.boolean().default(true),
        claudeCode: z.boolean().default(false),
        claudeApi: z.boolean().default(false),
      })
      .default({
        claudeDesktop: true,
        claudeCode: false,
        claudeApi: false,
      }),
  }),
});

const guides = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/guides" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    author: z.string().default("DatatoRAG Team"),
    heroImage: z.string().optional(),
    tags: z.array(z.string()).default([]),
    category: z.enum(["tutorial", "guide", "announcement", "case-study"]),
    industry: z.string().optional(),
    difficulty: z
      .enum(["beginner", "intermediate", "advanced"])
      .default("beginner"),
    draft: z.boolean().default(false),
  }),
});

const useCases = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/use-cases" }),
  schema: z.object({
    industry: z.string(),
    title: z.string(),
    description: z.string(),
    heroImage: z.string().optional(),
    featuredIntegrations: z.array(z.string()).default([]),
  }),
});

export const collections = { integrations, guides, "use-cases": useCases };
