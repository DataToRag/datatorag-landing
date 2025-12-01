/**
 * Mock data for HR Chatbot Demo
 * Pre-scripted scenarios, Q&A pairs, and document sources
 */

// ============================================================================
// Data Source Integrations
// ============================================================================

export type DataSourceId =
  | "gdrive"
  | "sharepoint"
  | "notion"
  | "confluence"
  | "dropbox"
  | "workday"
  | "bamboohr"
  | "adp";

export interface DataSource {
  id: DataSourceId;
  name: string;
  description: string;
  connected: boolean;
  documentsCount: number;
  lastSync: Date | null;
  folders?: string[];
  color: string;
}

export const MOCK_DATA_SOURCES: DataSource[] = [
  {
    id: "gdrive",
    name: "Google Drive",
    description: "Connect your Google Workspace documents",
    connected: true,
    documentsCount: 24,
    lastSync: new Date(Date.now() - 2 * 60 * 1000), // 2 min ago
    folders: ["HR Policies", "Benefits", "Onboarding"],
    color: "#4285F4",
  },
  {
    id: "sharepoint",
    name: "SharePoint",
    description: "Connect Microsoft SharePoint sites",
    connected: true,
    documentsCount: 156,
    lastSync: new Date(Date.now() - 5 * 60 * 1000), // 5 min ago
    folders: ["Company Handbook", "Legal", "Training"],
    color: "#038387",
  },
  {
    id: "notion",
    name: "Notion",
    description: "Import pages from Notion workspaces",
    connected: false,
    documentsCount: 0,
    lastSync: null,
    color: "#000000",
  },
  {
    id: "confluence",
    name: "Confluence",
    description: "Connect Atlassian Confluence spaces",
    connected: false,
    documentsCount: 0,
    lastSync: null,
    color: "#0052CC",
  },
  {
    id: "dropbox",
    name: "Dropbox",
    description: "Sync files from Dropbox folders",
    connected: false,
    documentsCount: 0,
    lastSync: null,
    color: "#0061FF",
  },
  // HRIS Integrations
  {
    id: "workday",
    name: "Workday",
    description: "Sync HR policies and employee data",
    connected: true,
    documentsCount: 89,
    lastSync: new Date(Date.now() - 60 * 60 * 1000), // 1 hour ago
    folders: ["HR Policies", "Job Descriptions", "Org Charts"],
    color: "#F68D2E",
  },
  {
    id: "bamboohr",
    name: "BambooHR",
    description: "Import benefits and time-off policies",
    connected: true,
    documentsCount: 45,
    lastSync: new Date(Date.now() - 30 * 60 * 1000), // 30 min ago
    folders: ["Benefits", "Time Off", "Employee Handbook"],
    color: "#73C41D",
  },
  {
    id: "adp",
    name: "ADP Workforce",
    description: "Sync payroll and compliance documents",
    connected: false,
    documentsCount: 0,
    lastSync: null,
    color: "#D0271D",
  },
];

// ============================================================================
// Knowledge Base Documents
// ============================================================================

export type ProcessingStage = "upload" | "chunk" | "embed" | "index";
export type ProcessingStatus = "pending" | "active" | "complete" | "error";

export interface ProcessingStep {
  stage: ProcessingStage;
  status: ProcessingStatus;
  detail: string;
  progress?: number;
}

export interface KnowledgeDocument {
  id: string;
  name: string;
  source: DataSourceId;
  type: "pdf" | "docx" | "txt" | "md" | "html";
  size: string;
  chunks: number;
  status: "processing" | "ready" | "error" | "syncing";
  lastUpdated: Date;
  processingSteps: ProcessingStep[];
}

export const MOCK_KNOWLEDGE_DOCUMENTS: KnowledgeDocument[] = [
  {
    id: "kb-doc-1",
    name: "Employee Handbook 2025.pdf",
    source: "gdrive",
    type: "pdf",
    size: "2.4 MB",
    chunks: 47,
    status: "ready",
    lastUpdated: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    processingSteps: [
      { stage: "upload", status: "complete", detail: "2.4 MB received" },
      { stage: "chunk", status: "complete", detail: "47 chunks created" },
      {
        stage: "embed",
        status: "complete",
        detail: "Gemma 3 embeddings generated",
      },
      {
        stage: "index",
        status: "complete",
        detail: "Added to vector database",
      },
    ],
  },
  {
    id: "kb-doc-2",
    name: "Benefits Guide 2025.pdf",
    source: "gdrive",
    type: "pdf",
    size: "1.8 MB",
    chunks: 32,
    status: "ready",
    lastUpdated: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    processingSteps: [
      { stage: "upload", status: "complete", detail: "1.8 MB received" },
      { stage: "chunk", status: "complete", detail: "32 chunks created" },
      {
        stage: "embed",
        status: "complete",
        detail: "Gemma 3 embeddings generated",
      },
      {
        stage: "index",
        status: "complete",
        detail: "Added to vector database",
      },
    ],
  },
  {
    id: "kb-doc-3",
    name: "PTO Policy.docx",
    source: "sharepoint",
    type: "docx",
    size: "245 KB",
    chunks: 12,
    status: "ready",
    lastUpdated: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
    processingSteps: [
      { stage: "upload", status: "complete", detail: "245 KB received" },
      { stage: "chunk", status: "complete", detail: "12 chunks created" },
      {
        stage: "embed",
        status: "complete",
        detail: "Gemma 3 embeddings generated",
      },
      {
        stage: "index",
        status: "complete",
        detail: "Added to vector database",
      },
    ],
  },
  {
    id: "kb-doc-4",
    name: "Anti-Harassment Policy.pdf",
    source: "sharepoint",
    type: "pdf",
    size: "890 KB",
    chunks: 18,
    status: "ready",
    lastUpdated: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), // 14 days ago
    processingSteps: [
      { stage: "upload", status: "complete", detail: "890 KB received" },
      { stage: "chunk", status: "complete", detail: "18 chunks created" },
      {
        stage: "embed",
        status: "complete",
        detail: "Gemma 3 embeddings generated",
      },
      {
        stage: "index",
        status: "complete",
        detail: "Added to vector database",
      },
    ],
  },
  {
    id: "kb-doc-5",
    name: "Onboarding Checklist.docx",
    source: "gdrive",
    type: "docx",
    size: "156 KB",
    chunks: 8,
    status: "ready",
    lastUpdated: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    processingSteps: [
      { stage: "upload", status: "complete", detail: "156 KB received" },
      { stage: "chunk", status: "complete", detail: "8 chunks created" },
      {
        stage: "embed",
        status: "complete",
        detail: "Gemma 3 embeddings generated",
      },
      {
        stage: "index",
        status: "complete",
        detail: "Added to vector database",
      },
    ],
  },
  {
    id: "kb-doc-6",
    name: "Remote Work Guidelines.pdf",
    source: "sharepoint",
    type: "pdf",
    size: "1.2 MB",
    chunks: 24,
    status: "syncing",
    lastUpdated: new Date(),
    processingSteps: [
      { stage: "upload", status: "complete", detail: "1.2 MB received" },
      {
        stage: "chunk",
        status: "active",
        detail: "Creating chunks...",
        progress: 65,
      },
      { stage: "embed", status: "pending", detail: "Waiting..." },
      { stage: "index", status: "pending", detail: "Waiting..." },
    ],
  },
];

// ============================================================================
// Original Document Source Types (for citations)
// ============================================================================

export interface DocumentSource {
  id: string;
  title: string;
  type: "handbook" | "benefits" | "policy";
  page?: number;
  section?: string;
  excerpt: string;
  url?: string;
}

export interface MockMessage {
  role: "user" | "assistant";
  content: string;
  sources?: DocumentSource[];
  metadata?: {
    userId?: string;
    userName?: string;
    timestamp?: string;
    anonymous?: boolean;
    alert?: boolean;
    alertType?: string;
  };
}

export interface DemoScenario {
  id: string;
  title: string;
  description: string;
  category: "accuracy" | "privacy" | "citations" | "admin";
  icon: string;
  suggestedQuestions: string[];
}

// Document sources for citations
export const MOCK_DOCUMENTS: Record<string, DocumentSource> = {
  bereavement_policy: {
    id: "bereavement_policy",
    title: "Employee Handbook - Bereavement Leave Policy",
    type: "policy",
    page: 42,
    section: "Section 8.3: Bereavement Leave",
    excerpt:
      "Employees are entitled to 5 days of paid bereavement leave for the loss of an immediate family member (spouse, child, parent, sibling). For the loss of pregnancy (miscarriage, stillbirth), employees are entitled to the same 5 days of paid leave. Additional unpaid leave may be requested through HR.",
  },
  pto_policy: {
    id: "pto_policy",
    title: "PTO and Leave Policies 2025",
    type: "policy",
    page: 12,
    section: "PTO Accrual and Rollover",
    excerpt:
      "Full-time employees accrue 15 days of PTO annually (1.25 days per month). Up to 5 unused PTO days may roll over to the next calendar year. Any remaining days beyond 5 will be paid out at year-end at 100% of base salary rate.",
  },
  benefits_guide: {
    id: "benefits_guide",
    title: "2025 Benefits Guide",
    type: "benefits",
    page: 8,
    section: "Health Insurance Options",
    excerpt:
      "We offer three health insurance tiers: Bronze (HDHP with HSA, $50/month employee contribution), Silver (PPO, $150/month), and Gold (Premium PPO, $250/month). All plans include dental and vision coverage. Enrollment period: November 1-30 annually.",
  },
  parental_leave: {
    id: "parental_leave",
    title: "Parental Leave Policy",
    type: "policy",
    page: 3,
    section: "Eligibility and Duration",
    excerpt:
      "Primary caregivers receive 16 weeks of paid parental leave. Secondary caregivers receive 8 weeks. Leave must be taken within 12 months of birth or adoption. Employees must have been employed for at least 6 months to be eligible.",
  },
  harassment_policy: {
    id: "harassment_policy",
    title: "Anti-Harassment and Discrimination Policy",
    type: "policy",
    page: 1,
    section: "Reporting Procedures",
    excerpt:
      "Any employee who experiences or witnesses harassment or discrimination should report it immediately to HR, their manager, or via our anonymous hotline (1-800-555-0123). All reports are investigated promptly and confidentially. Retaliation against reporters is strictly prohibited.",
  },
};

// Pre-scripted Q&A pairs
export const DEMO_CONVERSATIONS: Record<string, MockMessage[]> = {
  // Scenario 1: Accuracy & Consistency
  accuracy_bereavement: [
    {
      role: "user",
      content: "How many days of bereavement leave do I get?",
      metadata: {
        userId: "user1",
        userName: "Employee A",
        timestamp: new Date().toISOString(),
      },
    },
    {
      role: "assistant",
      content:
        "You are entitled to **5 days of paid bereavement leave** for the loss of an immediate family member (spouse, child, parent, or sibling).\n\nThis also applies to pregnancy loss (miscarriage or stillbirth). If you need additional time, you can request unpaid leave through HR.\n\nI'm very sorry for your loss. Please reach out to HR if you need any support during this difficult time.",
      sources: [MOCK_DOCUMENTS.bereavement_policy],
    },
  ],

  // Scenario 2: Privacy & Anonymity - Sensitive Question
  privacy_miscarriage: [
    {
      role: "user",
      content:
        "I experienced a miscarriage. What leave options do I have? I don't want my manager to know the details.",
      metadata: {
        anonymous: true,
        timestamp: new Date().toISOString(),
      },
    },
    {
      role: "assistant",
      content:
        "I'm very sorry for your loss. You are entitled to **5 days of paid bereavement leave** for pregnancy loss, the same as for any immediate family member.\n\n**Your privacy is protected:**\n- You don't need to share details with your manager\n- Simply request 'bereavement leave' through the HR portal\n- HR handles all medical leave confidentially\n- No one will know the specific reason unless you choose to share\n\nIf you need additional time or support, you can also:\n- Request unpaid leave (up to 30 days)\n- Access our Employee Assistance Program (EAP) for counseling\n- Reach out to HR directly at hr@company.com\n\nYour manager will only see that you've taken approved bereavement leave. Take care of yourself during this difficult time.",
      sources: [MOCK_DOCUMENTS.bereavement_policy],
      metadata: {
        anonymous: true,
      },
    },
  ],

  // Scenario 3: Source Citations
  citations_pto: [
    {
      role: "user",
      content:
        "How does PTO rollover work? Can I cash out unused days at the end of the year?",
    },
    {
      role: "assistant",
      content:
        "Here's how PTO rollover and payout works:\n\n**Rollover:**\n- You can roll over up to **5 unused PTO days** to the next calendar year\n- Rolled over days must be used by June 30th of the following year\n\n**Year-End Payout:**\n- Any unused PTO days beyond the 5-day rollover limit are **automatically paid out**\n- Payout is at **100% of your base salary rate**\n- This happens in the first paycheck of January\n\n**Example:** If you have 8 unused PTO days at year-end:\n- 5 days roll over to next year\n- 3 days are paid out in January\n\nYou can view your current PTO balance in the HR portal at any time.",
      sources: [MOCK_DOCUMENTS.pto_policy],
    },
  ],

  // Additional questions for demo
  benefits_enrollment: [
    {
      role: "user",
      content: "What health insurance options are available?",
    },
    {
      role: "assistant",
      content:
        "We offer **three health insurance tiers** to fit different needs and budgets:\n\n**Bronze Plan (HDHP with HSA)**\n- $50/month employee contribution\n- High-deductible plan with Health Savings Account\n- Best for those who want to save with HSA tax benefits\n\n**Silver Plan (PPO)**\n- $150/month employee contribution\n- Standard PPO with moderate deductible\n- Good balance of cost and coverage\n\n**Gold Plan (Premium PPO)**\n- $250/month employee contribution\n- Low deductible, comprehensive coverage\n- Best for those who need frequent medical care\n\n**All plans include:**\n- Dental coverage\n- Vision coverage\n- Prescription drug coverage\n\n**Annual enrollment period:** November 1-30\n\nYou can compare detailed plan benefits in the HR portal or schedule a one-on-one benefits consultation with our HR team.",
      sources: [MOCK_DOCUMENTS.benefits_guide],
    },
  ],

  harassment_report: [
    {
      role: "user",
      content: "I think I witnessed workplace harassment. How do I report it?",
      metadata: {
        anonymous: true,
      },
    },
    {
      role: "assistant",
      content:
        "Thank you for speaking up. Reporting harassment is important, and you have several confidential options:\n\n**How to Report:**\n1. **HR Direct:** Email hr@company.com or speak with any HR team member\n2. **Your Manager:** If you're comfortable, you can report to your direct manager\n3. **Anonymous Hotline:** Call 1-800-555-0123 (available 24/7)\n4. **Online Portal:** Submit an anonymous report at company.ethicspoint.com\n\n**What Happens Next:**\n- All reports are investigated promptly and confidentially\n- You'll be protected from retaliation (it's strictly prohibited)\n- HR will follow up within 2-3 business days\n- You can remain anonymous if you choose\n\n**🚨 This question has been flagged for HR attention**\n\nYour identity is protected, but HR has been notified that someone has raised a harassment concern so they can be prepared to support you.\n\nIs there anything else I can help you with regarding this process?",
      sources: [MOCK_DOCUMENTS.harassment_policy],
      metadata: {
        alert: true,
        alertType: "harassment",
        anonymous: true,
      },
    },
  ],
};

// Demo scenarios configuration
export const DEMO_SCENARIOS: DemoScenario[] = [
  {
    id: "accuracy",
    title: "Guaranteed Accuracy",
    description:
      "Same question = same answer, every time. Watch 3 employees get identical, correct responses.",
    category: "accuracy",
    icon: "Target",
    suggestedQuestions: [
      "How many days of bereavement leave do I get?",
      "What's the PTO accrual rate?",
      "Am I eligible for parental leave?",
    ],
  },
  {
    id: "privacy",
    title: "Anonymous & Private",
    description:
      "Employees ask sensitive questions confidentially. HR sees metrics, not identities.",
    category: "privacy",
    icon: "ShieldCheck",
    suggestedQuestions: [
      "I experienced a miscarriage. What leave options do I have?",
      "Can I take medical leave without telling my manager why?",
      "What are my options for mental health support?",
    ],
  },
  {
    id: "citations",
    title: "Source Citations",
    description:
      "Every answer shows exactly which document it came from. Complete transparency.",
    category: "citations",
    icon: "FileSearch",
    suggestedQuestions: [
      "How does PTO rollover work?",
      "What health insurance options are available?",
      "When can I enroll in benefits?",
    ],
  },
  {
    id: "admin",
    title: "HR Admin Controls",
    description:
      "Manage documents, configure alerts, and view anonymized analytics.",
    category: "admin",
    icon: "Settings",
    suggestedQuestions: [
      "Show me the HR admin dashboard",
      "How do I configure sensitive topic alerts?",
      "What documents are currently in the knowledge base?",
    ],
  },
];

// Mock user personas for accuracy comparison
export const MOCK_USERS = [
  {
    id: "user1",
    name: "Sarah Chen",
    role: "Software Engineer",
    avatar: "SC",
    color: "bg-blue-500",
  },
  {
    id: "user2",
    name: "Marcus Johnson",
    role: "Product Manager",
    avatar: "MJ",
    color: "bg-green-500",
  },
  {
    id: "user3",
    name: "Elena Rodriguez",
    role: "Designer",
    avatar: "ER",
    color: "bg-teal-500",
  },
];

// HR Analytics mock data (for admin dashboard)
export const MOCK_ANALYTICS = {
  totalQuestions: 1247,
  thisWeek: 89,
  topQuestions: [
    { question: "PTO balance and accrual", count: 156, percentage: 12.5 },
    {
      question: "Health insurance enrollment",
      count: 134,
      percentage: 10.7,
    },
    { question: "Bereavement leave policy", count: 98, percentage: 7.9 },
    { question: "Parental leave eligibility", count: 87, percentage: 7.0 },
    { question: "401k contribution limits", count: 76, percentage: 6.1 },
  ],
  alerts: [
    {
      id: "alert1",
      type: "harassment",
      timestamp: "2025-11-06T10:23:00Z",
      status: "pending",
      summary: "Harassment concern raised",
    },
    {
      id: "alert2",
      type: "discrimination",
      timestamp: "2025-11-05T14:45:00Z",
      status: "investigating",
      summary: "Discrimination question asked",
    },
  ],
  documents: [
    {
      id: "doc1",
      name: "Employee Handbook 2025",
      type: "handbook",
      lastUpdated: "2025-01-15",
      status: "active",
    },
    {
      id: "doc2",
      name: "Benefits Guide 2025",
      type: "benefits",
      lastUpdated: "2024-11-20",
      status: "active",
    },
    {
      id: "doc3",
      name: "PTO and Leave Policies",
      type: "policy",
      lastUpdated: "2025-01-01",
      status: "active",
    },
    {
      id: "doc4",
      name: "Anti-Harassment Policy",
      type: "policy",
      lastUpdated: "2024-09-12",
      status: "active",
    },
  ],
};

/**
 * Get mock response based on user message
 * This is used by the API endpoint to return pre-scripted responses
 */
export function getMockResponse(userMessage: string): MockMessage {
  const lowerMessage = userMessage.toLowerCase();

  // Match patterns to return appropriate pre-scripted responses
  if (
    lowerMessage.includes("bereavement") ||
    lowerMessage.includes("days") ||
    lowerMessage.includes("leave")
  ) {
    if (lowerMessage.includes("miscarriage") || lowerMessage.includes("loss")) {
      return DEMO_CONVERSATIONS.privacy_miscarriage[1];
    }
    return DEMO_CONVERSATIONS.accuracy_bereavement[1];
  }

  if (
    lowerMessage.includes("pto") ||
    lowerMessage.includes("rollover") ||
    lowerMessage.includes("cash out")
  ) {
    return DEMO_CONVERSATIONS.citations_pto[1];
  }

  if (
    lowerMessage.includes("health") ||
    lowerMessage.includes("insurance") ||
    lowerMessage.includes("benefits")
  ) {
    return DEMO_CONVERSATIONS.benefits_enrollment[1];
  }

  if (
    lowerMessage.includes("harassment") ||
    lowerMessage.includes("discrimination")
  ) {
    return DEMO_CONVERSATIONS.harassment_report[1];
  }

  // Default response
  return {
    role: "assistant",
    content:
      "I can help you with questions about:\n\n- **Benefits** (health insurance, 401k, etc.)\n- **Leave policies** (PTO, bereavement, parental leave)\n- **HR policies** (harassment reporting, workplace policies)\n- **Payroll and compensation**\n\nWhat would you like to know?",
  };
}
