# DatatoRAG MVP - Implementation Plan

## Architecture Summary

**Data Sources:**

- HR policy documents (PDFs, handbooks, benefits docs)
- FTP servers (primary ingestion method)
- APIs (Workday, Rippling, etc.)

**AWS Infrastructure:**

- VPC with private/public subnets
- OpenSearch Service cluster (vector search enabled)
- SageMaker endpoint (Google Gemma 300M embeddings)
- Lambda/ECS for ETL pipeline
- API Gateway + Lambda for RAG query API

**Stack:**

- IaC: AWS CloudFormation
- ETL: Python (Lambda + ECS for large jobs)
- API: Python (FastAPI on Lambda)
- Project Management: Jira

---

## Why Custom Embeddings Architecture? (vs AWS Knowledge Bases)

### ❌ AWS Knowledge Bases Limitations

AWS Knowledge Bases for Amazon Bedrock is a managed RAG service, but has critical limitations:

**Embedding Model Restrictions:**

- Only supports **Amazon Titan Embeddings** (1024 or 384 dim)
- Only supports **Cohere Embed** models
- **NO support for custom models** (Gemma, fine-tuned models, etc.)
- Cannot fine-tune for domain-specific terminology

**Why This Matters for DatatoRAG:**

- We need **Google Gemma 300M** (768 dimensions) for optimal performance
- HR domain has specific terminology (PTO, 401k, benefits, etc.) that benefits from custom embeddings
- Want flexibility to experiment with different embedding models
- Need ability to fine-tune on customer-specific HR documents

### ✅ Our Architecture: OpenSearch + SageMaker

**Key Advantages:**

1. **Model Flexibility** - Use ANY embedding model (Gemma, custom fine-tuned, future models)
2. **Domain Optimization** - Can fine-tune embeddings on HR terminology
3. **Product Differentiation** - Custom embeddings = competitive advantage in search quality
4. **Cost Predictability** - Fixed SageMaker endpoint cost + auto-scaling (vs per-query pricing)
5. **Multi-Tenancy** - Easy to implement per-customer model variants
6. **Advanced RAG** - Full control for hybrid search, re-ranking, custom scoring
7. **No Vendor Lock-in** - Can swap OpenSearch for alternatives if needed

**Trade-offs:**

- More infrastructure to manage (mitigated by CloudFormation IaC)
- Longer initial setup (~2 weeks vs 1 day for KB)
- Need to build ETL pipeline ourselves (but more control)

**Decision Status:** ✅ Confirmed - See [adr-001-custom-embeddings.md](adr-001-custom-embeddings.md) for full rationale

---

## Project Structure

```
datatorag-mvp/
├── infrastructure/
│   ├── cloudformation/
│   │   ├── 01-network-stack.yaml
│   │   ├── 02-security-stack.yaml
│   │   ├── 03-storage-stack.yaml
│   │   ├── 04-secrets-stack.yaml
│   │   ├── 05-opensearch-stack.yaml
│   │   ├── 06-sagemaker-stack.yaml
│   │   ├── 07-etl-lambda-stack.yaml
│   │   ├── 08-etl-ecs-stack.yaml
│   │   ├── 09-etl-queue-stack.yaml
│   │   └── 10-api-stack.yaml
│   └── scripts/
│       ├── deploy.sh
│       └── teardown.sh
├── etl/
│   ├── ingestion/
│   │   └── lambda/
│   │       ├── handler.py
│   │       ├── ftp_client.py
│   │       ├── api_clients.py
│   │       └── requirements.txt
│   ├── processor/
│   │   └── ecs/
│   │       ├── main.py
│   │       ├── pdf_parser.py
│   │       ├── text_cleaner.py
│   │       ├── chunker.py
│   │       ├── Dockerfile
│   │       └── requirements.txt
│   ├── embedder/
│   │   └── lambda/
│   │       ├── handler.py
│   │       ├── sagemaker_client.py
│   │       └── requirements.txt
│   └── indexer/
│       └── lambda/
│           ├── handler.py
│           ├── opensearch_client.py
│           └── requirements.txt
├── sagemaker/
│   └── models/
│       └── gemma-embeddings/
│           ├── inference.py
│           ├── requirements.txt
│           └── model_download.py
├── api/
│   └── lambda/
│       ├── handler.py
│       ├── query_service.py
│       ├── vector_search.py
│       ├── requirements.txt
│       └── Dockerfile
├── tests/
│   ├── integration/
│   └── unit/
├── docs/
│   ├── architecture.md
│   ├── deployment.md
│   └── api-documentation.md
└── README.md
```

---

## Phase 1: Infrastructure Foundation

### CloudFormation Stacks

#### Stack 1: Network Infrastructure (`01-network-stack.yaml`)

**Resources:**

- VPC with CIDR 10.0.0.0/16
- 2 Public Subnets (10.0.1.0/24, 10.0.2.0/24) across 2 AZs
- 2 Private Subnets (10.0.10.0/24, 10.0.11.0/24) across 2 AZs
- Internet Gateway
- NAT Gateway (1 or 2 for HA)
- Route Tables
- VPC Endpoints: S3, SageMaker, OpenSearch, Secrets Manager

**Outputs:**

- VPC ID
- Subnet IDs
- Route Table IDs

#### Stack 2: Security (`02-security-stack.yaml`)

**IAM Roles:**

- `DataToRAGLambdaExecutionRole` (Lambda functions)
- `DataToRAGECSTaskRole` (ECS tasks)
- `DataToRAGSageMakerRole` (SageMaker endpoint)
- `DataToRAGOpenSearchRole` (OpenSearch access)

**Security Groups:**

- `LambdaSG` - Lambda functions
- `ECSSG` - ECS tasks
- `OpenSearchSG` - OpenSearch domain (port 443 from Lambda/ECS)
- `SageMakerSG` - SageMaker endpoint

**Policies:**

- S3 read/write access
- SageMaker invoke endpoint
- OpenSearch index/search
- Secrets Manager read
- CloudWatch logs write
- SQS send/receive

#### Stack 3: Storage (`03-storage-stack.yaml`)

**S3 Buckets:**

- `datatorag-raw-docs-{account-id}` - Raw documents from FTP/APIs
- `datatorag-processed-{account-id}` - Processed/chunked data
- `datatorag-embeddings-cache-{account-id}` - Embedding cache
- `datatorag-sagemaker-models-{account-id}` - Model artifacts

**Configuration:**

- Versioning enabled
- Encryption at rest (SSE-S3)
- Lifecycle policies (archive to Glacier after 90 days)
- Event notifications to SQS

#### Stack 4: Secrets & Configuration (`04-secrets-stack.yaml`)

**Secrets Manager:**

- `datatorag/ftp/credentials` - FTP credentials
- `datatorag/workday/api-key` - Workday API key
- `datatorag/rippling/api-key` - Rippling API key
- `datatorag/opensearch/master-user` - OpenSearch master user

**Systems Manager Parameter Store:**

- `/datatorag/config/chunk-size` - Document chunk size (512)
- `/datatorag/config/chunk-overlap` - Chunk overlap (50)
- `/datatorag/config/embedding-dimension` - Vector dimension (768)

---

## Phase 2A: OpenSearch Cluster

### Stack 5: OpenSearch (`05-opensearch-stack.yaml`)

**Domain Configuration:**

- Domain name: `datatorag-opensearch-prod`
- Version: OpenSearch 2.11+
- Instance type: `r6g.large.search`
- Instance count: 2 (HA across 2 AZs)
- EBS: 100GB gp3 per node
- Dedicated master: No (for MVP)

**Network:**

- VPC deployment (private subnets)
- Security group: OpenSearchSG
- Internal endpoint only (no public access)

**Access Control:**

- Fine-grained access control enabled
- Master user from Secrets Manager
- IAM role-based access for Lambda/ECS

**Performance:**

- k-NN plugin enabled
- JVM heap: 50% of instance memory
- Circuit breakers configured

**Index Template for HR Documents:**

```json
{
  "index_patterns": ["hr-documents-*"],
  "template": {
    "settings": {
      "number_of_shards": 2,
      "number_of_replicas": 1,
      "index.knn": true,
      "index.knn.algo_param.ef_search": 100
    },
    "mappings": {
      "properties": {
        "doc_id": {
          "type": "keyword"
        },
        "source": {
          "type": "keyword",
          "fields": {
            "text": { "type": "text" }
          }
        },
        "doc_type": {
          "type": "keyword"
        },
        "title": {
          "type": "text",
          "analyzer": "standard"
        },
        "content": {
          "type": "text",
          "analyzer": "standard"
        },
        "chunk_text": {
          "type": "text",
          "analyzer": "standard"
        },
        "chunk_index": {
          "type": "integer"
        },
        "embedding": {
          "type": "knn_vector",
          "dimension": 768,
          "method": {
            "name": "hnsw",
            "space_type": "cosinesimil",
            "engine": "nmslib",
            "parameters": {
              "ef_construction": 128,
              "m": 16
            }
          }
        },
        "metadata": {
          "type": "object",
          "properties": {
            "customer_id": { "type": "keyword" },
            "file_name": { "type": "keyword" },
            "file_size": { "type": "long" },
            "upload_date": { "type": "date" },
            "source_url": { "type": "keyword" }
          }
        },
        "timestamp": {
          "type": "date"
        }
      }
    }
  }
}
```

**Monitoring:**

- CloudWatch alarms: ClusterStatus.red, FreeStorageSpace, CPUUtilization
- OpenSearch Dashboards enabled (for debugging)

---

## Phase 2B: SageMaker Endpoint

### Stack 6: SageMaker (`06-sagemaker-stack.yaml`)

**Model Configuration:**

- Model name: `gemma-embeddings-300m`
- Source: HuggingFace `google/gemma-2-300m` or custom embedding variant
- Container: HuggingFace Inference DLC (GPU)
- Instance type: `ml.g5.xlarge` (1 GPU, 4 vCPUs, 16GB RAM)

**Endpoint Configuration:**

- Endpoint name: `datatorag-gemma-embeddings-prod`
- Initial instance count: 1
- Auto-scaling:
  - Min: 1, Max: 3
  - Target metric: `SageMakerVariantInvocationsPerInstance`
  - Target value: 1000 invocations per minute

**Custom Inference Code:**

```python
# sagemaker/models/gemma-embeddings/inference.py
import json
import torch
from transformers import AutoModel, AutoTokenizer

def model_fn(model_dir):
    """Load model and tokenizer."""
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    tokenizer = AutoTokenizer.from_pretrained(model_dir)
    model = AutoModel.from_pretrained(model_dir).to(device)
    model.eval()
    return {"model": model, "tokenizer": tokenizer, "device": device}

def input_fn(request_body, request_content_type):
    """Parse input."""
    if request_content_type == "application/json":
        data = json.loads(request_body)
        return data["inputs"]
    raise ValueError(f"Unsupported content type: {request_content_type}")

def predict_fn(input_data, model_dict):
    """Generate embeddings."""
    model = model_dict["model"]
    tokenizer = model_dict["tokenizer"]
    device = model_dict["device"]

    # Handle batch or single input
    if isinstance(input_data, str):
        input_data = [input_data]

    # Tokenize
    inputs = tokenizer(
        input_data,
        padding=True,
        truncation=True,
        max_length=512,
        return_tensors="pt"
    ).to(device)

    # Generate embeddings
    with torch.no_grad():
        outputs = model(**inputs)
        # Mean pooling
        embeddings = outputs.last_hidden_state.mean(dim=1)
        # Normalize
        embeddings = torch.nn.functional.normalize(embeddings, p=2, dim=1)

    return embeddings.cpu().numpy().tolist()

def output_fn(prediction, response_content_type):
    """Format output."""
    if response_content_type == "application/json":
        return json.dumps({"embeddings": prediction})
    raise ValueError(f"Unsupported content type: {response_content_type}")
```

**Model Deployment Steps:**

1. Download Gemma model from HuggingFace
2. Package with inference.py and requirements.txt
3. Upload to S3 model bucket
4. Create SageMaker model
5. Create endpoint configuration
6. Deploy endpoint

**Monitoring:**

- CloudWatch metrics: ModelLatency, Invocations, InvocationErrors
- Alarms: High latency (>2s), error rate (>1%)

---

## Phase 3: ETL Data Pipeline

### Architecture Flow

```
[FTP/API] → [S3 Raw] → [EventBridge/SQS] → [Ingestion Lambda]
    ↓
[S3 Raw Docs] → [S3 Event] → [SQS: processing-queue] → [Processor ECS Task]
    ↓
[Chunked Data] → [SQS: embedding-queue] → [Embedder Lambda] → [SageMaker]
    ↓
[Embeddings] → [SQS: indexing-queue] → [Indexer Lambda] → [OpenSearch]
```

### Stack 7: ETL Lambda Functions (`07-etl-lambda-stack.yaml`)

#### Lambda 1: Document Ingester

**Function:** `datatorag-document-ingester`

- Runtime: Python 3.11
- Memory: 512 MB
- Timeout: 300s
- Trigger: EventBridge (cron: every 1 hour) OR API Gateway
- Environment variables:
  - `RAW_BUCKET`: datatorag-raw-docs-{account-id}
  - `SECRET_PREFIX`: datatorag/

**Code Structure:**

```python
# etl/ingestion/lambda/handler.py
import boto3
import json
from datetime import datetime
from ftp_client import FTPClient
from api_clients import WorkdayClient, RipplingClient

s3 = boto3.client('s3')
secrets = boto3.client('secretsmanager')

def lambda_handler(event, context):
    """
    Fetch documents from configured sources.
    """
    customer_config = event.get('customer_config', {})

    results = {
        'ftp': [],
        'workday': [],
        'rippling': []
    }

    # FTP ingestion
    if customer_config.get('ftp_enabled'):
        ftp_docs = ingest_from_ftp(customer_config['ftp'])
        results['ftp'] = ftp_docs

    # Workday API
    if customer_config.get('workday_enabled'):
        workday_docs = ingest_from_workday(customer_config['workday'])
        results['workday'] = workday_docs

    # Rippling API
    if customer_config.get('rippling_enabled'):
        rippling_docs = ingest_from_rippling(customer_config['rippling'])
        results['rippling'] = rippling_docs

    return {
        'statusCode': 200,
        'body': json.dumps(results)
    }

def ingest_from_ftp(ftp_config):
    """Connect to FTP, download new documents."""
    secret = secrets.get_secret_value(SecretId='datatorag/ftp/credentials')
    credentials = json.loads(secret['SecretString'])

    ftp_client = FTPClient(
        host=ftp_config['host'],
        username=credentials['username'],
        password=credentials['password']
    )

    files = ftp_client.list_new_files(ftp_config.get('path', '/'))
    uploaded = []

    for file_path in files:
        # Download file
        content = ftp_client.download(file_path)

        # Upload to S3
        s3_key = f"raw/{datetime.now().strftime('%Y/%m/%d')}/{file_path.split('/')[-1]}"
        s3.put_object(
            Bucket=os.environ['RAW_BUCKET'],
            Key=s3_key,
            Body=content,
            Metadata={
                'source': 'ftp',
                'customer_id': ftp_config.get('customer_id', 'unknown'),
                'original_path': file_path
            }
        )
        uploaded.append(s3_key)

    return uploaded
```

```python
# etl/ingestion/lambda/ftp_client.py
from ftplib import FTP
import io

class FTPClient:
    def __init__(self, host, username, password, port=21):
        self.ftp = FTP()
        self.ftp.connect(host, port)
        self.ftp.login(username, password)

    def list_new_files(self, path='/'):
        """List files in directory."""
        self.ftp.cwd(path)
        files = []
        self.ftp.retrlines('LIST', files.append)
        # Parse and filter for PDFs
        pdf_files = [f.split()[-1] for f in files if f.endswith('.pdf')]
        return pdf_files

    def download(self, file_path):
        """Download file content."""
        buffer = io.BytesIO()
        self.ftp.retrbinary(f'RETR {file_path}', buffer.write)
        return buffer.getvalue()

    def close(self):
        self.ftp.quit()
```

#### Lambda 2: Embedder

**Function:** `datatorag-embedder`

- Runtime: Python 3.11
- Memory: 1024 MB
- Timeout: 60s
- Trigger: SQS (embedding-queue)
- Batch size: 10 messages
- Environment variables:
  - `SAGEMAKER_ENDPOINT`: datatorag-gemma-embeddings-prod

**Code:**

```python
# etl/embedder/lambda/handler.py
import boto3
import json
import os

sagemaker = boto3.client('sagemaker-runtime')
sqs = boto3.client('sqs')

ENDPOINT_NAME = os.environ['SAGEMAKER_ENDPOINT']
INDEXING_QUEUE_URL = os.environ['INDEXING_QUEUE_URL']

def lambda_handler(event, context):
    """Generate embeddings for document chunks."""
    records = event['Records']

    for record in records:
        body = json.loads(record['body'])
        chunks = body['chunks']
        metadata = body['metadata']

        # Batch chunks for efficiency (up to 32 at a time)
        batch_size = 32
        for i in range(0, len(chunks), batch_size):
            batch = chunks[i:i+batch_size]
            texts = [c['text'] for c in batch]

            # Call SageMaker
            embeddings = generate_embeddings(texts)

            # Attach embeddings to chunks
            for j, chunk in enumerate(batch):
                chunk['embedding'] = embeddings[j]

            # Send to indexing queue
            sqs.send_message(
                QueueUrl=INDEXING_QUEUE_URL,
                MessageBody=json.dumps({
                    'chunks': batch,
                    'metadata': metadata
                })
            )

    return {'statusCode': 200}

def generate_embeddings(texts):
    """Call SageMaker endpoint."""
    response = sagemaker.invoke_endpoint(
        EndpointName=ENDPOINT_NAME,
        ContentType='application/json',
        Body=json.dumps({'inputs': texts})
    )

    result = json.loads(response['Body'].read())
    return result['embeddings']
```

#### Lambda 3: Indexer

**Function:** `datatorag-indexer`

- Runtime: Python 3.11
- Memory: 1024 MB
- Timeout: 60s
- Trigger: SQS (indexing-queue)
- Batch size: 10 messages
- Environment variables:
  - `OPENSEARCH_ENDPOINT`: vpc-datatorag-opensearch-prod-xxx.region.es.amazonaws.com
  - `OPENSEARCH_INDEX`: hr-documents

**Code:**

```python
# etl/indexer/lambda/handler.py
import boto3
import json
import os
from opensearchpy import OpenSearch, RequestsHttpConnection
from requests_aws4auth import AWS4Auth

# OpenSearch client
region = os.environ.get('AWS_REGION', 'us-east-1')
service = 'es'
credentials = boto3.Session().get_credentials()
awsauth = AWS4Auth(credentials.access_key, credentials.secret_key,
                   region, service, session_token=credentials.token)

opensearch_client = OpenSearch(
    hosts=[{'host': os.environ['OPENSEARCH_ENDPOINT'], 'port': 443}],
    http_auth=awsauth,
    use_ssl=True,
    verify_certs=True,
    connection_class=RequestsHttpConnection
)

def lambda_handler(event, context):
    """Index documents with embeddings to OpenSearch."""
    records = event['Records']

    documents = []
    for record in records:
        body = json.loads(record['body'])
        chunks = body['chunks']
        metadata = body['metadata']

        for chunk in chunks:
            doc = {
                'doc_id': chunk['chunk_id'],
                'source': metadata['source'],
                'doc_type': metadata.get('doc_type', 'pdf'),
                'title': metadata.get('title', ''),
                'content': metadata.get('full_content', ''),
                'chunk_text': chunk['text'],
                'chunk_index': chunk['index'],
                'embedding': chunk['embedding'],
                'metadata': metadata,
                'timestamp': metadata['timestamp']
            }
            documents.append(doc)

    # Bulk index
    if documents:
        bulk_index(documents)

    return {'statusCode': 200, 'indexed': len(documents)}

def bulk_index(documents):
    """Bulk index to OpenSearch."""
    from opensearchpy import helpers

    actions = [
        {
            '_index': os.environ['OPENSEARCH_INDEX'],
            '_id': doc['doc_id'],
            '_source': doc
        }
        for doc in documents
    ]

    success, failed = helpers.bulk(
        opensearch_client,
        actions,
        raise_on_error=False
    )

    print(f"Indexed: {success}, Failed: {len(failed)}")
    return success
```

### Stack 8: ECS Processor (`08-etl-ecs-stack.yaml`)

**ECS Cluster:**

- Name: `datatorag-processor-cluster`
- Capacity: Fargate

**Task Definition:**

- Family: `datatorag-pdf-processor`
- CPU: 2 vCPU
- Memory: 4 GB
- Container:
  - Image: ECR `datatorag-processor:latest`
  - Logging: CloudWatch Logs

**Code:**

```python
# etl/processor/ecs/main.py
import boto3
import json
import os
from pdf_parser import PDFParser
from text_cleaner import TextCleaner
from chunker import TextChunker

s3 = boto3.client('s3')
sqs = boto3.client('sqs')

EMBEDDING_QUEUE_URL = os.environ['EMBEDDING_QUEUE_URL']
PROCESSED_BUCKET = os.environ['PROCESSED_BUCKET']

def main():
    """Process documents from SQS queue."""
    # Poll SQS
    response = sqs.receive_message(
        QueueUrl=os.environ['PROCESSING_QUEUE_URL'],
        MaxNumberOfMessages=1,
        WaitTimeSeconds=20
    )

    if 'Messages' not in response:
        return

    for message in response['Messages']:
        body = json.loads(message['Body'])

        # S3 event
        if 'Records' in body:
            for record in body['Records']:
                s3_event = record['s3']
                bucket = s3_event['bucket']['name']
                key = s3_event['object']['key']

                process_document(bucket, key)

        # Delete message
        sqs.delete_message(
            QueueUrl=os.environ['PROCESSING_QUEUE_URL'],
            ReceiptHandle=message['ReceiptHandle']
        )

def process_document(bucket, key):
    """Process a single document."""
    # Download from S3
    obj = s3.get_object(Bucket=bucket, Key=key)
    content = obj['Body'].read()
    metadata = obj.get('Metadata', {})

    # Parse PDF
    parser = PDFParser()
    text = parser.extract_text(content)

    # Clean text
    cleaner = TextCleaner()
    cleaned_text = cleaner.clean(text)

    # Chunk text
    chunker = TextChunker(chunk_size=512, overlap=50)
    chunks = chunker.chunk(cleaned_text)

    # Prepare chunks with metadata
    chunk_docs = []
    for i, chunk in enumerate(chunks):
        chunk_docs.append({
            'chunk_id': f"{key.replace('/', '_')}_{i}",
            'index': i,
            'text': chunk,
            'total_chunks': len(chunks)
        })

    # Send to embedding queue
    sqs.send_message(
        QueueUrl=EMBEDDING_QUEUE_URL,
        MessageBody=json.dumps({
            'chunks': chunk_docs,
            'metadata': {
                'source': metadata.get('source', 'unknown'),
                'customer_id': metadata.get('customer_id', 'unknown'),
                'original_key': key,
                'timestamp': datetime.now().isoformat()
            }
        })
    )

    print(f"Processed {key}: {len(chunks)} chunks")

if __name__ == '__main__':
    while True:
        main()
```

```python
# etl/processor/ecs/pdf_parser.py
import PyPDF2
import io

class PDFParser:
    def extract_text(self, pdf_content):
        """Extract text from PDF bytes."""
        pdf_file = io.BytesIO(pdf_content)
        reader = PyPDF2.PdfReader(pdf_file)

        text = []
        for page in reader.pages:
            text.append(page.extract_text())

        return '\n\n'.join(text)
```

```python
# etl/processor/ecs/text_cleaner.py
import re

class TextCleaner:
    def clean(self, text):
        """Clean and normalize text."""
        # Remove extra whitespace
        text = re.sub(r'\s+', ' ', text)

        # Remove special characters (keep basic punctuation)
        text = re.sub(r'[^\w\s.,!?;:()\-\']', '', text)

        # Remove page numbers/headers/footers (simple heuristic)
        lines = text.split('\n')
        cleaned_lines = [l for l in lines if len(l.strip()) > 20]

        return '\n'.join(cleaned_lines).strip()
```

```python
# etl/processor/ecs/chunker.py
from langchain.text_splitter import RecursiveCharacterTextSplitter

class TextChunker:
    def __init__(self, chunk_size=512, overlap=50):
        self.splitter = RecursiveCharacterTextSplitter(
            chunk_size=chunk_size,
            chunk_overlap=overlap,
            separators=['\n\n', '\n', '. ', ' ', '']
        )

    def chunk(self, text):
        """Split text into chunks."""
        return self.splitter.split_text(text)
```

**Dockerfile:**

```dockerfile
# etl/processor/ecs/Dockerfile
FROM python:3.11-slim

WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy code
COPY . .

CMD ["python", "main.py"]
```

### Stack 9: SQS Queues (`09-etl-queue-stack.yaml`)

**Queues:**

1. `datatorag-processing-queue`
   - Trigger: S3 event (raw bucket)
   - Visibility timeout: 300s
   - Dead letter queue: Yes

2. `datatorag-embedding-queue`
   - Trigger: Processor ECS task
   - Visibility timeout: 60s
   - Dead letter queue: Yes

3. `datatorag-indexing-queue`
   - Trigger: Embedder Lambda
   - Visibility timeout: 60s
   - Dead letter queue: Yes

**Dead Letter Queues:**

- `datatorag-processing-dlq`
- `datatorag-embedding-dlq`
- `datatorag-indexing-dlq`

---

## Phase 4: RAG Query API

### Stack 10: API Layer (`10-api-stack.yaml`)

**API Gateway:**

- Type: REST API
- Name: `datatorag-query-api`
- Stage: `prod`
- Authentication: API Key (for MVP), Cognito later

**Lambda Function:**

- Name: `datatorag-query-handler`
- Runtime: Python 3.11
- Memory: 2048 MB
- Timeout: 30s
- Container image: ECR `datatorag-api:latest`

**Endpoints:**

```
POST /query
POST /search
GET /health
GET /docs/{doc_id}
```

**Code:**

```python
# api/lambda/handler.py
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from mangum import Mangum
from pydantic import BaseModel
import boto3
import json
from opensearchpy import OpenSearch, RequestsHttpConnection
from requests_aws4auth import AWS4Auth

app = FastAPI(title="DatatoRAG Query API", version="1.0.0")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure appropriately
    allow_methods=["*"],
    allow_headers=["*"],
)

# AWS clients
sagemaker = boto3.client('sagemaker-runtime')
region = os.environ.get('AWS_REGION', 'us-east-1')
credentials = boto3.Session().get_credentials()
awsauth = AWS4Auth(credentials.access_key, credentials.secret_key,
                   region, 'es', session_token=credentials.token)

opensearch_client = OpenSearch(
    hosts=[{'host': os.environ['OPENSEARCH_ENDPOINT'], 'port': 443}],
    http_auth=awsauth,
    use_ssl=True,
    verify_certs=True,
    connection_class=RequestsHttpConnection
)

# Models
class QueryRequest(BaseModel):
    question: str
    customer_id: str
    top_k: int = 5

class SearchRequest(BaseModel):
    query: str
    customer_id: str
    top_k: int = 10

# Routes
@app.post("/query")
def query_documents(request: QueryRequest):
    """
    RAG query: returns relevant context for a question.
    """
    # Generate query embedding
    query_embedding = generate_embedding(request.question)

    # Vector search
    results = vector_search(
        query_embedding,
        request.customer_id,
        request.top_k
    )

    # Format response
    context = format_context(results)

    return {
        "question": request.question,
        "results": results,
        "context": context,
        "num_results": len(results)
    }

@app.post("/search")
def search_documents(request: SearchRequest):
    """
    Simple search: returns matching documents.
    """
    # Hybrid search (vector + keyword)
    query_embedding = generate_embedding(request.query)

    results = hybrid_search(
        request.query,
        query_embedding,
        request.customer_id,
        request.top_k
    )

    return {
        "query": request.query,
        "results": results,
        "num_results": len(results)
    }

@app.get("/health")
def health_check():
    """Health check endpoint."""
    return {"status": "healthy"}

@app.get("/docs/{doc_id}")
def get_document(doc_id: str, customer_id: str):
    """Retrieve a specific document."""
    try:
        response = opensearch_client.get(
            index=os.environ['OPENSEARCH_INDEX'],
            id=doc_id
        )
        return response['_source']
    except Exception as e:
        raise HTTPException(status_code=404, detail="Document not found")

# Helper functions
def generate_embedding(text):
    """Generate embedding via SageMaker."""
    response = sagemaker.invoke_endpoint(
        EndpointName=os.environ['SAGEMAKER_ENDPOINT'],
        ContentType='application/json',
        Body=json.dumps({'inputs': [text]})
    )
    result = json.loads(response['Body'].read())
    return result['embeddings'][0]

def vector_search(embedding, customer_id, k):
    """Vector similarity search."""
    query = {
        "size": k,
        "query": {
            "bool": {
                "must": [
                    {
                        "knn": {
                            "embedding": {
                                "vector": embedding,
                                "k": k
                            }
                        }
                    }
                ],
                "filter": [
                    {"term": {"metadata.customer_id": customer_id}}
                ]
            }
        },
        "_source": ["doc_id", "title", "chunk_text", "metadata", "source"]
    }

    response = opensearch_client.search(
        index=os.environ['OPENSEARCH_INDEX'],
        body=query
    )

    results = []
    for hit in response['hits']['hits']:
        results.append({
            "doc_id": hit['_source']['doc_id'],
            "title": hit['_source']['title'],
            "text": hit['_source']['chunk_text'],
            "source": hit['_source']['source'],
            "score": hit['_score'],
            "metadata": hit['_source']['metadata']
        })

    return results

def hybrid_search(text_query, embedding, customer_id, k):
    """Hybrid search (vector + keyword)."""
    query = {
        "size": k,
        "query": {
            "bool": {
                "should": [
                    {
                        "knn": {
                            "embedding": {
                                "vector": embedding,
                                "k": k,
                                "boost": 0.7
                            }
                        }
                    },
                    {
                        "multi_match": {
                            "query": text_query,
                            "fields": ["title^2", "chunk_text"],
                            "type": "best_fields",
                            "boost": 0.3
                        }
                    }
                ],
                "filter": [
                    {"term": {"metadata.customer_id": customer_id}}
                ],
                "minimum_should_match": 1
            }
        },
        "_source": ["doc_id", "title", "chunk_text", "metadata", "source"]
    }

    response = opensearch_client.search(
        index=os.environ['OPENSEARCH_INDEX'],
        body=query
    )

    results = []
    for hit in response['hits']['hits']:
        results.append({
            "doc_id": hit['_source']['doc_id'],
            "title": hit['_source']['title'],
            "text": hit['_source']['chunk_text'],
            "source": hit['_source']['source'],
            "score": hit['_score'],
            "metadata": hit['_source']['metadata']
        })

    return results

def format_context(results):
    """Format search results into context string."""
    context_parts = []
    for i, result in enumerate(results, 1):
        context_parts.append(
            f"[{i}] {result['title']}\n{result['text']}\n"
            f"Source: {result['source']}"
        )
    return "\n\n".join(context_parts)

# Lambda handler
handler = Mangum(app)
```

---

## Implementation Roadmap

### Sprint 1: Foundation (Week 1-2)

**Jira Epics & Stories:**

**Epic: DATATORAG-1 - Infrastructure Foundation**

- [ ] DATATORAG-1.1: Set up project repository and structure
- [ ] DATATORAG-1.2: Create network CloudFormation stack (VPC, subnets, routing)
- [ ] DATATORAG-1.3: Create security CloudFormation stack (IAM, security groups)
- [ ] DATATORAG-1.4: Create storage CloudFormation stack (S3 buckets)
- [ ] DATATORAG-1.5: Create secrets CloudFormation stack (Secrets Manager)
- [ ] DATATORAG-1.6: Set up CI/CD pipeline (GitHub Actions → CloudFormation)
- [ ] DATATORAG-1.7: Configure CloudWatch dashboards and basic monitoring

### Sprint 2: Data Platform (Week 2-3)

**Epic: DATATORAG-2 - OpenSearch & SageMaker**

- [ ] DATATORAG-2.1: Deploy OpenSearch cluster via CloudFormation
- [ ] DATATORAG-2.2: Create index templates with vector field configuration
- [ ] DATATORAG-2.3: Test k-NN vector operations manually
- [ ] DATATORAG-2.4: Prepare Gemma model for SageMaker deployment
- [ ] DATATORAG-2.5: Create custom inference script for embeddings
- [ ] DATATORAG-2.6: Deploy SageMaker endpoint via CloudFormation
- [ ] DATATORAG-2.7: Test embedding generation end-to-end
- [ ] DATATORAG-2.8: Configure auto-scaling for SageMaker endpoint
- [ ] DATATORAG-2.9: Set up monitoring/alarms for both services

### Sprint 3: ETL Pipeline (Week 3-5)

**Epic: DATATORAG-3 - Document Ingestion**

- [ ] DATATORAG-3.1: Build FTP client module
- [ ] DATATORAG-3.2: Build Workday API client
- [ ] DATATORAG-3.3: Build Rippling API client
- [ ] DATATORAG-3.4: Implement document ingester Lambda
- [ ] DATATORAG-3.5: Create SQS queues via CloudFormation
- [ ] DATATORAG-3.6: Test ingestion from FTP to S3
- [ ] DATATORAG-3.7: Test ingestion from APIs to S3

**Epic: DATATORAG-4 - Document Processing**

- [ ] DATATORAG-4.1: Build PDF parser module (PyPDF2)
- [ ] DATATORAG-4.2: Build text cleaner module
- [ ] DATATORAG-4.3: Build text chunker module (LangChain)
- [ ] DATATORAG-4.4: Create ECS task definition and Dockerfile
- [ ] DATATORAG-4.5: Deploy processor ECS service via CloudFormation
- [ ] DATATORAG-4.6: Wire S3 event → SQS → ECS trigger
- [ ] DATATORAG-4.7: Test end-to-end PDF processing with sample docs

**Epic: DATATORAG-5 - Embedding & Indexing**

- [ ] DATATORAG-5.1: Implement embedder Lambda (SageMaker client)
- [ ] DATATORAG-5.2: Implement batch processing logic (32 chunks)
- [ ] DATATORAG-5.3: Deploy embedder Lambda via CloudFormation
- [ ] DATATORAG-5.4: Test embedding generation with sample chunks
- [ ] DATATORAG-5.5: Implement indexer Lambda (OpenSearch client)
- [ ] DATATORAG-5.6: Implement bulk indexing logic
- [ ] DATATORAG-5.7: Deploy indexer Lambda via CloudFormation
- [ ] DATATORAG-5.8: Test full pipeline: FTP → S3 → Process → Embed → Index
- [ ] DATATORAG-5.9: Error handling and retry logic for all Lambdas
- [ ] DATATORAG-5.10: Dead letter queue monitoring

### Sprint 4: API Layer (Week 5-6)

**Epic: DATATORAG-6 - Query API**

- [ ] DATATORAG-6.1: Design API schema (FastAPI models)
- [ ] DATATORAG-6.2: Implement /query endpoint (vector search)
- [ ] DATATORAG-6.3: Implement /search endpoint (hybrid search)
- [ ] DATATORAG-6.4: Implement /health endpoint
- [ ] DATATORAG-6.5: Implement /docs/{doc_id} endpoint
- [ ] DATATORAG-6.6: Create API Lambda container image
- [ ] DATATORAG-6.7: Deploy API Gateway + Lambda via CloudFormation
- [ ] DATATORAG-6.8: Configure API key authentication
- [ ] DATATORAG-6.9: Test all endpoints with Postman/curl
- [ ] DATATORAG-6.10: Add request validation and error handling
- [ ] DATATORAG-6.11: Generate API documentation (OpenAPI/Swagger)

### Sprint 5: Testing & Polish (Week 6-7)

**Epic: DATATORAG-7 - Integration Testing**

- [ ] DATATORAG-7.1: Create test dataset (100 sample HR PDFs)
- [ ] DATATORAG-7.2: Run end-to-end ingestion test
- [ ] DATATORAG-7.3: Validate all documents indexed correctly
- [ ] DATATORAG-7.4: Create test query set (20 common HR questions)
- [ ] DATATORAG-7.5: Run query tests and measure accuracy
- [ ] DATATORAG-7.6: Performance testing (latency, throughput)
- [ ] DATATORAG-7.7: Load testing (1000 docs, 100 concurrent queries)

**Epic: DATATORAG-8 - Documentation & Operations**

- [ ] DATATORAG-8.1: Write architecture documentation
- [ ] DATATORAG-8.2: Write deployment runbook
- [ ] DATATORAG-8.3: Write API documentation
- [ ] DATATORAG-8.4: Write troubleshooting guide
- [ ] DATATORAG-8.5: Create CloudWatch dashboard for monitoring
- [ ] DATATORAG-8.6: Configure alarms for critical metrics
- [ ] DATATORAG-8.7: Security audit (IAM, encryption, VPC)
- [ ] DATATORAG-8.8: Cost optimization review
- [ ] DATATORAG-8.9: Backup and disaster recovery plan

---

## Key Risks & Mitigations

### Technical Risks

1. **Gemma 300M Embedding Model Availability**
   - **Risk**: Model may not be directly available on SageMaker or may not produce quality embeddings
   - **Mitigation**:
     - Research HuggingFace model compatibility first (Sprint 2, Story 2.4)
     - Have fallback: `sentence-transformers/all-MiniLM-L6-v2` (384 dim)
     - Test embedding quality before full pipeline build

2. **OpenSearch Vector Search Performance**
   - **Risk**: Query latency may exceed 500ms at scale
   - **Mitigation**:
     - Benchmark during Sprint 2 with 10K+ vectors
     - Tune k-NN parameters (ef_search, m, ef_construction)
     - Consider larger instance types if needed

3. **PDF Parsing Quality**
   - **Risk**: PyPDF2 may fail on complex layouts, scanned PDFs
   - **Mitigation**:
     - Test with diverse HR document samples early
     - Add AWS Textract integration if quality issues (adds cost)
     - Implement fallback OCR pipeline

4. **SageMaker Cold Starts**
   - **Risk**: First request after inactivity may take 30+ seconds
   - **Mitigation**:
     - Keep endpoint warm with scheduled Lambda pings (every 5 min)
     - Use provisioned concurrency (adds cost)
     - Implement async embedding for large batches

5. **Lambda Memory/Timeout Limits**
   - **Risk**: Large PDF processing may exceed Lambda limits
   - **Mitigation**:
     - Use ECS for processing (already planned)
     - Lambda only for orchestration and small tasks
     - Implement streaming for large files

### Operational Risks

1. **Cost Overruns**
   - **Estimated Monthly Cost**: $750-1300
   - **Risk Areas**: SageMaker (always on), OpenSearch (2 nodes), data transfer
   - **Mitigation**:
     - Enable detailed CloudWatch billing alarms
     - Use SageMaker auto-scaling aggressively
     - Consider reserved instances after MVP validation

2. **Data Security & Compliance**
   - **Risk**: HR data contains PII, must meet compliance (HIPAA, SOC2)
   - **Mitigation**:
     - Encryption at rest everywhere (S3, OpenSearch, EBS)
     - TLS in transit (all API calls)
     - No public endpoints (VPC-only)
     - Audit logging enabled (CloudTrail)
     - Regular security reviews (Story 8.7)

3. **Scalability Bottlenecks**
   - **Risk**: Single ECS task may bottleneck at high ingestion volume
   - **Mitigation**:
     - Design for horizontal scaling from day 1
     - Use SQS for buffering and backpressure
     - Monitor queue depth and auto-scale ECS tasks

4. **Third-Party API Rate Limits**
   - **Risk**: Workday/Rippling APIs may have rate limits
   - **Mitigation**:
     - Implement exponential backoff
     - Cache API responses where possible
     - Coordinate with customers on ingestion schedules

---

## Success Metrics (MVP)

### Functional Requirements

- [ ] Successfully ingest 1000 HR documents from FTP
- [ ] Successfully ingest documents from Workday API
- [ ] Successfully ingest documents from Rippling API
- [ ] Parse PDFs with >95% text extraction accuracy
- [ ] Generate embeddings with <2s latency per batch (32 docs)
- [ ] Index documents in OpenSearch with <5s latency per batch
- [ ] Query API returns results with <500ms latency (p95)
- [ ] Vector search relevance >80% (manual evaluation on 20 test queries)
- [ ] API uptime >99.5% (measured over 1 week)

### Operational Requirements

- [ ] All infrastructure deployed via CloudFormation (no manual steps)
- [ ] End-to-end pipeline runs automatically (no manual intervention)
- [ ] Error rate <1% for ingestion pipeline
- [ ] Dead letter queue monitoring and alerting working
- [ ] CloudWatch dashboards show all key metrics
- [ ] Documentation complete (architecture, deployment, API, troubleshooting)
- [ ] Security audit passed (IAM least privilege, encryption, network isolation)

### Performance Benchmarks

- [ ] Ingest 1000 PDFs in <2 hours
- [ ] Process single PDF (avg 10 pages) in <30 seconds
- [ ] Generate embeddings for 1000 chunks in <5 minutes
- [ ] Index 1000 documents in OpenSearch in <10 minutes
- [ ] Query API handles 100 concurrent requests with <1s latency (p99)

---

## Technology Stack Summary

| Component              | Technology                  | Version/Details               |
| ---------------------- | --------------------------- | ----------------------------- |
| **Infrastructure**     | AWS CloudFormation          | Latest                        |
| **Compute**            | AWS Lambda (Python 3.11)    | 128MB-2GB RAM                 |
|                        | AWS ECS Fargate             | 2 vCPU, 4GB RAM               |
| **Storage**            | Amazon S3                   | Standard, versioning enabled  |
| **Vector Database**    | Amazon OpenSearch Service   | 2.11+, r6g.large x2           |
| **ML Inference**       | Amazon SageMaker            | ml.g5.xlarge                  |
| **Queuing**            | Amazon SQS                  | Standard queues               |
| **API**                | Amazon API Gateway + Lambda | REST API                      |
| **Networking**         | Amazon VPC                  | 2 AZs, public/private subnets |
| **Secrets**            | AWS Secrets Manager         | Encryption enabled            |
| **Monitoring**         | Amazon CloudWatch           | Logs, metrics, alarms         |
| **Programming**        | Python                      | 3.11                          |
| **Frameworks**         | FastAPI                     | Latest                        |
|                        | LangChain                   | Latest                        |
| **Libraries**          | PyPDF2 / pdfplumber         | PDF parsing                   |
|                        | opensearch-py               | OpenSearch client             |
|                        | boto3                       | AWS SDK                       |
|                        | transformers                | HuggingFace models            |
| **Containers**         | Docker                      | For ECS and Lambda            |
| **Project Management** | Jira                        | Issue tracking                |

---

## Post-MVP Enhancements (Roadmap)

1. **Multi-Tenancy** (Sprint 6-7)
   - Separate OpenSearch indexes per customer
   - IAM policy per customer
   - Cost tracking per customer

2. **LLM Answer Generation** (Sprint 8)
   - Integrate Amazon Bedrock (Claude 3)
   - Context injection from vector search
   - Answer caching for common questions

3. **Advanced Connectors** (Sprint 9-10)
   - BambooHR API
   - ADP API
   - Salesforce HR Cloud
   - Generic SFTP/webhook support

4. **Real-Time Updates** (Sprint 11)
   - Change detection in source systems
   - Incremental updates (not full re-index)
   - Document versioning

5. **UI Dashboard** (Sprint 12-14)
   - Customer portal (React + Amplify)
   - Document management UI
   - Query testing interface
   - Analytics dashboard

6. **Advanced RAG Features** (Sprint 15+)
   - Hybrid search (vector + BM25)
   - Re-ranking with cross-encoder
   - Query expansion
   - Conversational memory
   - Citation tracking

---

## Deployment Commands

```bash
# Deploy all stacks in order
./infrastructure/scripts/deploy.sh

# Individual stack deployment
aws cloudformation deploy \
  --template-file infrastructure/cloudformation/01-network-stack.yaml \
  --stack-name datatorag-network \
  --capabilities CAPABILITY_IAM

# View stack outputs
aws cloudformation describe-stacks \
  --stack-name datatorag-network \
  --query 'Stacks[0].Outputs'

# Teardown (be careful!)
./infrastructure/scripts/teardown.sh
```

---

## Monitoring & Alerting

### CloudWatch Alarms

1. **OpenSearch**
   - ClusterStatus.red (critical)
   - FreeStorageSpace < 20% (warning)
   - CPUUtilization > 80% (warning)
   - JVMMemoryPressure > 80% (critical)

2. **SageMaker**
   - ModelLatency > 2000ms (warning)
   - Invocation4XXErrors > 1% (warning)
   - Invocation5XXErrors > 0.1% (critical)

3. **Lambda**
   - Errors > 1% (warning)
   - Throttles > 0 (warning)
   - Duration > 80% of timeout (warning)

4. **SQS**
   - ApproximateAgeOfOldestMessage > 1 hour (warning)
   - ApproximateNumberOfMessagesVisible > 1000 (warning)
   - DLQ messages > 0 (critical)

### CloudWatch Dashboard

- **ETL Pipeline Health**: Ingestion rate, processing latency, error rate
- **Search Performance**: Query latency (p50/p95/p99), throughput, error rate
- **Infrastructure Health**: CPU, memory, disk, network for all resources
- **Cost Tracking**: Estimated daily spend by service

---

## Cost Estimate (MVP Monthly)

| Service       | Configuration                  | Estimated Cost    |
| ------------- | ------------------------------ | ----------------- |
| OpenSearch    | r6g.large x 2, 100GB EBS       | $350-400          |
| SageMaker     | ml.g5.xlarge, ~50% utilization | $400-600          |
| Lambda        | 1M invocations, 512MB avg      | $10-20            |
| ECS Fargate   | 2 vCPU, 4GB, 100 hrs/mo        | $15-20            |
| S3            | 100GB storage, 1TB transfer    | $30-40            |
| API Gateway   | 1M requests                    | $3.50             |
| SQS           | 10M requests                   | $4                |
| Data Transfer | Inter-service, outbound        | $20-30            |
| CloudWatch    | Logs, metrics                  | $20-30            |
| **TOTAL**     |                                | **$850-1,150/mo** |

**Cost Optimization Tips:**

- Use SageMaker Async Inference for batch jobs (cheaper)
- Enable S3 Intelligent-Tiering
- Use Spot instances for ECS (not recommended for production)
- Schedule SageMaker endpoint downtime (dev/test only)

---

## Next Immediate Steps

1. **Confirm Gemma Model** (1-2 days)
   - Research `google/gemma-2-300m` suitability for embeddings
   - Test on HuggingFace locally
   - Verify SageMaker compatibility
   - Decision: Use Gemma or fallback to all-MiniLM

2. **Create Jira Project** (1 day)
   - Import epics and stories from this plan
   - Set up sprint cadence (2-week sprints)
   - Assign initial team members

3. **Repository Setup** (1 day)
   - Create GitHub repo: `datatorag-mvp`
   - Set up branch protection (main)
   - Configure GitHub Actions for CloudFormation deployment

4. **AWS Account Setup** (1 day)
   - Create/configure AWS account
   - Set up billing alarms
   - Create IAM admin user for deployment
   - Request service quota increases if needed (SageMaker, OpenSearch)

5. **Begin Sprint 1** (Week 1)
   - Start with DATATORAG-1.1: Project structure
   - Parallel work on DATATORAG-1.2-1.5: CloudFormation stacks

---

**END OF MVP IMPLEMENTATION PLAN**
