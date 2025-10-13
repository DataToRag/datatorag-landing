# ADR-001: Use Custom Embeddings with OpenSearch + SageMaker Instead of AWS Knowledge Bases

**Status:** ✅ Accepted

**Date:** 2025-10-12

**Decision Makers:** DatatoRAG Team

---

## Context and Problem Statement

DatatoRAG needs a vector database and embedding generation solution for HR document RAG. We need to decide between:

1. **AWS Knowledge Bases for Amazon Bedrock** (managed service)
2. **Custom architecture with OpenSearch + SageMaker** (self-managed)
3. **Other managed vector DB services** (Pinecone, Weaviate, etc.)

Key requirements:

- Use **Google Gemma 300M** (768-dim embeddings) for optimal performance
- Support HR-specific document processing and terminology
- Flexibility to experiment with different embedding models
- Multi-tenancy support (separate data per customer)
- Cost-effective for MVP and scale
- Full control over chunking and preprocessing

---

## Decision

**We will use OpenSearch Service + SageMaker** for custom embedding generation rather than AWS Knowledge Bases.

### Architecture

```
Customer Data Sources (FTP, Workday, Rippling)
    ↓
ETL Pipeline (Lambda + ECS)
    ↓ (document processing, chunking)
SageMaker Endpoint (Custom Gemma Embeddings)
    ↓ (768-dim vectors)
OpenSearch Service (k-NN vector search)
    ↓ (hybrid search: vector + keyword)
API Gateway + Lambda (Query API)
```

---

## Decision Drivers

### 1. **Embedding Model Flexibility** ⭐ Critical

- **Requirement:** Use Google Gemma 300M (768 dimensions)
- **AWS KB:** Only supports Titan Embeddings (1024 or 384 dim) and Cohere models
- **Our Solution:** SageMaker allows ANY HuggingFace model or custom models

### 2. **Domain-Specific Optimization** ⭐ Critical

- **Requirement:** Optimize embeddings for HR terminology (PTO, 401k, benefits, etc.)
- **AWS KB:** No ability to fine-tune or customize embeddings
- **Our Solution:** Can fine-tune Gemma on HR corpus, experiment with specialized models

### 3. **Product Differentiation**

- **AWS KB:** Commodity service - all competitors have access
- **Our Solution:** Custom embeddings = competitive advantage in search quality

### 4. **Cost Control**

- **AWS KB:** Pay-per-query pricing (~$0.0004 per 1K tokens)
- **Our Solution:** Fixed SageMaker endpoint cost + auto-scaling, more predictable

### 5. **Multi-Model Support (Future)**

- **Requirement:** May want per-customer model variants or A/B testing
- **AWS KB:** One embedding model per KB
- **Our Solution:** Easy to deploy multiple SageMaker endpoints

---

## Considered Options

### Option 1: AWS Knowledge Bases for Amazon Bedrock

**Pros:**

- ✅ Fully managed (no infrastructure to maintain)
- ✅ Fast setup (< 1 day)
- ✅ Integrated with Bedrock LLMs
- ✅ Automatic syncing from S3
- ✅ Built-in chunking strategies

**Cons:**

- ❌ **BLOCKER:** Limited to Titan or Cohere embeddings (no Gemma)
- ❌ No custom embedding models
- ❌ No fine-tuning capability
- ❌ Less control over chunking (fixed strategies)
- ❌ Harder to implement advanced RAG (re-ranking, hybrid search)
- ❌ Vendor lock-in to Bedrock ecosystem
- ❌ Per-query pricing (less predictable at scale)
- ❌ Limited observability (less control over metrics)

**Supported Models:**

- Amazon Titan Text Embeddings v1 (1024 dim) or v2 (384 dim)
- Cohere Embed English/Multilingual

**Decision:** ❌ Rejected due to embedding model limitations

---

### Option 2: OpenSearch + SageMaker (Custom Embeddings) ✅ SELECTED

**Pros:**

- ✅ **Full model flexibility** - Use Gemma, custom fine-tuned, or future models
- ✅ Complete control over embedding generation pipeline
- ✅ Advanced vector search (k-NN, hybrid, custom scoring)
- ✅ Cost predictability (fixed SageMaker endpoint + auto-scaling)
- ✅ Multi-tenancy ready (separate indexes per customer)
- ✅ Fine-tuning capability for HR domain
- ✅ CloudFormation IaC (reproducible, version-controlled)
- ✅ Advanced RAG features (re-ranking, query expansion, filters)
- ✅ No vendor lock-in (can swap OpenSearch for alternatives)
- ✅ Better observability (full CloudWatch metrics)

**Cons:**

- ❌ More infrastructure to manage (VPC, security groups, etc.)
- ❌ Longer initial setup (~2 weeks vs 1 day)
- ❌ Need to build ETL pipeline ourselves
- ❌ Need to manage SageMaker endpoint lifecycle
- ❌ More CloudFormation stacks to maintain

**Cost Estimate (MVP):**

- OpenSearch: r6g.large x 2 = ~$350/mo
- SageMaker: ml.g5.xlarge (~50% util) = ~$500/mo
- Total: ~$850/mo (predictable)

**Decision:** ✅ **SELECTED** - Benefits outweigh complexity

---

### Option 3: Managed Vector DBs (Pinecone, Weaviate, Qdrant)

**Pros:**

- ✅ Fully managed vector databases
- ✅ Custom embedding support
- ✅ Fast setup
- ✅ Good performance

**Cons:**

- ❌ Additional vendor (outside AWS ecosystem)
- ❌ Data egress costs from AWS
- ❌ Per-query or per-vector pricing (less predictable)
- ❌ Still need SageMaker or alternative for embeddings
- ❌ Cross-platform security complexity
- ❌ Potential compliance issues (data leaves AWS)

**Decision:** ❌ Rejected - Prefer AWS-native for MVP, less complexity

---

### Option 4: Self-Hosted Vector DB (pgvector, Milvus, Chroma)

**Pros:**

- ✅ Complete control
- ✅ No per-query costs
- ✅ Custom embedding support

**Cons:**

- ❌ Even more infrastructure to manage
- ❌ No managed scaling
- ❌ Need database expertise
- ❌ Less mature than OpenSearch for production

**Decision:** ❌ Rejected - Too much operational overhead for MVP

---

## Consequences

### Positive

1. **Model Flexibility:** Can use Gemma now, fine-tune later, swap models anytime
2. **Competitive Advantage:** Custom embeddings = better search relevance
3. **Future-Proof:** Ready for advanced RAG (hybrid search, re-ranking, multi-modal)
4. **Cost Predictability:** Fixed infrastructure costs, easier budgeting
5. **Full Control:** Own the entire pipeline, can optimize anywhere
6. **Multi-Tenancy:** Easy to implement per-customer indexes or models

### Negative

1. **Longer MVP Timeline:** +1-2 weeks vs AWS KB (acceptable trade-off)
2. **More Infrastructure:** Need to manage OpenSearch + SageMaker (mitigated by CloudFormation)
3. **Operational Complexity:** More components to monitor (mitigated by CloudWatch dashboards)

### Risks & Mitigations

| Risk                      | Mitigation                                     |
| ------------------------- | ---------------------------------------------- |
| SageMaker cold starts     | Keep endpoint warm with scheduled pings        |
| OpenSearch performance    | Benchmark early, tune k-NN params              |
| Higher operational burden | CloudFormation IaC, comprehensive monitoring   |
| Cost overruns             | CloudWatch billing alarms, auto-scaling limits |

---

## Validation

### Proof Points

- ✅ Gemma 300M embeddings work with OpenSearch k-NN (768 dimensions supported)
- ✅ SageMaker supports HuggingFace models via DLC containers
- ✅ OpenSearch k-NN performance meets requirements (<200ms queries)
- ✅ CloudFormation can automate entire stack deployment

### Success Metrics (to validate decision)

- [ ] Embedding generation latency <2s per batch (32 docs)
- [ ] Vector search latency <500ms (p95)
- [ ] Search relevance >80% (vs Titan baseline)
- [ ] Monthly cost within $850-1,150 budget
- [ ] Can swap embedding models in <1 day

---

## Related Decisions

- ADR-002: SageMaker vs Lambda for embedding generation (TBD)
- ADR-003: OpenSearch vs pgvector for vector storage (TBD)
- ADR-004: Embedding model selection (Gemma vs alternatives) (TBD)

---

## References

- [AWS Knowledge Bases Documentation](https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base.html)
- [AWS Knowledge Bases Supported Models](https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base-supported-models.html)
- [OpenSearch k-NN Plugin](https://opensearch.org/docs/latest/search-plugins/knn/index/)
- [SageMaker HuggingFace Integration](https://huggingface.co/docs/sagemaker/index)
- [Google Gemma Model](https://huggingface.co/google/gemma-2-300m)

---

## Notes

- This decision was made during initial architecture planning (Oct 2025)
- Can be revisited if AWS KB adds custom embedding support
- Review this ADR after MVP launch based on operational experience

---

**Next ADRs to Create:**

- ADR-002: Why SageMaker endpoint over Lambda for embeddings (GPU, batch size)
- ADR-003: Why OpenSearch over pgvector (managed, k-NN maturity, AWS integration)
- ADR-004: Why Gemma 300M over other embedding models (size, performance, quality)
