// import withTM from 'next-transpile-modules';
// import webpack from 'webpack';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    BASE_URL: process.env.BASE_URL,
  },
  images: {
    domains: ['api.naitsng.com'],
  },
    eslint:{
      ignoreDuringBuilds:true,
    }
};
export default nextConfig;

