# DatatoRAG Architecture Comparison

This document compares different architectural approaches for building DatatoRAG's HR document RAG service.

---

## Executive Summary

**Recommendation:** ✅ **OpenSearch + SageMaker Custom Embeddings**

**Key Reasons:**

1. AWS Knowledge Bases doesn't support custom embedding models (Gemma blocked)
2. Custom embeddings enable product differentiation and superior search quality
3. Full control allows HR domain optimization (fine-tuning, specialized preprocessing)
4. Cost predictability with SageMaker auto-scaling vs per-query pricing

---

## Architecture Options

### Option 1: AWS Knowledge Bases for Amazon Bedrock

**Overview:** Fully managed RAG service with built-in vector database and embedding generation.

```
S3 Documents
    ↓
AWS Knowledge Base (managed)
    ├── Automatic chunking
    ├── Titan/Cohere embeddings
    └── Vector storage
    ↓
Amazon Bedrock API
    ↓
Your Application
```

#### Pros

| Benefit                 | Impact                        |
| ----------------------- | ----------------------------- |
| Fully managed           | No infrastructure maintenance |
| Fast setup              | <1 day to production          |
| Integrated with Bedrock | Easy LLM integration          |
| Automatic syncing       | S3 changes auto-indexed       |
| Built-in chunking       | No need to implement          |
| AWS-native              | Single vendor, good support   |

#### Cons

| Limitation                   | Impact                                         | Severity        |
| ---------------------------- | ---------------------------------------------- | --------------- |
| **Limited embedding models** | Only Titan (1024/384 dim) or Cohere            | 🔴 **CRITICAL** |
| **No custom models**         | Cannot use Gemma or fine-tuned models          | 🔴 **CRITICAL** |
| **No fine-tuning**           | Can't optimize for HR terminology              | 🟠 **HIGH**     |
| **Fixed chunking**           | Limited control over preprocessing             | 🟠 **HIGH**     |
| **Less advanced RAG**        | Harder to implement re-ranking, hybrid search  | 🟡 **MEDIUM**   |
| **Per-query pricing**        | Less predictable at scale (~$0.0004/1K tokens) | 🟡 **MEDIUM**   |
| **Vendor lock-in**           | Tied to Bedrock ecosystem                      | 🟡 **MEDIUM**   |
| **Limited observability**    | Less control over metrics/debugging            | 🟢 **LOW**      |

#### Cost Estimate

- **Ingestion:** ~$0.10 per 1M tokens indexed
- **Queries:** ~$0.0004 per 1K tokens queried
- **Estimated Monthly (1M docs, 100K queries):** $200-400

#### Verdict

❌ **REJECTED** - Cannot use Gemma embeddings (blocker)

---

### Option 2: OpenSearch + SageMaker (Custom Embeddings) ✅ RECOMMENDED

**Overview:** Self-managed vector database with custom embedding generation via SageMaker.

```
Customer Sources (FTP, APIs)
    ↓
ETL Pipeline (Lambda + ECS)
    ├── PDF parsing
    ├── Text cleaning
    └── Custom chunking (LangChain)
    ↓
SageMaker Endpoint (Gemma 300M)
    ├── Custom inference code
    └── 768-dim embeddings
    ↓
OpenSearch (k-NN vector search)
    ├── Hybrid search (vector + keyword)
    └── Custom scoring/filtering
    ↓
API Gateway + Lambda (Query API)
```

#### Pros

| Benefit                     | Impact                                              |
| --------------------------- | --------------------------------------------------- |
| **Full model flexibility**  | Use Gemma, custom fine-tuned, any HuggingFace model |
| **Domain optimization**     | Fine-tune embeddings on HR terminology              |
| **Product differentiation** | Custom embeddings = competitive advantage           |
| **Advanced RAG**            | Hybrid search, re-ranking, query expansion, filters |
| **Cost predictability**     | Fixed SageMaker endpoint + auto-scaling             |
| **Multi-tenancy ready**     | Separate indexes per customer, per-customer models  |
| **No vendor lock-in**       | Can swap OpenSearch for alternatives                |
| **Full observability**      | Complete CloudWatch metrics, custom dashboards      |
| **CloudFormation IaC**      | Reproducible, version-controlled infrastructure     |

#### Cons

| Challenge                  | Mitigation                                  |
| -------------------------- | ------------------------------------------- |
| More infrastructure        | CloudFormation automates everything         |
| Longer setup (~2 weeks)    | One-time cost, better long-term flexibility |
| Need to build ETL          | More control, reusable for other features   |
| Manage SageMaker lifecycle | Auto-scaling, monitoring, runbooks          |
| More CloudWatch alarms     | Comprehensive monitoring template provided  |

#### Cost Estimate

| Service     | Configuration                | Monthly Cost   |
| ----------- | ---------------------------- | -------------- |
| OpenSearch  | r6g.large x 2, 100GB EBS     | $350-400       |
| SageMaker   | ml.g5.xlarge (~50% util)     | $400-600       |
| Lambda      | 1M invocations, 512MB avg    | $10-20         |
| ECS Fargate | 2 vCPU, 4GB, 100 hrs/mo      | $15-20         |
| S3          | 100GB storage, 1TB transfer  | $30-40         |
| Other       | API Gateway, SQS, CloudWatch | $30-50         |
| **TOTAL**   |                              | **$850-1,150** |

#### Verdict

✅ **SELECTED** - Best for custom embeddings and product differentiation

---

### Option 3: Pinecone + SageMaker

**Overview:** Managed vector database (Pinecone) + SageMaker embeddings.

```
ETL Pipeline
    ↓
SageMaker (Gemma)
    ↓
Pinecone (managed vector DB)
    ↓
Your API
```

#### Pros

- ✅ Fully managed vector DB
- ✅ Custom embedding support
- ✅ Fast setup
- ✅ Good performance

#### Cons

- ❌ Additional vendor outside AWS
- ❌ Data egress costs from AWS (~$0.09/GB)
- ❌ Per-vector pricing (less predictable)
- ❌ Cross-platform security complexity
- ❌ Potential compliance issues (data leaves AWS)
- ❌ Still need SageMaker for embeddings

#### Cost Estimate

- Pinecone: ~$70/mo (starter) to $500+/mo (production)
- SageMaker: ~$500/mo
- Data egress: $50-100/mo
- **Total:** $620-1,100/mo

#### Verdict

❌ **REJECTED** - Prefer AWS-native, avoid multi-vendor complexity

---

### Option 4: pgvector (PostgreSQL) + SageMaker

**Overview:** Open-source vector extension for PostgreSQL + SageMaker embeddings.

```
ETL Pipeline
    ↓
SageMaker (Gemma)
    ↓
RDS PostgreSQL with pgvector
    ↓
Your API
```

#### Pros

- ✅ Open source (no licensing fees)
- ✅ Familiar PostgreSQL
- ✅ Custom embeddings
- ✅ Good for smaller scale

#### Cons

- ❌ Less mature for vector search vs OpenSearch
- ❌ Performance concerns at scale (>1M vectors)
- ❌ Limited k-NN algorithms (vs OpenSearch HNSW, IVF, etc.)
- ❌ Need database expertise for tuning
- ❌ Less native AWS integration

#### Cost Estimate

- RDS PostgreSQL: ~$200-400/mo (db.r6g.large)
- SageMaker: ~$500/mo
- **Total:** $700-900/mo

#### Verdict

❌ **REJECTED** - OpenSearch more mature for vector search at scale

---

### Option 5: Self-Hosted Milvus/Qdrant + SageMaker

**Overview:** Deploy open-source vector DB (Milvus/Qdrant) on ECS/EKS + SageMaker.

```
ETL Pipeline
    ↓
SageMaker (Gemma)
    ↓
Milvus/Qdrant (ECS/EKS)
    ↓
Your API
```

#### Pros

- ✅ Purpose-built for vector search
- ✅ Good performance
- ✅ Custom embeddings
- ✅ Open source

#### Cons

- ❌ Even more infrastructure to manage (vs OpenSearch managed)
- ❌ Need to manage scaling, backups, upgrades
- ❌ Less AWS integration
- ❌ Smaller community vs OpenSearch

#### Cost Estimate

- ECS/EKS: ~$300-500/mo
- SageMaker: ~$500/mo
- **Total:** $800-1,000/mo

#### Verdict

❌ **REJECTED** - Too much operational overhead vs OpenSearch managed service

---

## Decision Matrix

| Criteria                   | Weight | AWS KB | OpenSearch + SageMaker | Pinecone | pgvector | Milvus |
| -------------------------- | ------ | ------ | ---------------------- | -------- | -------- | ------ |
| **Custom Embeddings**      | 30%    | 0      | 10                     | 10       | 10       | 10     |
| **Domain Optimization**    | 20%    | 0      | 10                     | 8        | 8        | 8      |
| **Setup Time**             | 10%    | 10     | 5                      | 8        | 6        | 4      |
| **Cost Predictability**    | 10%    | 7      | 9                      | 6        | 8        | 7      |
| **AWS Integration**        | 10%    | 10     | 10                     | 5        | 8        | 6      |
| **Operational Complexity** | 10%    | 10     | 7                      | 8        | 6        | 5      |
| **Advanced RAG Features**  | 5%     | 5      | 10                     | 7        | 6        | 8      |
| **Scalability**            | 5%     | 8      | 9                      | 9        | 6        | 8      |

### Weighted Scores

1. **OpenSearch + SageMaker: 8.35** ⭐ **WINNER**
2. AWS Knowledge Bases: 3.30 (blocked by custom embeddings)
3. Pinecone + SageMaker: 7.60
4. pgvector + SageMaker: 7.20
5. Milvus + SageMaker: 7.15

---

## Cost Comparison (Monthly)

| Architecture               | Low      | High       | Predictability         |
| -------------------------- | -------- | ---------- | ---------------------- |
| AWS KB                     | $200     | $500       | 🟡 Medium (per-query)  |
| **OpenSearch + SageMaker** | **$850** | **$1,150** | 🟢 **High (fixed)**    |
| Pinecone + SageMaker       | $620     | $1,100     | 🟡 Medium (per-vector) |
| pgvector + SageMaker       | $700     | $900       | 🟢 High (fixed)        |
| Milvus + SageMaker         | $800     | $1,000     | 🟢 High (fixed)        |

**Note:** OpenSearch cost is higher but includes:

- Full infrastructure control
- Advanced RAG capabilities
- Custom embedding flexibility
- Better for product differentiation

---

## Timeline Comparison

| Architecture               | Setup Time  | Time to MVP |
| -------------------------- | ----------- | ----------- |
| AWS KB                     | 1-2 days    | 1 week      |
| **OpenSearch + SageMaker** | **2 weeks** | **7 weeks** |
| Pinecone + SageMaker       | 1 week      | 4 weeks     |
| pgvector + SageMaker       | 1.5 weeks   | 5 weeks     |
| Milvus + SageMaker         | 2 weeks     | 6 weeks     |

**Analysis:** OpenSearch setup takes longer but provides best long-term flexibility and product differentiation.

---

## Feature Comparison

| Feature           | AWS KB  | OpenSearch + SageMaker | Pinecone | pgvector | Milvus  |
| ----------------- | ------- | ---------------------- | -------- | -------- | ------- |
| Custom Embeddings | ❌      | ✅                     | ✅       | ✅       | ✅      |
| Fine-tuning       | ❌      | ✅                     | ✅       | ✅       | ✅      |
| Hybrid Search     | Limited | ✅ Full                | ✅       | Limited  | ✅      |
| Re-ranking        | ❌      | ✅                     | ❌       | ❌       | ✅      |
| Multi-tenancy     | Limited | ✅ Full                | ✅       | ✅       | ✅      |
| AWS Integration   | ✅ Full | ✅ Full                | Partial  | Good     | Partial |
| Managed Service   | ✅      | ✅ (OpenSearch)        | ✅       | ✅ (RDS) | ❌      |
| IaC Support       | ✅      | ✅ Full                | Partial  | ✅       | Partial |
| Observability     | Limited | ✅ Full                | Good     | Good     | Good    |

---

## Risk Analysis

### OpenSearch + SageMaker Risks

| Risk                      | Probability | Impact | Mitigation                                       |
| ------------------------- | ----------- | ------ | ------------------------------------------------ |
| SageMaker cold starts     | Medium      | Low    | Keep endpoint warm with scheduled pings          |
| OpenSearch performance    | Low         | Medium | Benchmark early, tune k-NN parameters            |
| Cost overruns             | Medium      | Medium | CloudWatch billing alarms, auto-scaling limits   |
| Operational complexity    | Medium      | Low    | CloudFormation IaC, comprehensive monitoring     |
| Gemma model compatibility | Low         | High   | Validate in Sprint 1, have fallback (all-MiniLM) |

---

## Recommendation

### Primary: OpenSearch + SageMaker ✅

**Best for DatatoRAG because:**

1. ✅ Supports custom embeddings (Gemma 300M)
2. ✅ Enables product differentiation through superior search
3. ✅ Full control for HR domain optimization
4. ✅ AWS-native with CloudFormation IaC
5. ✅ Cost predictable and scalable
6. ✅ Advanced RAG features ready for future

**Accept trade-offs:**

- 2-week longer setup (7 weeks vs 5 weeks for alternatives)
- More infrastructure to manage (mitigated by IaC)
- Higher initial cost ($850-1,150 vs $620-900 for alternatives)

### Fallback: Pinecone + SageMaker

**If OpenSearch proves too complex:**

- Faster setup (4 weeks vs 7 weeks)
- Less infrastructure to manage
- Still supports custom embeddings
- Trade-off: Multi-vendor complexity, data egress costs

---

## Next Steps

1. ✅ **Decision confirmed:** OpenSearch + SageMaker
2. ✅ **ADR created:** [adr-001-custom-embeddings.md](adr-001-custom-embeddings.md)
3. ✅ **MVP plan updated:** [mvp-implementation-plan.md](mvp-implementation-plan.md)
4. 🔄 **Sprint 1:** Validate Gemma model compatibility
5. 🔄 **Sprint 2:** Deploy OpenSearch + SageMaker
6. 🔄 **Continuous:** Monitor costs, performance, and operational complexity

---

## References

- [AWS Knowledge Bases Documentation](https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base.html)
- [OpenSearch k-NN Plugin](https://opensearch.org/docs/latest/search-plugins/knn/index/)
- [SageMaker HuggingFace](https://huggingface.co/docs/sagemaker/index)
- [Pinecone Pricing](https://www.pinecone.io/pricing/)
- [pgvector GitHub](https://github.com/pgvector/pgvector)
- [Milvus Documentation](https://milvus.io/docs)

---

**Document Status:** ✅ Complete - Decision made and documented
**Last Updated:** 2025-10-12
