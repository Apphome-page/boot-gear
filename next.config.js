module.exports = {
  poweredByHeader: false,
  webpack: (config, { dev }) => {
    config.module.rules.push({
      test: /\.html$/,
      use: 'raw-loader',
    })
    return config
  },
}
