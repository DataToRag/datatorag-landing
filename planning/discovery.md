# Technical Discovery - DatatoRAG Landing

## Product Overview

**DatatoRAG** is a managed service providing RAG (Retrieval-Augmented Generation) capabilities for HR data. The service creates data pipelines to clean, ingest, and store HR documents into a vector database, enabling LLMs and agents to retrieve relevant information.

**Target Market:** HR departments
**Data Sources:** Policy documents (PDFs), handbooks, benefits documentation from FTP servers and APIs (Workday, Rippling)

### Architectural Decision: Custom Embeddings

**Key Differentiator:** DatatoRAG uses custom embedding models (Google Gemma 300M via SageMaker) rather than AWS Knowledge Bases.

**Why:** AWS Knowledge Bases only supports Titan and Cohere embeddings, which limits our ability to:

- Use domain-optimized models for HR terminology
- Fine-tune embeddings on customer data
- Experiment with different embedding models
- Provide competitive search quality

**Architecture:** OpenSearch + SageMaker custom embeddings

- Full flexibility for any embedding model
- Domain optimization capability (fine-tune on HR corpus)
- Product differentiation through superior search relevance
- See [adr-001-custom-embeddings.md](adr-001-custom-embeddings.md) for complete rationale

---

## Development Tools & Languages

**Programming Languages:**

- **Python 3.11+** (primary language for ETL, API, and data processing)
  - Selected for: Best data ecosystem, rapid development, AI/ML integration, vector operations

**IDEs/Editors:**
[Question] What IDEs/code editors does your team prefer?
[Answer] VSCode

**Frameworks:**

- **Data Processing:** Pandas/Polars, LangChain (text splitting)
- **API:** FastAPI + Mangum (Lambda adapter)
- **ML:** HuggingFace Transformers (embeddings)
- **AWS SDK:** boto3

---

## Source Code Management

**SCM Platform:**
[Question] What source code management system will you use? (GitHub, GitLab, Bitbucket, etc.)
[Answer] github

**Branching Strategy:**
[Question] What branching strategy do you prefer? (Git Flow, GitHub Flow, trunk-based, etc.)
[Answer] git flow

**Additional Tools:**
[Question] Any Git hooks, branch protection rules, or code review tools?
[Answer] n/a

---

## Project Management

**PM Tool:**

- **Jira** (confirmed)

**Task Management:**
[Question] What Jira plan/version? (Cloud, Server, Data Center)
[Answer] jira cloud

[Question] Preferred sprint length? (1 week, 2 weeks, etc.)
[Answer] 2 weeks

**Integration Points:**
[Question] Should Jira integrate with your SCM for commit tracking?
[Answer] yes

---

## Deployment & CI/CD

**Build Tools:**

- **Docker** (for ECS containers and Lambda container images)
- **pip** / **poetry** (Python package management)

[Question] Preference for Python dependency management? (pip + requirements.txt, poetry, pipenv)
[Answer]

**CI/CD Platform:**
[Question] What CI/CD platform? (GitHub Actions, GitLab CI, Jenkins, AWS CodePipeline, etc.)
[Answer]

**Deployment Tools:**

- **AWS CloudFormation** (Infrastructure as Code - confirmed)
- **AWS CLI** (CloudFormation stack deployment)

[Question] Do you want automated deployments on merge to main, or manual approval gates?
[Answer]

---

## Environment Structure

**Environments:**

- **Development** (dev) - For active development and testing
- **Staging** (staging) - Pre-production testing with production-like data
- **Production** (prod) - Customer-facing environment

[Question] Do you need separate AWS accounts per environment, or separate VPCs in one account?
[Answer]

[Question] Will you need a sandbox/experimental environment?
[Answer]

**Management Tools:**

- **AWS CloudFormation** (infrastructure provisioning)
- **AWS Systems Manager** (configuration parameters)
- **AWS Secrets Manager** (credentials, API keys)

**Monitoring:**

- **AWS CloudWatch** (logs, metrics, alarms)
- **CloudWatch Dashboards** (ETL pipeline health, search performance, infrastructure)

[Question] Do you need third-party monitoring/observability tools? (Datadog, New Relic, etc.)
[Answer]

---

## Team & Collaboration

[Question] What is the team size and structure?
[Answer]

[Question] What are the team's skill levels with AWS, Python, and ML/embeddings?
[Answer]

[Question] Do you have a DevOps/platform engineer, or is this a full-stack team?
[Answer]

[Question] What timezone(s) is the team in?
[Answer]

---

## AWS Infrastructure Details

**Cloud Provider:** Amazon Web Services (AWS) - confirmed

**Key Services:**

- **Compute:** Lambda (Python 3.11), ECS Fargate
- **Storage:** S3 (raw docs, processed data, model artifacts)
- **Vector Database:** Amazon OpenSearch Service 2.11+ (k-NN enabled)
- **ML:** Amazon SageMaker (Gemma 300M embeddings endpoint)
- **Queuing:** SQS (pipeline orchestration)
- **API:** API Gateway + Lambda
- **Networking:** VPC (private/public subnets, VPC endpoints)
- **Security:** IAM, Secrets Manager, Security Groups
- **Monitoring:** CloudWatch (logs, metrics, alarms, dashboards)

[Question] Do you have an existing AWS account, or need to create a new one?
[Answer]

[Question] What AWS region(s) should we deploy to? (us-east-1, us-west-2, etc.)
[Answer]

[Question] Any existing AWS infrastructure or resources to integrate with?
[Answer]

[Question] AWS cost budget/constraints for MVP?
[Answer]

---

## Data Sources & Integration

**Document Sources:**

1. **FTP Servers** (primary) - Customer-hosted or shared
   - PDF documents (handbooks, policies, benefits)
   - VPC peering for secure connectivity

2. **HR System APIs:**
   - **Workday API** - Document retrieval
   - **Rippling API** - Document retrieval
   - [Question] Any other HR systems to support initially? (BambooHR, ADP, etc.)
   - [Answer]

**Data Formats:**

- Primary: PDF documents
- [Question] Any other formats to support? (Word docs, HTML, plain text, etc.)
- [Answer]

**Data Volume (MVP):**
[Question] Expected document volume per customer for MVP testing?
[Answer]

[Question] Expected number of pilot customers for MVP?
[Answer]

---

## Security & Compliance

**Data Sensitivity:**

- HR documents contain PII (Personally Identifiable Information)
- Confidential company policies

**Security Requirements:**
[Question] Do you need specific compliance certifications? (HIPAA, SOC2, GDPR, etc.)
[Answer]

[Question] Any specific data retention policies?
[Answer]

[Question] Multi-tenancy requirements? (separate data per customer)
[Answer]

**Implemented Security Measures:**

- Encryption at rest (S3, OpenSearch, EBS)
- Encryption in transit (TLS everywhere)
- VPC isolation (no public endpoints)
- IAM least privilege policies
- Secrets Manager for credentials

---

## MCP Integration Opportunities

Based on the development environment, potential MCP (Model Context Protocol) server integrations:

1. **Source Code Management MCP**
   - GitHub/GitLab MCP server for code search and context
   - Enable AI to understand repository structure

2. **Jira MCP Server**
   - AI-assisted issue creation, updates, search
   - Link commits to issues automatically
   - Query sprint status and backlog

3. **AWS MCP Server**
   - Query CloudFormation stack status
   - Read CloudWatch logs and metrics
   - Inspect Lambda function code and configurations

4. **Documentation MCP**
   - Connect to project documentation (Confluence, Notion, etc.)
   - Enable AI to reference architecture docs

5. **OpenSearch MCP** (Custom)
   - Direct OpenSearch cluster access for debugging
   - Query vector indexes
   - Inspect document embeddings

[Question] Which MCP integrations are highest priority for your team?
[Answer]

[Question] Are you using any documentation tools? (Confluence, Notion, etc.)
[Answer]

---

## Success Criteria for MVP

**Functional Goals:**

- Ingest 1000 HR documents from FTP and APIs
- Parse PDFs with >95% text extraction accuracy
- Generate embeddings and index in OpenSearch
- Query API returns relevant results in <500ms
- Vector search relevance >80% (manual eval)

**Operational Goals:**

- All infrastructure via CloudFormation (no manual setup)
- End-to-end pipeline runs automatically
- Error rate <1%
- 99.5% API uptime
- Complete documentation

**Timeline:**

- MVP completion: 7 weeks (5 sprints)
- Estimated cost: $850-1,150/month

---

## Outstanding Questions Summary

### ✅ Answered

- ✓ IDE preferences: VSCode
- ✓ SCM platform: GitHub
- ✓ Branching strategy: Git Flow
- ✓ Jira plan: Jira Cloud
- ✓ Sprint length: 2 weeks
- ✓ Jira-SCM integration: Yes

### ⚠️ Critical (Blocking MVP Start)

1. **Python dependency management preference** (pip + requirements.txt, poetry, pipenv)
2. **CI/CD platform choice** (GitHub Actions, GitLab CI, Jenkins, AWS CodePipeline)
3. **Deployment workflow** (automated deployments on merge to main, or manual approval gates)
4. **AWS account status** (existing or need to create new)
5. **AWS region(s)** (us-east-1, us-west-2, etc.)

### 📋 Important (Needed by Sprint 2)

6. Environment structure (separate AWS accounts vs VPCs in one account)
7. Sandbox/experimental environment needed?
8. Expected document volume per customer for MVP testing
9. Expected number of pilot customers for MVP
10. Team size and structure
11. Team skill levels with AWS, Python, and ML/embeddings
12. DevOps/platform engineer on team?
13. Team timezone(s)
14. AWS cost budget/constraints for MVP (estimated $850-1,150/month)
15. Existing AWS infrastructure to integrate with

### 💡 Nice to Have (Can be decided later)

16. Third-party monitoring tools (Datadog, New Relic, etc.)
17. Additional HR system integrations beyond Workday/Rippling (BambooHR, ADP, etc.)
18. Other data formats to support (Word docs, HTML, plain text, etc.)
19. Compliance certifications needed (HIPAA, SOC2, GDPR, etc.)
20. Data retention policies
21. Multi-tenancy requirements (separate data per customer)
22. MCP integration priorities
23. Documentation tools (Confluence, Notion, etc.)

---

## Next Steps

1. **Answer outstanding questions** (especially critical ones)
2. **AWS Account Setup** - Create/configure AWS account, set billing alarms
3. **Repository Setup** - Create repo, configure branch protection
4. **Jira Setup** - Import epics/stories from MVP implementation plan
5. **Team Onboarding** - Share architecture and implementation docs
6. **Sprint 1 Kickoff** - Begin infrastructure foundation work

See [mvp-implementation-plan.md](mvp-implementation-plan.md) for detailed 7-week implementation roadmap.
