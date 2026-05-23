import { config } from "../config";

export interface VideoSearchResult {
  label?: string;
  name?: string;
  confidence?: number;
  timestamp?: number | string;
  s3Key?: string;
  image?: string;
  clip?: string;
  [key: string]: unknown;
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

  const data: unknown = await response.json();

  if (Array.isArray(data)) {
    return data as VideoSearchResult[];
  }

  if (
    typeof data === "object" &&
    data !== null &&
    "results" in data &&
    Array.isArray((data as { results: unknown }).results)
  ) {
    return (data as { results: VideoSearchResult[] }).results;
  }

  return [];
}
