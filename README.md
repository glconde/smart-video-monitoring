## Smart Video Monitoring (KVS + Rekognition + OpenSearch)

Built from an AWS workshop reference architecture, with personal extensions:
- (Planned) Search supports time-range filters and confidence threshold.
- (Planned) Cost-safe teardown steps and tagging.

### Architecture
Kinesis Video Streams → Lambda (clipper) → S3 → Rekognition (async) → SNS → Lambda (indexer) → OpenSearch → API Gateway + Search Lambda + Frontend (CloudFront)

### Credits
Based on an AWS Workshops tutorial; implemented and extended independently. Inspired by Lucy Wang’s beginner AWS project list.