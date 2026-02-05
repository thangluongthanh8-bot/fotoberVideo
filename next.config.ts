import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // ============================================
  // 🚀 PERFORMANCE OPTIMIZATIONS
  // ============================================

  // React Strict Mode - helps catch bugs early
  reactStrictMode: true,

  // Compress responses with gzip
  compress: true,

  // Generate ETags for caching
  generateEtags: true,

  // Optimize package imports - reduces bundle size
  experimental: {
    optimizePackageImports: [
      'swiper',
      'react-hook-form',
      '@directus/sdk',
    ],
  },

  // ============================================
  // 🖼️ IMAGE OPTIMIZATION
  // ============================================
  images: {
    // Remote image domains
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fotober.com',
      },
      {
        protocol: 'https',
        hostname: '*.fotober.com',
      },
      {
        protocol: 'https',
        hostname: 'api.fotober.com',
      },
    ],

    // Modern image formats for smaller file sizes
    formats: ['image/avif', 'image/webp'],

    // Minimize image sizes served
    minimumCacheTTL: 31536000, // 1 year cache

    // Device sizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],

    // Allowed quality values
    qualities: [60, 70, 75, 85, 100],
  },

  // ============================================
  // 📦 BUNDLE OPTIMIZATION
  // ============================================

  // Disable source maps in production for smaller builds
  productionBrowserSourceMaps: false,

  // Note: SWC minification is enabled by default in Next.js 15+

  // ============================================
  // 🔒 SECURITY HEADERS
  // ============================================
  async headers() {
    return [
      // Security headers for all routes (no cache header here)
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
      // Cache static images aggressively (1 year)
      {
        source: '/:all*(svg|jpg|jpeg|png|gif|ico|webp|avif)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // Cache fonts aggressively (1 year)
      {
        source: '/:all*(woff|woff2|ttf|otf|eot)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // Cache Next.js static assets (they have content hash in filename)
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },

  // ============================================
  // 🔄 REDIRECTS (SEO - avoid duplicate content)
  // ============================================
  async redirects() {
    return [
      // // Redirect trailing slashes
      // {
      //   source: '/:path*/',
      //   destination: '/:path*',
      //   permanent: true,
      // },
    ]
  },

  // ============================================
  // 🌐 INTERNATIONALIZATION (if needed)
  // ============================================
  // i18n: {
  //   locales: ['en', 'vi'],
  //   defaultLocale: 'en',
  // },
}

export default nextConfig
