// import withTM from 'next-transpile-modules';
// import webpack from 'webpack';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['api.naitsng.com'],
  },
    eslint:{
      ignoreDuringBuilds:true,
    }
};
export default nextConfig;

