import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    output: "export", //enables static exports for github pages hosting
    // basePath: "/various",
    images: {
      unoptimized: true
    },
    reactStrictMode: true
};

export default nextConfig;
