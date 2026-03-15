---
name: Salesforce
description: Connect Claude to your Salesforce CRM. Query contacts, update deals, pull reports, and automate sales workflows.
category: productivity
industries:
  - finance
  - marketing
  - healthcare
difficulty: intermediate
setupTime: "15 minutes"
repoUrl: https://github.com/anthropics/anthropic-quickstarts
featured: true
icon: "☁️"
compatibility:
  claudeDesktop: true
  claudeCode: false
  claudeApi: true
---

## What does this do?

The Salesforce MCP integration connects Claude directly to your Salesforce CRM. Instead of clicking through dashboards and reports, just ask Claude what you need — in plain English.

**No technical knowledge required.** If you can describe what you need, Claude can find it in Salesforce.

### Example use cases

- **"Show me all open deals worth over $50k"** — Instant pipeline visibility without building reports
- **"What's the contact info for Acme Corp?"** — Find contacts in seconds
- **"Update the status of the Johnson deal to 'Closed Won'"** — Make updates through conversation
- **"Summarize this quarter's sales performance"** — Get insights without exporting to spreadsheets

## How to set it up

### Step 1: Download Claude Desktop

Download [Claude Desktop](https://claude.ai/download) for your computer. It's free and takes about 2 minutes.

### Step 2: Get your Salesforce connection details

You'll need help from your Salesforce admin for this step. Ask them to:

1. Create a **Connected App** in Salesforce Setup
2. Enable OAuth settings with the scope `api refresh_token`
3. Provide you with the **Consumer Key** and **Consumer Secret**

> **Tip:** Send your admin this page — the "For developers" section at the bottom has the technical details they need.

### Step 3: Configure Claude Desktop

Open Claude Desktop, go to Settings, and add this MCP configuration:

```json
{
  "mcpServers": {
    "salesforce": {
      "command": "npx",
      "args": ["-y", "@anthropic/salesforce-mcp"],
      "env": {
        "SF_CONSUMER_KEY": "your-consumer-key",
        "SF_CONSUMER_SECRET": "your-consumer-secret",
        "SF_LOGIN_URL": "https://login.salesforce.com"
      }
    }
  }
}
```

### Step 4: Log in and test

Restart Claude Desktop. A browser window will open for you to log into Salesforce. Once connected, try:

**"Show me my recent Salesforce contacts."**

If Claude lists your contacts, you're all set!

## For developers

- **Repository:** [github.com/anthropics/anthropic-quickstarts](https://github.com/anthropics/anthropic-quickstarts)
- **License:** MIT
- **Salesforce admin setup:** Create a Connected App with OAuth 2.0 Web Server Flow. Required scopes: `api`, `refresh_token`. Callback URL: `http://localhost:3000/callback`
