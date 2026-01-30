'use client'
import React from 'react'

function LayoutMain({
  children,
}: {
  children: React.ReactNode
  classHeader?: string
}) {
  return (
    <main className="bg-white font-montserrat text-[#043263] relative z-10 lg:pt-[80px] overflow-x-hidden">
      {children}
    </main>
  )
}

export default LayoutMain
