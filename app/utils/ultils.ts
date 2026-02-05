
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
export const dataFaqSession = [
  {
    title: 'What is Video Editing in Real Estate?',
    description:
      'Video Editing in Real Estate involves enhancing raw footage to create polished, professional videos that showcase properties in the best light. This can include adding music, transitions, graphics, and other effects to make the video more engaging and appealing to potential buyers.',
  },
  {
    title: 'Can I choose the music and style for my Real Estate Videos?\n',
    description:
      'Absolutely! You can provide us with your preferred music tracks and style preferences. Our editors will incorporate your choices into the final video to ensure it aligns with your vision and brand.',
  },
  {
    title: 'What is Drone Video Editing, and why is it beneficial?\n',
    description:
      'Drone Video Editing involves enhancing aerial footage to showcase properties from unique perspectives. It is beneficial because it provides a comprehensive view of the property and its surroundings, highlighting features that might not be visible from ground level.',
  },
  {
    title: 'How do I get started with your Video Editing Services?\n',
    description:
      'To get started, simply fill out the form with your video editing needs, provide the raw footage, and any specific instructions. Our team will guide you through the process and deliver high-quality, engaging real estate videos tailored to your requirements.',
  },
  {
    title: 'Do you offer custom graphics and animations for my videos?\n',
    description:
      'Absolutely! We can create custom graphics and animations tailored to your specific needs. This includes logos, icons, maps, and any other visual elements that can enhance your video and brand identity.',
  },
  {
    title: "What if I'm not satisfied with the final video?\n",
    description:
      "Customer satisfaction is our top priority. If you're not satisfied with the final video, we offer revisions to make sure it meets your expectations. Just let us know what changes you need, and we'll make the necessary adjustments.",
  },
]