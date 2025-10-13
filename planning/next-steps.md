# Next Steps - DatatoRAG MVP

## Current Status

✅ **Completed:**

- Product architecture defined (HR document RAG service)
- Technology stack selected (Python, AWS, CloudFormation)
- MVP implementation plan created (7 weeks, 5 sprints)
- Technical discovery documented with outstanding questions

📋 **Deliverables:**

- [discovery.md](discovery.md) - Technical inventory and requirements
- [discovery_plan.md](discovery_plan.md) - Discovery process tracking
- [mvp-implementation-plan.md](mvp-implementation-plan.md) - Detailed 7-week roadmap with code structure

---

## Immediate Next Steps (Before Sprint 1)

### 1. Answer Critical Questions ⚠️ **BLOCKING**

These questions must be answered before starting development:

**a) AWS Setup**

- [ ] Do you have an existing AWS account, or need to create a new one?
- [ ] What AWS region(s) should we deploy to? (recommend: us-east-1 or us-west-2)
- [ ] What is your AWS cost budget for MVP? (estimated: $850-1,150/month)

**b) Development Tools**

- [ ] What SCM platform? (GitHub, GitLab, Bitbucket, etc.)
- [ ] What CI/CD platform? (GitHub Actions, GitLab CI, Jenkins, AWS CodePipeline, etc.)
- [ ] Python dependency management? (recommend: poetry for better dependency resolution)

**c) Team & Process**

- [ ] What Jira plan? (Jira Cloud recommended for ease of use)
- [ ] Sprint length? (recommend: 2 weeks)
- [ ] Team size and structure?
- [ ] Team skill levels with AWS, Python, ML/embeddings?

---

### 2. Pre-MVP Setup Tasks

Once critical questions are answered, complete these setup tasks:

#### AWS Account Setup (1-2 days)

- [ ] Create or configure AWS account
- [ ] Set up billing alarms (recommend: $1000/month threshold)
- [ ] Create IAM admin user for deployments (with MFA)
- [ ] Request service quota increases if needed:
  - [ ] SageMaker endpoint instances (ml.g5.xlarge)
  - [ ] OpenSearch domain (r6g.large instances)
  - [ ] VPC Elastic IPs (for NAT Gateway)
- [ ] Enable AWS CloudTrail for audit logging
- [ ] Enable AWS Config for compliance tracking

#### Repository Setup (1 day)

- [ ] Create repository: `datatorag-mvp`
- [ ] Initialize with project structure from MVP plan
- [ ] Set up branch protection on `main`:
  - Require pull request reviews
  - Require status checks to pass
  - Prevent force pushes
- [ ] Configure `.gitignore` for Python
- [ ] Add README with project overview
- [ ] Set up GitHub/GitLab secrets for CI/CD:
  - AWS credentials (or use OIDC)
  - AWS region
  - AWS account ID

#### CI/CD Pipeline Setup (1 day)

- [ ] Create CI/CD workflow for CloudFormation deployments
- [ ] Set up environments (dev, staging, prod)
- [ ] Configure deployment approvals for production
- [ ] Test pipeline with a simple "hello world" stack

#### Jira Project Setup (0.5 day)

- [ ] Create Jira project: `DATATORAG`
- [ ] Import epics and stories (use [jira-import.csv](jira-import.csv))
- [ ] Set up sprint board
- [ ] Configure workflow (To Do → In Progress → Code Review → Done)
- [ ] Link Jira to repository (for commit tracking)
- [ ] Create first sprint (Sprint 1: Infrastructure Foundation)

#### Team Onboarding (1 day)

- [ ] Share architecture documentation with team
- [ ] Review MVP implementation plan
- [ ] Assign roles and responsibilities
- [ ] Set up team communication channels
- [ ] Schedule sprint ceremonies:
  - Sprint planning (beginning of sprint)
  - Daily standups (15 min)
  - Sprint review/demo (end of sprint)
  - Sprint retrospective (end of sprint)

---

### 3. Gemma Model Validation (CRITICAL - Week 1)

**Before starting Sprint 2**, validate the embedding model:

- [ ] Research `google/gemma-2-300m` on HuggingFace
- [ ] Test model locally:
  ```python
  from transformers import AutoModel, AutoTokenizer
  model = AutoModel.from_pretrained("google/gemma-2-300m")
  tokenizer = AutoTokenizer.from_pretrained("google/gemma-2-300m")
  # Test embedding generation
  ```
- [ ] Verify embedding output dimension (should be 768)
- [ ] Test embedding quality on sample HR text
- [ ] Confirm SageMaker compatibility (HuggingFace DLC support)
- [ ] **Decision:** Use Gemma OR fallback to `sentence-transformers/all-MiniLM-L6-v2`

**Fallback Option:**
If Gemma is not suitable, use `all-MiniLM-L6-v2`:

- Dimension: 384 (change OpenSearch index config)
- Well-tested for semantic search
- Easy SageMaker deployment

---

## Sprint 1: Infrastructure Foundation (Week 1-2)

### Goals

- Set up AWS networking and security
- Create all CloudFormation templates
- Establish CI/CD pipeline
- Deploy foundational infrastructure

### Jira Epic

**DATATORAG-1: Infrastructure Foundation**

### Stories (in priority order)

1. **DATATORAG-1.1:** Set up project repository structure
2. **DATATORAG-1.2:** Create network CloudFormation stack (VPC, subnets)
3. **DATATORAG-1.3:** Create security CloudFormation stack (IAM, security groups)
4. **DATATORAG-1.4:** Create storage CloudFormation stack (S3 buckets)
5. **DATATORAG-1.5:** Create secrets CloudFormation stack (Secrets Manager)
6. **DATATORAG-1.6:** Set up CI/CD pipeline (GitHub Actions → CloudFormation)
7. **DATATORAG-1.7:** Configure CloudWatch dashboards and basic monitoring

### Success Criteria

- [ ] All CloudFormation stacks deployed successfully
- [ ] CI/CD pipeline working (auto-deploy on merge to main)
- [ ] VPC with subnets, NAT Gateway, VPC endpoints operational
- [ ] S3 buckets created with proper encryption and lifecycle policies
- [ ] IAM roles and security groups configured
- [ ] Basic CloudWatch dashboard showing infrastructure health

### Estimated Effort

- Total: 40-60 hours (2 weeks for 1-2 engineers)

---

## Sprint 2: Data Platform (Week 2-3)

### Goals

- Deploy OpenSearch cluster
- Deploy SageMaker embedding endpoint
- Validate vector operations end-to-end

### Jira Epic

**DATATORAG-2: OpenSearch & SageMaker**

### Key Milestones

- [ ] OpenSearch cluster deployed with k-NN enabled
- [ ] Index templates created with vector field (768 dim)
- [ ] Test vector search with sample data (10K vectors)
- [ ] SageMaker endpoint deployed with Gemma model
- [ ] Test embedding generation (latency <2s per batch)
- [ ] End-to-end test: Generate embedding → Index → Vector search

### Estimated Effort

- Total: 40-60 hours

---

## Sprint 3: ETL Pipeline (Week 3-5)

### Goals

- Build complete document ingestion pipeline
- Implement PDF processing and chunking
- Integrate SageMaker embeddings
- Implement OpenSearch bulk indexing

### Jira Epics

- **DATATORAG-3:** Document Ingestion
- **DATATORAG-4:** Document Processing
- **DATATORAG-5:** Embedding & Indexing

### Key Milestones

- [ ] FTP connector working (download PDFs to S3)
- [ ] API connectors working (Workday, Rippling)
- [ ] PDF parsing with >95% accuracy
- [ ] Text chunking with LangChain (512 tokens, 50 overlap)
- [ ] SageMaker embedding generation (batch of 32)
- [ ] OpenSearch bulk indexing (batch of 500)
- [ ] Full pipeline test: FTP → S3 → Process → Embed → Index
- [ ] Error handling and dead letter queues configured

### Estimated Effort

- Total: 80-120 hours (2 weeks for 1-2 engineers)

---

## Sprint 4: API Layer (Week 5-6)

### Goals

- Build RAG query API
- Implement vector search and hybrid search
- Add authentication and documentation

### Jira Epic

**DATATORAG-6:** Query API

### Key Milestones

- [ ] FastAPI endpoints: /query, /search, /health, /docs/{doc_id}
- [ ] Vector search working (cosine similarity)
- [ ] Hybrid search working (vector + keyword)
- [ ] API Gateway deployed with API key authentication
- [ ] OpenAPI/Swagger documentation generated
- [ ] Postman collection for testing

### Estimated Effort

- Total: 40-60 hours

---

## Sprint 5: Testing & Polish (Week 6-7)

### Goals

- Integration testing with real HR documents
- Performance and load testing
- Documentation and runbooks
- Security audit

### Jira Epics

- **DATATORAG-7:** Integration Testing
- **DATATORAG-8:** Documentation & Operations

### Key Milestones

- [ ] 100 sample HR PDFs ingested and indexed
- [ ] 20 test queries evaluated (>80% relevance)
- [ ] Performance testing (latency <500ms p95)
- [ ] Load testing (1000 docs, 100 concurrent queries)
- [ ] Architecture documentation complete
- [ ] Deployment runbook complete
- [ ] API documentation complete
- [ ] Troubleshooting guide complete
- [ ] Security audit passed (IAM, encryption, VPC)
- [ ] Cost optimization review complete

### Estimated Effort

- Total: 40-60 hours

---

## Success Metrics for MVP

### Functional

- [x] Successfully ingest 1000 HR documents from FTP ✓
- [x] Parse PDFs with >95% text extraction accuracy ✓
- [x] Generate embeddings with <2s latency per batch (32 docs) ✓
- [x] Index documents in OpenSearch with <5s latency ✓
- [x] Query API returns results with <500ms latency (p95) ✓
- [x] Vector search relevance >80% (manual eval on 20 queries) ✓

### Operational

- [x] All infrastructure deployed via CloudFormation ✓
- [x] End-to-end pipeline runs automatically ✓
- [x] Error rate <1% for ingestion pipeline ✓
- [x] CloudWatch dashboards show all key metrics ✓
- [x] Documentation complete ✓
- [x] Security audit passed ✓

### Business

- [x] MVP completed in 7 weeks ✓
- [x] Monthly cost within budget ($850-1,150) ✓
- [x] Ready for pilot customer onboarding ✓

---

## Key Risks & Mitigation

### Technical Risks

1. **Gemma model compatibility**
   - Mitigation: Validate in Week 1, have fallback (all-MiniLM-L6-v2)
2. **OpenSearch performance**
   - Mitigation: Benchmark early, tune k-NN parameters
3. **PDF parsing quality**
   - Mitigation: Test with diverse samples, add Textract if needed
4. **SageMaker cold starts**
   - Mitigation: Keep endpoint warm with scheduled pings

### Operational Risks

1. **Cost overruns**
   - Mitigation: Set CloudWatch billing alarms, monitor daily
2. **Security compliance**
   - Mitigation: Security audit in Sprint 5, encrypt everything
3. **Scaling bottlenecks**
   - Mitigation: Design for horizontal scaling, use SQS buffering

---

## Post-MVP Roadmap

### Phase 2: Production Hardening (Week 8-10)

- Multi-tenancy (separate indexes per customer)
- LLM answer generation (Bedrock Claude 3)
- Real-time document updates
- Customer portal UI (React + Amplify)

### Phase 3: Advanced Features (Week 11-14)

- Advanced RAG (hybrid search, re-ranking)
- Additional API connectors (BambooHR, ADP)
- Analytics dashboard
- Query performance optimization

### Phase 4: Scale & Optimize (Week 15+)

- Multi-region deployment
- Cost optimization (reserved instances, Spot)
- Advanced monitoring (Datadog)
- Disaster recovery and backup

---

## Resources

### Documentation

- [discovery.md](discovery.md) - Technical requirements and questions
- [mvp-implementation-plan.md](mvp-implementation-plan.md) - Detailed 7-week plan
- [discovery_plan.md](discovery_plan.md) - Discovery process tracking

### External Resources

- [AWS OpenSearch Vector Search](https://docs.aws.amazon.com/opensearch-service/latest/developerguide/knn.html)
- [SageMaker HuggingFace](https://huggingface.co/docs/sagemaker/index)
- [AWS CloudFormation Best Practices](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/best-practices.html)
- [LangChain Text Splitters](https://python.langchain.com/docs/modules/data_connection/document_transformers/)

---

## Contact & Support

### Team Communication

- Daily standups: [Time TBD]
- Sprint planning: [Time TBD]
- Slack/Teams channel: [TBD]

### Escalation

- Technical blockers: [TBD]
- AWS support: [TBD]
- Budget/timeline concerns: [TBD]

---

## Quick Start Checklist

**Before Sprint 1 Kickoff:**

- [ ] All critical questions answered (see [discovery.md](discovery.md))
- [ ] AWS account set up with billing alarms
- [ ] Repository created with project structure
- [ ] CI/CD pipeline configured
- [ ] Jira project created with all stories imported
- [ ] Team onboarded and roles assigned
- [ ] Gemma model validated (or fallback selected)
- [ ] Sprint 1 planning meeting scheduled

**Ready to start?** → Kick off Sprint 1! 🚀
