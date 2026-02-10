# Landing Page Refactor Plan

## Vision
Reposition DatatoRAG from an **HR-specific Q&A tool** to a **universal knowledge platform for SMEs** — think Glean AI, but built for small and medium businesses. The core value prop becomes **connecting all your company's knowledge sources into one AI-powered search layer**.

---

## Section-by-Section Changes

### 1. Hero Section (`hero-section.tsx`)
**Current**: "Accurate HR Answers. Every Time."
**New direction**:
- Headline: Something like "Your Company's Knowledge. One Search Away." or "Connect Everything. Find Anything."
- Subheadline: Emphasize integrations (Notion, Google Drive, Slack, SharePoint, etc.) and instant accurate answers across all company data
- Show integration logos prominently (Notion, Confluence, Google Drive, SharePoint, Slack, etc.)
- Keep: zero hallucinations, privacy, accuracy messaging — but make it industry-agnostic
- Social proof: broaden from "50+ HR teams" → "50+ teams" or "Trusted by growing companies"

### 2. ChatGPT Comparison Section (`chatgpt-comparison-section.tsx`)
**Current**: "Why HR Teams Are Switching from ChatGPT"
**New direction**:
- Reframe as "Why Teams Are Switching from ChatGPT"
- Keep the comparison matrix but make examples industry-agnostic (e.g., "project docs" instead of "bereavement policy")
- Keep the strong differentiators: no hallucinations, source citation, data privacy, version control

### 3. Features Section (`features-section.tsx`)
**Current**: "Built for HR Teams Like Yours" — 9 HR-specific features
**New direction**:
- Headline: "Built for Teams That Run on Knowledge"
- Reframe features around integrations and universal knowledge management:
  1. **Deep Integrations** — Notion, Google Drive, SharePoint, Confluence, Slack, and more
  2. **Guaranteed Accuracy** — source-cited, zero hallucinations (keep)
  3. **Private & Secure** — self-hosted, data never leaves your infrastructure (keep)
  4. **Works Where You Work** — Slack, Teams, API, custom UI (keep but broaden)
  5. **Source Citation** — exact doc, page, section (keep)
  6. **Real-time Sync** — docs update, answers update automatically
  7. **No AI Expertise Needed** — ready in days (keep)
  8. **Role-based Access** — control who sees what
  9. **Built for SMEs** — affordable, no enterprise sales cycles

### 4. How It Works Section (`how-it-works-section.tsx`)
**Current**: 3-step process referencing HRIS systems
**New direction**:
- Step 1: **Connect Your Tools** — Notion, Google Drive, SharePoint, Confluence, Dropbox, and more
- Step 2: **AI Processes Your Knowledge** — self-hosted models, zero hallucinations
- Step 3: **Your Team Gets Answers** — via Slack, Teams, API, or custom UI
- Remove HRIS-specific references, make integration logos the star

### 5. Benefits Section (`benefits-section.tsx`)
**Current**: HR-focused ROI (80% reduction in HR requests, onboarding stats)
**New direction**:
- Reframe around knowledge worker productivity:
  1. **Stop Searching, Start Finding** — reduce time spent hunting for information
  2. **One Source of Truth** — eliminate scattered knowledge across tools
  3. **Compliance & Privacy Ready** — HIPAA, SOC2 (keep)
  4. **Deploy in Days** — no IT team needed (keep)
  5. **Scales With You** — from 10 to 1000 employees
- New ROI stats: time saved per employee, reduction in repeated questions, etc.

### 6. Use Cases Section (`use-cases-section.tsx`)
**Current**: 6 HR-specific use cases
**New direction** — show breadth across departments:
  1. **HR & People Ops** — policies, onboarding, benefits (HR becomes ONE use case)
  2. **Engineering & Product** — technical docs, runbooks, architecture decisions
  3. **Sales & Customer Success** — playbooks, product info, competitive intel
  4. **Operations** — SOPs, compliance docs, vendor information
  5. **Finance & Legal** — contracts, policies, regulatory docs
  6. **Company-wide Knowledge** — cross-team knowledge sharing, org-wide search

### 7. FAQ Section (`faq-section.tsx`)
- Broaden all Q&As from HR-specific to general knowledge management
- Add questions about integrations (especially Notion), pricing for SMEs, supported tools
- Keep accuracy/privacy/security questions

### 8. Navigation (`marketing-nav.tsx`)
- Keep largely the same
- Possibly add "Integrations" link

### 9. Demo Data (`demo-data.ts`)
- Update mock Q&A to be more diverse (not just HR)
- Update data sources to emphasize Notion, Google Drive, Confluence alongside HRIS
- Broaden suggested questions in the demo

---

## What Stays the Same
- Overall page structure and component architecture
- Styling approach (Tailwind, Framer Motion animations)
- Technical infrastructure (Next.js, Cloudflare)
- Core differentiators: accuracy, privacy, source citation, self-hosted
- Demo functionality and interactive elements
- Footer, basic nav structure

## What Changes
- All HR-specific copy → industry-agnostic copy
- HR as the sole focus → HR as one of many customer types
- HRIS integrations as primary → general knowledge tool integrations as primary (Notion highlighted)
- Enterprise HR pain points → SME knowledge management pain points
- All stats/social proof → broadened beyond HR

---

## Files to Modify
1. `src/components/blocks/hero-section.tsx`
2. `src/components/blocks/chatgpt-comparison-section.tsx`
3. `src/components/blocks/features-section.tsx`
4. `src/components/blocks/how-it-works-section.tsx`
5. `src/components/blocks/benefits-section.tsx`
6. `src/components/blocks/use-cases-section.tsx`
7. `src/components/blocks/faq-section.tsx`
8. `src/lib/demo-data.ts`
9. `src/app/layout.tsx` (update metadata/description)

## Files Likely Unchanged
- `src/components/landing-page.tsx` (orchestrator, same sections)
- `src/components/layout/marketing-nav.tsx` (minimal changes)
- `src/components/blocks/footer.tsx`
- All UI components (`src/components/ui/`)
- All demo components (`src/components/blocks/demo/`)
- API route, config files
