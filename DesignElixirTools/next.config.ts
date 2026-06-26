import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages:  ["@supabase/ssr", "@react-pdf/renderer"],
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;