import ItemColab from '@/app/components/FaqSession/ItemColab'
import React from 'react'

function FaqSession({
  title,
  data,
}: {
  title: string
  data: {
    title: string
    description: string
  }[]
}) {
  return (
    <div className="w-full container-custom">
      <h2 className="text-[#003366] font-extrabold text-xl md:text-[28px] md:leading-[54px] my-4 md:my-6 pt-6 text-center uppercase">
        {title}
      </h2>
      <div className="list mt-6 pb-6 flex flex-col md:flex-row justify-between flex-wrap gap-4 md:gap-6">
        {data.map((item) => (
          <div key={item.title} className="w-full md:w-[45%]">
            <ItemColab descriptionColab={item.description} titleColab={item.title} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default FaqSession
