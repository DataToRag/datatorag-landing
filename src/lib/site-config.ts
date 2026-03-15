export const SITE_NAME = "DatatoRAG";
export const SITE_URL = "https://datatorag.com";
export const GITHUB_URL = "https://github.com/datatorag";

export const NAV_ITEMS = [
  { label: "Integrations", href: "/integrations" },
  { label: "Use Cases", href: "/use-cases" },
  { label: "Guides", href: "/guides" },
] as const;

export const INTEGRATION_CATEGORIES = [
  { value: "all", label: "All" },
  { value: "communication", label: "Communication" },
  { value: "data-sources", label: "Data Sources" },
  { value: "productivity", label: "Productivity" },
  { value: "developer-tools", label: "Developer Tools" },
  { value: "analytics", label: "Analytics" },
] as const;

export type IntegrationCategory =
  (typeof INTEGRATION_CATEGORIES)[number]["value"];

export function formatDate(date: Date): string {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
