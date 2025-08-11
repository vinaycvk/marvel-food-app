import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.pixabay.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
       {
        protocol: "https",
        hostname: "cdn.prod.website-files.com",
        pathname: "/**",
      },
      { protocol: "https", hostname: "*.amazonaws.com", pathname: "/**" },
      {
        protocol: "https",
        hostname: "doordash-static.s3.amazonaws.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "s3-ap-southeast-1.amazonaws.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "https://img.cdn4dd.com",
        pathname: "/**"
      },
      // Cloudflare / CDN providers
      { protocol: "https", hostname: "*.cdn.cloudflare.net", pathname: "/**" },
      { protocol: "https", hostname: "*.cloudfront.net", pathname: "/**" },

      // DoorDash CDN
      { protocol: "https", hostname: "img.cdn4dd.com", pathname: "/**" },

      // Catch-all for other CDN subdomains
      { protocol: "https", hostname: "*.cdn4dd.com", pathname: "/**" },
      { protocol: "https", hostname: "*.cdn.com", pathname: "/**" },
    ],
  },
};

export default nextConfig;
