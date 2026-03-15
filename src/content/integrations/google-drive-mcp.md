---
name: Google Drive
description: Give Claude access to your Google Drive files. Search, read, and analyze documents, spreadsheets, and presentations.
category: data-sources
industries:
  - marketing
  - finance
  - legal
  - healthcare
difficulty: beginner
setupTime: "10 minutes"
repoUrl: https://github.com/anthropics/anthropic-quickstarts
featured: true
icon: "📁"
compatibility:
  claudeDesktop: true
  claudeCode: true
  claudeApi: false
---

## What does this do?

The Google Drive MCP integration lets Claude search and read files in your Google Drive. Ask Claude questions about your documents, spreadsheets, or presentations without having to copy-paste content.

### Example use cases

- **"Find the latest sales report and summarize the key metrics"** — Claude locates the file and extracts insights
- **"Compare the Q2 and Q3 budget spreadsheets"** — Analyze multiple documents at once
- **"What does our employee handbook say about remote work?"** — Instant answers from your docs

## How to set it up

### Step 1: Download Claude Desktop

Download [Claude Desktop](https://claude.ai/download) if you haven't already.

### Step 2: Set up Google API credentials

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the **Google Drive API**
4. Create OAuth 2.0 credentials (Desktop application type)
5. Download the credentials JSON file

### Step 3: Configure Claude Desktop

Add the Google Drive integration to your Claude Desktop MCP configuration:

```json
{
  "mcpServers": {
    "google-drive": {
      "command": "npx",
      "args": ["-y", "@anthropic/gdrive-mcp"],
      "env": {
        "GOOGLE_CREDENTIALS_PATH": "/path/to/credentials.json"
      }
    }
  }
}
```

### Step 4: Authorize and test

Restart Claude Desktop. On first use, a browser window will open to authorize access. Try asking: **"List my recent Google Drive files."**

## For developers

- **Repository:** [github.com/anthropics/anthropic-quickstarts](https://github.com/anthropics/anthropic-quickstarts)
- **License:** MIT
- **Contributing:** PRs welcome!
