### Frontend Search Application

The frontend application is a custom React + TypeScript client used to query video detections indexed into OpenSearch.

#### User Input

The frontend accepts a text query such as:

```text
bird
animal
person
```

The query is sent to the backend search API through Amazon API Gateway.

Backend Search Flow
```text
Frontend
→ API Gateway
→ searchlambda
→ OpenSearch
```

The `searchlambda` function queries the `entities` index in OpenSearch and returns matching Rekognition detections.

### Returned Results

The frontend displays:
- Detected label name
- Confidence score
- Detection timestamp
- Offset within the processed clip
- Source video clip name

Example output:
| Label | Confidence | Offset | Clip |
|-------|-----|------------------|------------------|
| Bird | 95.7% | 2.3s | test_1748137135046.mp4 |

### Correlation to the Fulls System
The frontend represents the final stage of the overall pipeline:
```text
WebRTC Video Feed
→ Kinesis Video Streams
→ Lambda Clip Extraction
→ Amazon S3
→ Amazon Rekognition
→ OpenSearch Indexing
→ API Gateway Search
→ React Frontend
```

The displayed results originate from labels detected by Amazon Rekognition after video clips are extracted and processed through the serverless workflow.