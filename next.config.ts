import type { NextConfig } from 'next';
const nextConfig: NextConfig = {
  poweredByHeader: false,
  async redirects() {
    return [
      { source: '/projects/data-export-center', destination: '/projects/isolarcloud#data-access', permanent: true },
    ];
  },
};
export default nextConfig;
