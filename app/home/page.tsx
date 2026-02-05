import LayoutMain from '@/app/components/layouts/main'
import SessionSimpleSteps from '@/app/home/SessionSimpleSteps'
import { Metadata } from 'next'
import SessionClients from './SessionClients'
import SessionStepWork from './SessionStepWork'
import SessionWhyChoose from './SessionWhyChoose'
import SessionBg from './SessionBg'
import SessionOutStory from './SessionOutStory'
import SessionContact from './SessionContact'
import SessionUnderConsiderationWithMockContent from '../components/SessionUnderConsiderationWithMockContent'
import { dataMockSessionUnderConsideration } from '../utils/ultils'
import SessionServiceChild from './SessionServiceChild'

const title = 'Fotober Video Editing - Real Estate Video Editing'
const description =
  'Boost Your Real Estate Listings with Fotober’s Professional Video Editing Services Tailored for Real Estate Success'

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

function Home() {
  return (
    <>
     <LayoutMain>
        <main className=" w-full h-full bg-white text-[#1A1A1A] overflow-hidden mt-[-112px]">
          <SessionBg />
          <SessionWhyChoose />
        
          <section className=" py-7" id="id-step-work">
            <SessionStepWork />
          </section>
          <SessionClients />
          <section className=" py-7" id="id-out-story">
            <SessionOutStory />
          </section>
          <SessionUnderConsiderationWithMockContent data={dataMockSessionUnderConsideration} />
          <section className="pb-7">
            <SessionSimpleSteps />
          </section>
          <section id="bulk-order-form" className="pb-7">
            <SessionContact />
          </section>
        </main>
      </LayoutMain>
    </>
  )
}

export default Home
