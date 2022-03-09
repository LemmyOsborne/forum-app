/* eslint-disable */
/** @type {import('next').NextConfig} */

const nextConfig = {
  compiler: {
    styledComponents: true,
  },
}

module.exports = nextConfig

module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    })

    return config
  },
  images: {
    domains: ["forumapp20aec2d17f9d46feb9711bce42625345145748-dev.s3.eu-north-1.amazonaws.com"],
  },
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
}