/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true
  },
  webpack(config, options) {
    config.module.rules.push({
       test: /\.worker\.js$/,
       loader: "worker-loader",
          options: {
             name: "static/[hash].worker.js",
             publicPath: "/_next/",
          },
       });
    return config;
  },
}

module.exports = nextConfig
