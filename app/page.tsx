import LayoutMain from '@/app/components/layouts/main'
import SessionUnderConsiderationWithMockContent from '@/app/components/SessionUnderConsiderationWithMockContent'
import { dataFaqSession, dataMockSessionUnderConsideration } from '@/app/utils/ultils'
import { Metadata } from 'next/types'
import SessionBg from './home/SessionBg'
import dynamic from 'next/dynamic'
import FaqSession from './components/FaqSession'
import { headers } from 'next/headers';
// Lazy load below-the-fold components for better initial load performance
const SessionWhyChoose = dynamic(() => import('./home/SessionWhyChoose'), {
  loading: () => <div className="h-[400px] animate-pulse bg-gray-100" />,
})

const SessionTrending = dynamic(() => import('./home/SessionTrending'), {
  loading: () => <div className="h-[600px] animate-pulse bg-gray-100" />,
})

const SessionStepWork = dynamic(() => import('./home/SessionStepWork'), {
  loading: () => <div className="h-[400px] animate-pulse bg-gray-100" />,
})

const SlideVideo = dynamic(() => import('./home/SessionStepWork/SlideVideo'), {
  loading: () => <div className="h-[400px] animate-pulse bg-gray-100" />,
})

const SessionClients = dynamic(() => import('./home/SessionClients'), {
  loading: () => <div className="h-[200px] animate-pulse bg-gray-100" />,
})

const SessionOutStory = dynamic(() => import('./home/SessionOutStory'), {
  loading: () => <div className="h-[400px] animate-pulse bg-gray-100" />,
})

const SessionSimpleSteps = dynamic(() => import('@/app/home/SessionSimpleSteps'), {
  loading: () => <div className="h-[300px] animate-pulse bg-gray-100" />,
})

const SessionContact = dynamic(() => import('./home/SessionContact'), {
  loading: () => <div className="h-[500px] animate-pulse bg-gray-100" />,
})

const title = 'Fotober Video Editing - Real Estate Video Editing'
const description =
  'Boost Your Real Estate Listings with Fotober\'s Professional Video Editing Services Tailored for Real Estate Success'

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: 'website',
    url: 'https://www.fotober.com',
    images: `${process.env.BASE_URL}/thumb/image_thumb.png`,
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: `${process.env.BASE_URL}/thumb/image_thumb.png`,
  },
}
export default async function Home() {
  const headerList = headers();
  const country = (await headerList).get('x-user-country');
  console.log("country", country)
  return (
    <>
      <LayoutMain>
        <main className=" w-full h-full bg-white text-[#1A1A1A] overflow-hidden mt-[-112px]">
          {/* Critical above-the-fold content - loaded immediately */}
          <SessionBg />

          {/* Below-the-fold - lazy loaded */}
          <SessionWhyChoose />

          <section className="py-7" id="id-trending">
            <SessionTrending />
          </section>

          <section className="py-7" id="id-step-work">
            <SessionStepWork />
            <SlideVideo />
          </section>

          <SessionClients />

          <section className="py-7" id="id-out-story">
            <SessionOutStory />
          </section>

          <SessionUnderConsiderationWithMockContent data={dataMockSessionUnderConsideration} />

          <section className="pb-7">
            <SessionSimpleSteps />
          </section>

          <section id="bulk-order-form" >
            <SessionContact />
          </section>
          <section className="pb-7">
            <FaqSession
              title="Frequently Asked Questions"
              data={dataFaqSession}
            />
          </section>
        </main>
      </LayoutMain>
    </>
  )
}
