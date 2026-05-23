export const config = {
  apiGatewayUrl: import.meta.env.VITE_API_GW_URL as string,
  cloudFrontUrl: import.meta.env.VITE_CLOUDFRONT_URL as string,
};

export function validateConfig(): void {
  if (!config.apiGatewayUrl) {
    throw new Error("Missing VITE_API_GW_URL");
  }

  if (!config.cloudFrontUrl) {
    throw new Error("Missing VITE_CLOUDFRONT_URL");
  }
}
