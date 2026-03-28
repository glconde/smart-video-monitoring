## Smart Video Monitoring (KVS + Rekognition + OpenSearch)
**Work-in-progress**

An automated video monitoring pipeline built on AWS that ingests video from a local camera, performs AI-based object detection, and indexes results for time-based search.

Built from an AWS workshop reference architecture, with independent extensions and documentation.

### Architecture
Kinesis Video Streams (WebRTC) → Lambda (clipper) → Amazon S3 → Amazon Rekognition Video (async analysis) → Amazon SNS → Lambda (indexer) → Amazon OpenSearch → API Gateway + Search Lambda → Frontend (CloudFront)

### Key Capabilities
- Ingests live video streams from a local device (IoT-style input)
- Performs asynchronous object detection using managed AI/ML services
- Stores video clips and detected entities for later analysis
- Indexes detection metadata (labels, timestamps, confidence) for search
- Enables querying detected events by entity and time range (planned)

### Planned Enhancements
- Add time-range and confidence-based filtering to search API
- Implement cost-aware teardown and resource tagging strategy
- Review and tighten infrastructure security (IAM + OpenSearch access policies)

### Credits
Based on an AWS Workshops tutorial; implemented and extended independently. Inspired by Lucy Wang’s beginner AWS project list.