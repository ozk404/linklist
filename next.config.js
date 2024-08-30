/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: '*.googleusercontent.com'
      },
      {
        hostname: 'storage.googleapis.com',
      },
      {
        hostname: 'tecsify.com',
      },
    ],
  }
}

module.exports = nextConfig
