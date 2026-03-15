---
name: Slack Integration
description: Connect Claude to your Slack workspace. Search messages, post updates, and manage channels directly from Claude.
category: communication
industries:
  - marketing
  - healthcare
  - finance
  - legal
difficulty: beginner
setupTime: "5 minutes"
repoUrl: https://github.com/anthropics/anthropic-quickstarts
featured: true
icon: "💬"
compatibility:
  claudeDesktop: true
  claudeCode: true
  claudeApi: false
---

## What does this do?

The Slack MCP integration lets Claude read and interact with your Slack workspace. Instead of switching between Claude and Slack, you can ask Claude to find conversations, summarize channels, or draft messages — all from one place.

### Example use cases

- **"Summarize what happened in #marketing this week"** — Claude reads recent messages and gives you a concise recap
- **"Find the last conversation about the Q3 budget"** — Search across channels without leaving Claude
- **"Draft a project update and post it to #team-updates"** — Claude writes and sends on your behalf

## How to set it up

### Step 1: Download Claude Desktop

If you haven't already, download [Claude Desktop](https://claude.ai/download) for your computer.

### Step 2: Get your Slack credentials

1. Go to [api.slack.com/apps](https://api.slack.com/apps) and click **Create New App**
2. Choose **From scratch** and give it a name like "Claude Integration"
3. Under **OAuth & Permissions**, add the scopes: `channels:read`, `channels:history`, `chat:write`
4. Install the app to your workspace and copy the **Bot User OAuth Token**

### Step 3: Configure Claude Desktop

Open Claude Desktop's settings and add this to your MCP configuration:

```json
{
  "mcpServers": {
    "slack": {
      "command": "npx",
      "args": ["-y", "@anthropic/slack-mcp"],
      "env": {
        "SLACK_BOT_TOKEN": "xoxb-your-token-here"
      }
    }
  }
}
```

### Step 4: Restart and test

Restart Claude Desktop. Try asking: **"What are my Slack channels?"** — if Claude lists your channels, you're all set!

## For developers

- **Repository:** [github.com/anthropics/anthropic-quickstarts](https://github.com/anthropics/anthropic-quickstarts)
- **License:** MIT
- **Contributing:** PRs welcome! See the contributing guide in the repo.
