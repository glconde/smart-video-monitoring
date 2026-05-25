import { config } from "../config";

export interface VideoSearchResult {
  name: string;
  confidence: number;
  timestampMs: number;
  offsetMs: number;
  videoClipName: string;
}

interface OpenSearchHit {
  _source: {
    name: string;
    confidence: string;
    base_timestamp: number;
    ts: string;
    videoClipName: string;
  };
}

interface OpenSearchResponse {
  hits?: {
    hits?: OpenSearchHit[];
  };
}

export async function searchVideoDetections(
  query: string,
): Promise<VideoSearchResult[]> {
  const url = new URL(config.apiGatewayUrl);
  url.searchParams.set("q", query);

  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error(`Search failed: ${response.status} ${response.statusText}`);
  }

  const data = (await response.json()) as OpenSearchResponse;

  return (
    data.hits?.hits?.map((hit) => ({
      name: hit._source.name,
      confidence: Number(hit._source.confidence),
      timestampMs: hit._source.base_timestamp + Number(hit._source.ts),
      offsetMs: Number(hit._source.ts),
      videoClipName: hit._source.videoClipName,
    })) ?? []
  );
}
