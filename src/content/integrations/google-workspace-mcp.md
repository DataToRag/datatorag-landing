---
name: Google Workspace
description: Connect Claude to Gmail, Google Calendar, and Google Docs. Read emails, check schedules, and work with documents.
category: productivity
industries:
  - marketing
  - finance
  - legal
  - healthcare
difficulty: beginner
setupTime: "10 minutes"
repoUrl: https://github.com/anthropics/anthropic-quickstarts
featured: true
icon: "📧"
compatibility:
  claudeDesktop: true
  claudeCode: false
  claudeApi: false
---

## What does this do?

The Google Workspace integration gives Claude access to your Gmail, Calendar, and Docs. It's like having an assistant that can check your email, look up your schedule, and read your documents — all through a simple conversation.

**You don't need to be technical.** If you use Gmail and Google Calendar, you can use this.

### Example use cases

- **"Do I have any meetings tomorrow?"** — Check your calendar without opening it
- **"Summarize the last 5 emails from my boss"** — Catch up on important emails fast
- **"Find the project proposal doc and list the key deliverables"** — Get answers from your docs instantly
- **"Draft a reply to the client email about the project timeline"** — Claude reads the email and writes a response for you

## How to set it up

### Step 1: Download Claude Desktop

Go to [claude.ai/download](https://claude.ai/download) and install Claude Desktop. It's free and works on Mac and Windows.

### Step 2: Set up Google access

1. Visit the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a project (or ask your IT team to do this)
3. Enable these APIs: **Gmail API**, **Google Calendar API**, **Google Docs API**
4. Create OAuth credentials (Desktop application type)
5. Download the credentials file

> **Not sure how?** Ask your IT team or check our [step-by-step guide](/guides/google-workspace-setup) with screenshots.

### Step 3: Add to Claude Desktop

Open Claude Desktop settings and paste this into your MCP configuration:

```json
{
  "mcpServers": {
    "google-workspace": {
      "command": "npx",
      "args": ["-y", "@anthropic/google-workspace-mcp"],
      "env": {
        "GOOGLE_CREDENTIALS_PATH": "/path/to/credentials.json"
      }
    }
  }
}
```

### Step 4: Sign in and start using

Restart Claude Desktop. A Google sign-in window will appear — log in with your work account. Then try:

**"What's on my calendar today?"**

## For developers

- **Repository:** [github.com/anthropics/anthropic-quickstarts](https://github.com/anthropics/anthropic-quickstarts)
- **License:** MIT
- **APIs used:** Gmail API, Google Calendar API, Google Docs API
- **Contributing:** PRs welcome! See the repo for contribution guidelines.
