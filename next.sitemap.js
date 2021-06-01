module.exports = {
  siteUrl: 'https://applanding.page',
  sitemapBaseFileName: 'sitemap',
  generateRobotsTxt: true,
  autoLastmod: true,
  exclude: ['/payments', '/payments/*', '/dashboard', '/dashboard/*'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/payments', '/dashboard'],
      },
    ],
    additionalSitemaps: [
      'https://applanding.page/sitemap-blog.xml',
      'https://applanding.page/sitemap-showcase.xml',
    ],
  },
}
