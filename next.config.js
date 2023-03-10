/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  productionBrowserSourceMaps: false,
  webpack: (config, {isServer}) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false
      };
    }

    return config;
  },
};

export default nextConfig;
