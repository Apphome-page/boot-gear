module.exports = {
  poweredByHeader: false,
  // reactStrictMode: true,
  webpack: (config, { dev }) => {
    config.module.rules.push({
      test: /\.html$/,
      use: 'raw-loader',
    })
    return config
  },
  images: {
    loader: 'cloudinary', // To suppress next-export error
    domains: [],
    deviceSizes: [16, 64, 128, 320, 640, 800, 1024, 1280],
    imageSizes: [32, 256, 512],
  },
}
