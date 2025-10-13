# Technical Discovery Plan - DatatoRAG Landing

## Overview

This plan outlines the steps for conducting a technical inventory interview to identify current SDLC tools, versions, and environment structure for MCP integration recommendations.

## Discovery Steps

### Phase 1: Setup

- [x] Create planning/discovery.md file with proper structure

### Phase 2: Development Tools & Languages

- [x] Ask about programming languages used by the team
  - **Decided:** Python 3.11+ (for data ecosystem, AI/ML integration, rapid development)
- [ ] Ask about IDEs/code editors and their versions
  - **Status:** Question added to discovery.md, awaiting answer
- [x] Ask about development frameworks in use
  - **Documented:** Pandas/Polars, LangChain, FastAPI, HuggingFace Transformers
- [x] Document all responses in discovery.md

### Phase 3: Source Code Management

- [ ] Ask about SCM system (GitHub, GitLab, Bitbucket, etc.)
  - **Status:** Critical question added, awaiting answer
- [ ] Ask about version and hosting type (Cloud, on-premise, Enterprise)
  - **Status:** Will be determined after SCM selection
- [ ] Ask about branching strategies or additional tools
  - **Status:** Question added to discovery.md, awaiting answer
- [x] Document all responses in discovery.md

### Phase 4: Project Management

- [x] Ask about project management tool
  - **Confirmed:** Jira
- [ ] Ask about version and plan type (Jira Cloud/Server, Azure DevOps, Linear, etc.)
  - **Status:** Question added to discovery.md, awaiting Jira plan details
- [ ] Ask about task creation and assignment process
  - **Status:** Question added about sprint length and workflow
- [x] Document all responses in discovery.md

### Phase 5: Deployment & CI/CD

- [x] Ask about build and deployment tools
  - **Documented:** Docker, CloudFormation, pip/poetry
- [ ] Ask about CI/CD platform (GitHub Actions, Jenkins, Azure Pipelines, etc.)
  - **Status:** Critical question added, awaiting answer
- [x] Ask about deployment automation tools
  - **Confirmed:** CloudFormation for IaC
- [ ] Ask about deployment workflow (auto vs manual approvals)
  - **Status:** Question added to discovery.md, awaiting answer
- [x] Document all responses in discovery.md

### Phase 6: Environment Structure

- [x] Ask about all environments (Dev, QA, Staging, Production, etc.)
  - **Documented:** Dev, Staging, Production proposed
- [ ] Ask about environment management and deployment process
  - **Status:** Question about separate AWS accounts vs VPCs added
- [x] Ask about monitoring and management tools
  - **Documented:** CloudWatch (logs, metrics, dashboards)
- [x] Document all responses in discovery.md

### Phase 7: Analysis

- [x] Review all collected information
- [x] Identify MCP integration opportunities
  - **Documented:** SCM, Jira, AWS, Documentation, OpenSearch MCP servers
- [x] Document potential MCP server connections

### Phase 8: Additional Discovery (Product-Specific)

- [x] Understand product architecture and data sources
  - **Documented:** HR document RAG service, FTP + API sources
- [x] Document AWS infrastructure requirements
  - **Documented:** OpenSearch, SageMaker, Lambda, ECS architecture
- [x] Identify security and compliance requirements
  - **Questions added:** HIPAA, SOC2, data retention, multi-tenancy
- [x] Define success criteria for MVP
  - **Documented:** 7-week timeline, functional & operational goals
- [x] Create comprehensive MVP implementation plan
  - **Completed:** See mvp-implementation-plan.md

## Clarification Questions

### Critical (Blocking MVP Start) - Need Answers ASAP

1. **AWS Account:** Do you have an existing AWS account, or need to create a new one?
2. **AWS Region:** What AWS region(s)? (us-east-1, us-west-2, etc.)
3. **SCM Platform:** GitHub, GitLab, Bitbucket, or other?
4. **CI/CD Platform:** GitHub Actions, GitLab CI, Jenkins, AWS CodePipeline, or other?
5. **Python Deps:** pip + requirements.txt, poetry, or pipenv?

### Important (Needed by Sprint 2)

6. **Environment Strategy:** Separate AWS accounts per environment, or VPCs in one account?
7. **Jira Details:** Cloud, Server, or Data Center? Sprint length?
8. **Test Data:** Expected document volume per customer for MVP testing?
9. **Team Structure:** Team size, roles, skill levels with AWS/Python/ML?
10. **Budget:** AWS cost budget/constraints for MVP?

### Nice to Have (Can be decided during Sprint 1)

11. IDE preferences
12. Branching strategy (Git Flow vs GitHub Flow vs trunk-based)
13. Third-party monitoring tools (Datadog, New Relic, etc.)
14. Additional HR system integrations beyond Workday/Rippling
15. Documentation tools (Confluence, Notion, etc.)
16. MCP integration priorities

---

## Notes

- Do not make assumptions about tools or versions
- Use [Question]/[Answer] tags for any unclear responses
- Focus only on technical inventory
- Wait for approval before proceeding with execution
