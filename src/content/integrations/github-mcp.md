---
name: GitHub
description: Connect Claude to GitHub repositories. Browse code, manage issues, review pull requests, and track projects.
category: developer-tools
industries:
  - developer-tools
difficulty: beginner
setupTime: "5 minutes"
repoUrl: https://github.com/anthropics/anthropic-quickstarts
featured: true
icon: "🐙"
compatibility:
  claudeDesktop: true
  claudeCode: true
  claudeApi: true
---

## What does this do?

The GitHub MCP integration lets Claude interact with your GitHub repositories. Browse code, create issues, review pull requests, and manage your projects through conversation.

### Example use cases

- **"What are the open issues in my project?"** — Get an instant overview of your backlog
- **"Review the latest pull request and summarize the changes"** — Quick PR summaries
- **"Create an issue for the login bug I found"** — File issues without leaving Claude

## How to set it up

### Step 1: Download Claude Desktop

Download [Claude Desktop](https://claude.ai/download) if you haven't already.

### Step 2: Create a GitHub Personal Access Token

1. Go to [github.com/settings/tokens](https://github.com/settings/tokens)
2. Click **Generate new token (classic)**
3. Give it a name and select scopes: `repo`, `read:org`
4. Copy the generated token

### Step 3: Configure Claude Desktop

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@anthropic/github-mcp"],
      "env": {
        "GITHUB_TOKEN": "ghp_your-token-here"
      }
    }
  }
}
```

### Step 4: Restart and test

Restart Claude Desktop. Try: **"List my GitHub repositories."**

## For developers

- **Repository:** [github.com/anthropics/anthropic-quickstarts](https://github.com/anthropics/anthropic-quickstarts)
- **License:** MIT
- **Contributing:** PRs welcome!
