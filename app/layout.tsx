// import ApolloProviderWrapper from '@/app/providers/ApolloProviderWrapper'
// import ProgressBarProvider from '@/app/providers/ProgressBarProvider'
import type { Metadata } from 'next'
import './globals.css'
import Script from 'next/script'
import { Montserrat } from 'next/font/google'
import { Suspense } from 'react'

const title = 'Fotober Video - Real Estate Video Editing'
const description =
  'Boost Your Real Estate Video with Fotober’s Professional Video Editing Services Tailored for Real Estate Success'

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: 'website',
    url: 'https://video.fotober.com',
    images: '/logo-footer.png',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: '/logo-footer.png',
  },
}
const montserrat = Montserrat({
  weight: ['400', '500', '600', '700', '800'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
})

// lib/schema.ts
const schemaData = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'FOTOBER',
  description:
    'Fotober offers comprehensive photo editing, video editing, and virtual services to enhance your real estate listings. Explore our wide range of professional services.',
  Disambiguatingdescription: 'Fotober - Real Estate Photo Editing And Video Editing',
  legalName: 'FOTOBER CO.,LTD',
  taxID: '0109657996',
  foundingDate: '2021-06-03',
  founder: [
    {
      '@type': 'Person',
      name: 'Phan Thị Nga',
      description: 'Ms. Phan Thi Nga is the legal representative for FOTOBER CO.,LTD',
      jobTitle: 'Representative',
      sameAs: 'https://www.facebook.com/phan.nga.1213',
    },
    {
      '@type': 'Person',
      name: 'Dang Vu Tai',
      description: 'Mr Dang Vu Tai is the CEO for FOTOBER CO.,LTD',
      jobTitle: 'CEO',
      sameAs: 'https://www.facebook.com/profile.php?id=100000677465360',
    },
  ],
  slogan: 'Quality in everything we do',
  url: 'https://fotober.com/',
  mainEntityofPage: {
    '@type': 'webpage',
    '@id': 'https://fotober.com/#webpage',
  },
  additionalType: [
    'https://en.wikipedia.org/wiki/Editing',
    'https://en.wikipedia.org/wiki/Image_editing',
    'https://en.wikipedia.org/wiki/Video_editing',
    'https://en.wikipedia.org/wiki/Architectural_photography',
  ],
  sameAs: [
    'https://www.tiktok.com/@fotober',
    'https://www.instagram.com/fotobervn',
    'https://www.facebook.com/profile.php?viewas=100000686899395&id=100084011630136',
    'https://www.facebook.com/Fotober.tuyendung',
    'https://www.linkedin.com/company/fotober-com/',
    'https://www.pinterest.com/fotober/',
    'https://apnews.com/press-release/marketersmedia/real-estate-cbd34c6687b52fdbcef38be6d5dc4250',
    'https://www.theglobeandmail.com/investing/markets/markets-news/Plentisoft/29572784/fotober-premier-photo-and-video-editing-solutions-for-the-real-estate-industry/',
    'https://www.benzinga.com/pressreleases/24/11/41964376/fotober-premier-photo-and-video-editing-solutions-for-the-real-estate-industry',
    'https://wbng.marketminute.com/article/marketersmedia-2024-11-14-fotober-premier-photo-and-video-editing-solutions-for-the-real-estate-industry',
    'https://wgem.marketminute.com/article/marketersmedia-2024-11-14-fotober-premier-photo-and-video-editing-solutions-for-the-real-estate-industry',
    'https://news.marketersmedia.com/fotober-premier-photo-and-video-editing-solutions-for-the-real-estate-industry/89145146',
    'http://business.bentoncourier.com/bentoncourier/news/article/marketersmedia-2024-11-14-fotober-premier-photo-and-video-editing-solutions-for-the-real-estate-industry',
    'http://business.bigspringherald.com/bigspringherald/news/article/marketersmedia-2024-11-14-fotober-premier-photo-and-video-editing-solutions-for-the-real-estate-industry',
    'http://business.inyoregister.com/inyoregister/news/article/marketersmedia-2024-11-14-fotober-premier-photo-and-video-editing-solutions-for-the-real-estate-industry',
    'http://business.borgernewsherald.com/borgernewsherald/news/article/marketersmedia-2024-11-14-fotober-premier-photo-and-video-editing-solutions-for-the-real-estate-industry',
    'https://www.businessintelligence.mo/2024/11/18/fotober-premier-photo-and-video-editing-solutions-for-the-real-estate-industry/',
    'https://northcarolinainquiry.com/press/fotober-premier-photo-and-video-editing-solutions-for-the-real-estate-industry/121440',
  ],
  address: '132 Cau Giay Street, Quan Hoa Ward, Cau Giay District, Hanoi',
  location: {
    '@type': 'Place',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'Vietnam',
      postalCode: '700000',
      addressLocality: 'Cau Giay District',
      addressRegion: 'Hanoi',
      streetAddress: '132 Cau Giay Street',
    },
  },
  logo: {
    '@type': 'ImageObject',
    '@id': 'https://fotober.com/#logo',
    inLanguage: 'vi-VN',
    url: 'https://fotober.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.5da829dc.png&w=640&q=75',
    name: 'FOTOBER',
    caption: 'Fotober Video Editing - Real Estate Video Editing',
  },
  currenciesAccepted: 'USD',
  priceRange: '1-100000',
  paymentAccepted: ['Cash', 'Credit Card'],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5',
    reviewCount: '8386',
  },
  telephone: '+84 942 110 297',
  contactPoint: {
    '@type': 'ContactPoint',
    url: 'https://fotober.com/contact',
    telephone: '+84 942 110 297',
    email: ['support@fotober.com', 'contact@fotober.com'],
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    opens: '00:00',
    closes: '23:59',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Services at FOTOBER',
    itemListElement: [
      {
        '@type': 'OfferCatalog',
        name: 'Photo Editing',
        additionalType: 'https://en.wikipedia.org/wiki/Image_editing',
        itemListElement: [
          {
            '@type': 'Offer',
            name: 'Image Enhancement',
            itemOffered: 'Service',
            additionalType: 'https://fotober.com/image-enhancement',
            url: 'https://fotober.com/image-enhancement',
          },
          {
            '@type': 'Offer',
            name: 'Day To Dusk',
            itemOffered: 'Service',
            url: 'https://fotober.com/day-to-dusk',
          },
          {
            '@type': 'Offer',
            name: 'Item Removal',
            itemOffered: 'Service',
            url: 'https://fotober.com/item-removal',
          },
          {
            '@type': 'Offer',
            name: '360° Enhancement',
            itemOffered: 'Service',
            url: 'https://fotober.com/360-image-enhancement',
          },
        ],
      },
      {
        '@type': 'OfferCatalog',
        name: 'Architecture Planning & Virtual Services',
        additionalType: 'https://en.wikipedia.org/wiki/Virtual_home_staging',
        itemListElement: [
          {
            '@type': 'Offer',
            name: 'Virtual Staging',
            itemOffered: 'Service',
            additionalType: 'https://en.wikipedia.org/wiki/Virtual_home_staging',
            url: 'https://fotober.com/virtual-staging',
          },
          {
            '@type': 'Offer',
            name: 'Virtual Renovation',
            itemOffered: 'Service',
            url: 'https://fotober.com/virtual-renovation',
          },
          {
            '@type': 'Offer',
            name: '2D and 3D Floor Plan',
            itemOffered: 'Service',
            additionalType: 'https://en.wikipedia.org/wiki/Floor_plan',
            url: 'https://fotober.com/floor-plan-redraw',
          },
          {
            '@type': 'Offer',
            name: 'Rendering',
            itemOffered: 'Service',
            additionalType: 'https://en.wikipedia.org/wiki/Rendering_(computer_graphics)',
            url: 'https://fotober.com/rendering',
          },
        ],
      },
      {
        '@type': 'OfferCatalog',
        name: 'Video Editing',
        additionalType: 'https://en.wikipedia.org/wiki/Video_editing',
        itemListElement: [
          {
            '@type': 'Offer',
            name: 'Real Estate Video Editing',
            itemOffered: 'Service',
            url: 'https://fotober.com/video-editing',
          },
          {
            '@type': 'Offer',
            name: 'Car Video Editing',
            itemOffered: 'Service',
            url: 'https://fotober.com/car-video-editing',
          },
          {
            '@type': 'Offer',
            name: 'Wedding Highlight Video Editing',
            itemOffered: 'Service',
            url: 'https://fotober.com/wedding-highlight-video-editing',
          },
          {
            '@type': 'Offer',
            name: 'Event Highlight Video Editing',
            itemOffered: 'Service',
            url: 'https://fotober.com/event-highlight-video-editing',
          },
        ],
      },
    ],
  },
  areaServed: [
    {
      '@type': 'Country',
      url: 'https://www.wikidata.org/wiki/Q881',
      name: 'Việt Nam',
    },
    {
      '@type': 'Country',
      url: 'https://www.wikidata.org/wiki/Q30',
      name: 'United States of America',
    },
  ],
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="./logo-footer.png" />
        {/* Preconnect để tải font và assets nhanh hơn */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <Script
          id="schema-jsonld"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schemaData),
          }}
        />
      </head>
      <body className={montserrat.className}>
        <Suspense fallback={<div />}>
          {children}
        </Suspense>
      </body>
    </html>
  )
}
