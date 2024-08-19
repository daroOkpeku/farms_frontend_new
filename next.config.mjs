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
  // experimental: {
  //   esmExternals: 'loose',  // Enable ESM support
  // },
  // webpack: (config) => {
  //   config.module.rules.push({
  //     test: /\.worker\.min\.js$/,
  //     loader: 'file-loader',
  //     options: {
  //       name: '[name].[hash].[ext]',
  //       publicPath: '/_next/static/workers/',
  //       outputPath: 'static/workers/',
  //     },
  //   });

    // config.plugins.push(
    //   new webpack.DefinePlugin({
    //     'process.env.WORKER_SRC': JSON.stringify('/_next/static/workers/pdf.worker.min.js'),
    //   })
    // );

  //   return config;
  // },
};
export default nextConfig;
// export default withTM(['pdfjs-dist'])(nextConfig);
