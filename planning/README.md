# DatatoRAG MVP Planning Documentation

This directory contains all planning and discovery documentation for the DatatoRAG MVP project.

## 📋 Documents Overview

### 1. [discovery.md](discovery.md)

**Technical Discovery & Requirements**

- Product overview (HR document RAG service)
- Confirmed tech stack decisions (Python, AWS, Jira, CloudFormation)
- Outstanding questions with [Question]/[Answer] tags
- MCP integration opportunities
- Success criteria and timeline

**Status:** ✅ Partially complete - Critical questions need answers

---

### 2. [discovery_plan.md](discovery_plan.md)

**Discovery Process Tracking**

- Phase-by-phase discovery checklist
- Status of each discovery phase
- Critical vs important vs nice-to-have questions
- Process notes and guidelines

**Status:** ✅ Complete - All phases documented

---

### 3. [mvp-implementation-plan.md](mvp-implementation-plan.md)

**Detailed 7-Week Implementation Plan**

- Complete AWS architecture (OpenSearch, SageMaker, Lambda, ECS)
- CloudFormation stack designs (10 stacks)
- Full code structure and examples
- Sprint breakdown (5 sprints, 8 epics, 70+ stories)
- Risk analysis and mitigation strategies
- Cost estimates ($850-1,150/month)

**Status:** ✅ Complete - Ready to execute

---

### 4. [next-steps.md](next-steps.md)

**Action Items & Quick Start Guide**

- Critical questions that block MVP start
- Pre-MVP setup tasks (AWS, repo, CI/CD, Jira)
- Sprint-by-sprint goals and milestones
- Success metrics and risk mitigation
- Quick start checklist

**Status:** ✅ Complete - Follow this to get started

---

### 5. [jira-import.csv](jira-import.csv)

**Jira Stories Import File**

- 8 epics (DATATORAG-1 through DATATORAG-8)
- 70+ stories with descriptions, story points, priorities
- Ready to import into Jira

**Status:** ✅ Complete - Import when Jira project is created

---

### 6. [adr-001-custom-embeddings.md](adr-001-custom-embeddings.md)

**Architecture Decision Record: Custom Embeddings**

- Why OpenSearch + SageMaker over AWS Knowledge Bases
- Analysis of AWS KB limitations (no custom models)
- Trade-offs and risk mitigation
- Validation criteria

**Status:** ✅ Complete - Decision documented and approved

---

### 7. [architecture-comparison.md](architecture-comparison.md)

**Comprehensive Architecture Comparison**

- 5 architecture options analyzed (AWS KB, OpenSearch+SageMaker, Pinecone, pgvector, Milvus)
- Decision matrix with weighted scoring
- Cost, timeline, and feature comparisons
- Risk analysis

**Status:** ✅ Complete - Use for stakeholder discussions

---

## 🚀 Quick Start

### Before You Begin

1. **Read:** [discovery.md](discovery.md) to understand what's decided and what needs answers
2. **Answer:** Critical questions in discovery.md (AWS account, SCM, CI/CD, etc.)
3. **Follow:** [next-steps.md](next-steps.md) for pre-MVP setup tasks

### Start MVP Development

1. **Set up AWS account** with billing alarms
2. **Create repository** with project structure
3. **Import Jira stories** from [jira-import.csv](jira-import.csv)
4. **Kick off Sprint 1** following [mvp-implementation-plan.md](mvp-implementation-plan.md)

---

## 📊 MVP Overview

**Product:** DatatoRAG - Managed RAG service for HR documents

**Stack:**

- **Language:** Python 3.11
- **Cloud:** AWS (OpenSearch, SageMaker, Lambda, ECS)
- **IaC:** CloudFormation
- **PM:** Jira

**Timeline:** 7 weeks (5 sprints)

**Cost:** $850-1,150/month

**Sprints:**

1. **Sprint 1 (Week 1-2):** Infrastructure Foundation
2. **Sprint 2 (Week 2-3):** OpenSearch & SageMaker
3. **Sprint 3 (Week 3-5):** ETL Pipeline (Ingestion, Processing, Embedding, Indexing)
4. **Sprint 4 (Week 5-6):** API Layer (Query API)
5. **Sprint 5 (Week 6-7):** Testing & Polish

---

## ❓ Outstanding Questions

### Critical (Blocking)

- [ ] AWS account and region selection
- [ ] SCM platform (GitHub, GitLab, etc.)
- [ ] CI/CD platform (GitHub Actions, etc.)
- [ ] Python dependency management (poetry, pip, etc.)

### Important

- [ ] Jira plan details and sprint length
- [ ] Team size and skill levels
- [ ] Expected document volumes
- [ ] Budget constraints

See [discovery.md](discovery.md) for complete list with [Question]/[Answer] tags.

---

## 📞 Next Actions

1. **Review all documents** in this directory
2. **Answer critical questions** in [discovery.md](discovery.md)
3. **Follow setup tasks** in [next-steps.md](next-steps.md)
4. **Schedule Sprint 1 planning** when ready to start

---

## 🏗️ Architectural Decision: Custom Embeddings

**Key Decision:** DatatoRAG uses **OpenSearch + SageMaker custom embeddings** instead of AWS Knowledge Bases.

**Why:**

- AWS Knowledge Bases only supports Titan and Cohere embeddings
- We need Google Gemma 300M (768-dim) for optimal HR document search
- Custom embeddings = product differentiation and competitive advantage
- Full control for fine-tuning on HR terminology

**See:**

- [adr-001-custom-embeddings.md](adr-001-custom-embeddings.md) - Full ADR
- [architecture-comparison.md](architecture-comparison.md) - Complete comparison of 5 options

---

## 📝 Document Change History

| Date       | Document                                 | Change                                           |
| ---------- | ---------------------------------------- | ------------------------------------------------ |
| 2025-10-12 | All                                      | Initial creation from discovery process          |
| 2025-10-12 | discovery.md                             | Added product overview and outstanding questions |
| 2025-10-12 | mvp-implementation-plan.md               | Complete 7-week plan with code examples          |
| 2025-10-12 | jira-import.csv                          | Created 8 epics, 70+ stories for Jira import     |
| 2025-10-12 | adr-001-custom-embeddings.md             | Documented architecture decision                 |
| 2025-10-12 | architecture-comparison.md               | Comprehensive comparison of 5 architectures      |
| 2025-10-12 | discovery.md, mvp-implementation-plan.md | Added custom embeddings rationale                |

---

**Ready to build DatatoRAG? Start with [next-steps.md](next-steps.md)! 🚀**
