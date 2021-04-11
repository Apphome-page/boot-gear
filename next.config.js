// eslint-disable-next-line import/no-extraneous-dependencies
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
  poweredByHeader: false,
  // reactStrictMode: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.html?$/,
      use: 'raw-loader',
    })
    config.module.rules.push({
      test: /\.svg$/,
      use: '@svgr/webpack',
    })
    return config
  },
  images: {
    loader: 'cloudinary', // To suppress next-export error
    domains: [],
    deviceSizes: [16, 64, 128, 320, 640, 800, 1024, 1280],
    imageSizes: [32, 256, 512],
  },
})
