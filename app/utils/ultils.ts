import iconBrand from '@/app/components/layouts/main/assets/icon-branding.png'
import iconCalender from '@/app/components/layouts/main/assets/icon-calender.png'
// import iconCar from '@/app/components/layouts/main/assets/icon-car.png'
import iconCar from '@/app/components/layouts/main/assets/icon-car-2.png'
import iconImage360 from '@/app/components/layouts/main/assets/icon-image-360.png'
import iconTech from '@/app/components/layouts/main/assets/icon-tech.png'
import iconTab12 from '@/app/components/layouts/main/assets/icon-tab-12.png'
import iconTab13 from '@/app/components/layouts/main/assets/icon-tab-13.png'
import iconTab15 from '@/app/components/layouts/main/assets/icon-tab-15.png'
import iconTab17 from '@/app/components/layouts/main/assets/icon-tab-17.png'
import iconTabImage3 from '@/app/components/layouts/main/assets/icon-tab-image-3.png'
import iconTabImage4 from '@/app/components/layouts/main/assets/icon-tab-image-4.png'
import iconTabImage5 from '@/app/components/layouts/main/assets/icon-tab-image-5.png'
import iconVideo from '@/app/components/layouts/main/assets/icon-video.png'
import iconAboutUs from '@/app/components/layouts/main/assets/icon-about-us.png'
import iconCareer from '@/app/components/layouts/main/assets/icon-career.png'
import man01 from '@/app/components/SessionUnderConsiderationWithMockContent/assets/man_1.jpg'
import man02 from '@/app/components/SessionUnderConsiderationWithMockContent/assets/man_2.jpg'
import man03 from '@/app/components/SessionUnderConsiderationWithMockContent/assets/man_3.jpg'
import man04 from '@/app/components/SessionUnderConsiderationWithMockContent/assets/man_4.jpg'
import man05 from '@/app/components/SessionUnderConsiderationWithMockContent/assets/man_5.jpg'
import man06 from '@/app/components/SessionUnderConsiderationWithMockContent/assets/man_6.jpg'
import man07 from '@/app/components/SessionUnderConsiderationWithMockContent/assets/man_7.jpg'
import man08 from '@/app/components/SessionUnderConsiderationWithMockContent/assets/man_8.jpg'
import man09 from '@/app/components/SessionUnderConsiderationWithMockContent/assets/man_9.jpg'
import female01 from '@/app/components/SessionUnderConsiderationWithMockContent/assets/female_1.jpg'
// import { isMobile } from 'react-device-detect'
import { createDirectus, rest } from '@directus/sdk'

const BASE_URL = 'https://api-fotober.fotober.com/assets/'

type ImageUrlParams = string | { id: string; fileName?: string | null }



export const transformContentImageUrls = async ({ htmlContent, slug }: { htmlContent: string, slug: string }): Promise<string> => {
  if (!htmlContent) return htmlContent

  const assetUrlRegex = /https:\/\/api-fotober\.fotober\.com\/assets\/([a-f0-9-]{36})([^\s"'<>]*)/gi

  let transformedContent = htmlContent.replace(assetUrlRegex, (match, uuid, rest) => {
    const queryIndex = rest.indexOf('?')
    const existingParams = queryIndex !== -1 ? rest.substring(queryIndex + 1) : ''

    const baseUrl = `https://api-fotober.fotober.com/assets/${uuid}/${slug}`

    if (existingParams) {
      return `${baseUrl}?${existingParams}&key=1200w`
    } else {
      return `${baseUrl}?key=1200w`
    }
  })

  return transformedContent
}



export const clientDirectus = createDirectus('https://api-fotober.fotober.com/').with(
  rest({
    onRequest: (options) => ({ ...options, cache: 'no-store' }),
  }),
)

export const whatApps = '0942110297'
export const whatAppsUrl = `https://wa.me/${whatApps}`
export const whatAppsFormat = '+84 942 110 297'




export const dataMockSessionUnderConsideration = [
  {
    image: man01,
    title: 'James',
    service: 'Real Estate Photo Editing',
    comment:
      'I recently tried Fotober’s real estate photo editing service, and I was blown away by how they transformed my listing photos. They corrected the lighting, enhanced the colors, and made each room look bright and spacious. My clients immediately noticed the difference!',
  },
  {
    image: man02,
    title: 'John',
    service: 'Real Estate Photo Editing',
    comment:
      'Their advanced sky replacement and lawn retouching capabilities took my dull exterior shots to a whole new level. The once-overcast sky now looks crisp and blue, and the greenery around the property looks lush and inviting. I’ve already seen an uptick in inquiries because of these eye-catching visuals.',
  },
  {
    image: man03,
    title: 'Michael',
    service: 'Day to Dusk',
    comment:
      'As a realtor, I’m especially impressed with Fotober’s day-to-dusk service. They turned my daytime exterior shots into gorgeous twilight scenes, which captured tons of buyer interest. It’s a small touch that makes a big impact.',
  },
  {
    image: man04,
    title: 'David',
    service: 'Real Estate Photo Editing',
    comment:
      'They also offered a specialized interior retouching option that removed minor imperfections and added just the right amount of brightness. It really showcased the property’s architectural details and made the living spaces feel more welcoming. My sellers were thrilled with the final images!',
  },
  {
    image: man05,
    title: 'William',
    service: 'Real Estate Video Editing',
    comment:
      'Their real estate video editing service is top-notch. They smoothly stitched together all the clips, added tasteful transitions, and applied just the right color grading to showcase each property’s best features. I’ve never had so many positive comments from potential buyers.',
  },
  {
    image: man06,
    title: 'Christopher',
    service: 'Floor Plan Redraw',
    comment:
      'I used Fotober’s floor plan redraw service for a property listing, and the accuracy was on point. It made it super easy for me to share clear, detailed floor plans with prospective buyers. Saved me a lot of time and hassle!',
  },
  {
    image: man07,
    title: 'Matthew',
    service: 'Real Estate Photo Editing',
    comment:
      'Communication with their team was fantastic. I explained the look I wanted for my images, and they nailed it—from color correction to adding subtle enhancements. The photos came back looking consistent and on-brand.',
  },
  {
    image: man08,
    title: 'Daniel',
    service: 'Real Estate Photo Editing',
    comment:
      'One of the best parts is their quick turnaround time. I sent in a batch of listing photos late at night, and by the next evening, they were all beautifully edited and ready to go. That efficiency keeps my real estate marketing running smoothly.',
  },
  {
    image: man09,
    title: 'Alexander',
    service: 'Real Estate Photo Editing',
    comment:
      'The free trial option really sold me. I got to see their quality and attention to detail without any risk. After seeing the impressive edits, I decided to trust them with all my upcoming listings.',
  },
  {
    image: female01,
    title: 'Isabella',
    service: 'Real Estate Photo Editing',
    comment:
      'From basic touch-ups to more advanced retouching, they’ve proven they can handle all my real estate editing needs. I appreciate how they always consult me on revisions, ensuring the final images match my exact vision every single time.',
  },
]
