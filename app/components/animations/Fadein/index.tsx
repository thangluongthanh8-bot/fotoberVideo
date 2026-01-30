'use client'

import { useInView } from '@/app/hooks/useInView'

interface FadeinProps {
  children: React.ReactNode
  delay?: number
  className?: string
}

/**
 * Fade in up animation component
 * Uses Intersection Observer to trigger animation when element enters viewport
 */
function Fadein({ children, delay = 0, className = '' }: FadeinProps) {
  const { ref, inView } = useInView({ threshold: 0.1 })

  return (
    <div
      ref={ref}
      className={`${className} ${inView ? 'animate-fade-in-up' : 'opacity-0'}`}
      style={{
        animationDelay: inView ? `${delay}s` : undefined,
      }}
    >
      {children}
    </div>
  )
}

export default Fadein
