'use client'

import { useInView } from '@/app/hooks/useInView'

interface LightSpeedInLeftProps {
  children: React.ReactNode
  className?: string
}

/**
 * Light speed in from left animation component
 * Uses Intersection Observer to trigger animation when element enters viewport
 */
function LightSpeedInLeft({ children, className = '' }: LightSpeedInLeftProps) {
  const { ref, inView } = useInView({ threshold: 0.1 })

  return (
    <div
      ref={ref}
      className={`${className} ${inView ? 'animate-light-speed-in-left' : 'opacity-0'}`}
    >
      {children}
    </div>
  )
}

export default LightSpeedInLeft
