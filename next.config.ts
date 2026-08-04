import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    output: "export", //enables static exports for github pages hosting
    basePath: "/cocktail-app", //slug of my repo
    images: {
      unoptimized: true
    },
    reactStrictMode: true
};

export default nextConfig;
