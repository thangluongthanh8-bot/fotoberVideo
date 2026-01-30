'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

interface UseInViewOptions {
    /** Threshold for intersection (0-1). Default: 0.1 */
    threshold?: number
    /** Root margin for earlier/later triggering. Default: '50px' */
    rootMargin?: string
    /** Only trigger once. Default: true */
    triggerOnce?: boolean
    /** Initial state before first check. Default: false */
    initialInView?: boolean
}

interface UseInViewReturn {
    /** Ref to attach to the target element */
    ref: React.RefObject<HTMLDivElement | null>
    /** Whether the element is currently in view */
    inView: boolean
    /** Manually trigger the animation */
    triggerAnimation: () => void
}

/**
 * Hook to detect when an element enters the viewport
 * Replaces react-lazyload with native Intersection Observer
 * 
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { ref, inView } = useInView({ threshold: 0.2 })
 *   return (
 *     <div ref={ref} className={inView ? 'animate-fade-in' : 'opacity-0'}>
 *       Content
 *     </div>
 *   )
 * }
 * ```
 */
export function useInView(options: UseInViewOptions = {}): UseInViewReturn {
    const {
        threshold = 0.1,
        rootMargin = '50px',
        triggerOnce = true,
        initialInView = false,
    } = options

    const ref = useRef<HTMLDivElement>(null)
    const [inView, setInView] = useState(initialInView)
    const hasTriggered = useRef(false)

    const triggerAnimation = useCallback(() => {
        setInView(true)
        hasTriggered.current = true
    }, [])

    useEffect(() => {
        const element = ref.current
        if (!element) return

        // Skip if already triggered in triggerOnce mode
        if (triggerOnce && hasTriggered.current) return

        // Check if IntersectionObserver is supported
        if (!('IntersectionObserver' in window)) {
            // Fallback: immediately mark as in view
            setInView(true)
            return
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setInView(true)
                        hasTriggered.current = true

                        if (triggerOnce) {
                            observer.unobserve(element)
                        }
                    } else if (!triggerOnce) {
                        setInView(false)
                    }
                })
            },
            {
                threshold,
                rootMargin,
            }
        )

        observer.observe(element)

        return () => {
            observer.disconnect()
        }
    }, [threshold, rootMargin, triggerOnce])

    return { ref, inView, triggerAnimation }
}

export default useInView
