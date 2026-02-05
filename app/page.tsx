import LayoutMain from '@/app/components/layouts/main'
import SessionUnderConsiderationWithMockContent from '@/app/components/SessionUnderConsiderationWithMockContent'
import { dataFaqSession, dataMockSessionUnderConsideration } from '@/app/utils/ultils'
import { Metadata } from 'next/types'
import SessionBg from './home/SessionBg'
import dynamic from 'next/dynamic'
import FaqSession from './components/FaqSession'
import { headers } from 'next/headers';
import SessionServiceChild from './home/SessionServiceChild'
const SessionWhyChoose = dynamic(() => import('./home/SessionWhyChoose'), {
  loading: () => <div className="h-[400px] bg-gray-100" />,
})

const SessionTrending = dynamic(() => import('./home/SessionTrending'), {
  loading: () => <div className="h-[600px] bg-gray-100" />,
})

const SessionStepWork = dynamic(() => import('./home/SessionStepWork'), {
  loading: () => <div className="h-[400px] bg-gray-100" />,
})

const SlideVideo = dynamic(() => import('./home/SessionStepWork/SlideVideo'), {
  loading: () => <div className="h-[400px] bg-gray-100" />,
})

const SessionClients = dynamic(() => import('./home/SessionClients'), {
  loading: () => <div className="h-[200px] bg-gray-100" />,
})

const SessionOutStory = dynamic(() => import('./home/SessionOutStory'), {
  loading: () => <div className="h-[400px] bg-gray-100" />,
})

const SessionSimpleSteps = dynamic(() => import('@/app/home/SessionSimpleSteps'), {
  loading: () => <div className="h-[300px] bg-gray-100" />,
})

const SessionContact = dynamic(() => import('./home/SessionContact'), {
  loading: () => <div className="h-[500px] bg-gray-100" />,
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
export default function Home() {

  return (
    <>
      <LayoutMain>
        <main className=" w-full h-full bg-white text-[#1A1A1A] overflow-hidden mt-[-112px]">
          <SessionBg />
          <SessionWhyChoose />

          <section className="py-7" id="id-trending">
            <SessionTrending />
          </section>
          <section className=" py-7" id="id-step-work">
            <div className='container-custom'>

              <h2 className="w-full text-wrap text-center uppercase font-montserrat text-[#043263] font-extrabold text-lg md:text-[23px] md:leading-[45px] my-0">
                Simple & Clean Way to Advertise Your Real Estate
              </h2>
              <SessionServiceChild />
            </div>
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
