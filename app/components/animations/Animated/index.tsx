'use client'

import { useInView } from '@/app/hooks/useInView'
import { twMerge } from 'tailwind-merge'
import React from 'react'

type AnimationType =
    | 'fade-in'
    | 'fade-in-up'
    | 'light-speed-in-left'
    | 'slide-in-right'
    | 'scale-in'

interface AnimatedProps {
    children: React.ReactNode
    /** Animation type. Default: 'fade-in' */
    animation?: AnimationType
    /** Delay before animation starts (in seconds). Default: 0 */
    delay?: number
    /** Duration of animation (in seconds). Default: 0.6 */
    duration?: number
    /** Additional className */
    className?: string
    /** Intersection Observer threshold. Default: 0.1 */
    threshold?: number
}

/**
 * Wrapper component that animates children when they enter the viewport
 * Replaces Fadein and LightSpeedInLeft components
 * 
 * @example
 * ```tsx
 * <Animated animation="fade-in-up" delay={0.2}>
 *   <h1>Hello World</h1>
 * </Animated>
 * ```
 */
export function Animated({
    children,
    animation = 'fade-in',
    delay = 0,
    duration = 0.6,
    className,
    threshold = 0.1,
}: AnimatedProps) {
    const { ref, inView } = useInView({ threshold })

    const animationClass = `animate-${animation}`

    return (
        <div
            ref={ref}
            className={twMerge(
                'transition-opacity',
                inView ? animationClass : 'opacity-0',
                className
            )}
            style={{
                animationDelay: inView ? `${delay}s` : undefined,
                animationDuration: `${duration}s`,
            }}
        >
            {children}
        </div>
    )
}

// Aliased components for backward compatibility
export function Fadein({
    children,
    delay = 0,
    className,
}: {
    children: React.ReactNode
    delay?: number
    className?: string
}) {
    return (
        <Animated animation="fade-in-up" delay={delay} className={className}>
            {children}
        </Animated>
    )
}

export function LightSpeedInLeft({
    children,
    className,
}: {
    children: React.ReactNode
    className?: string
}) {
    return (
        <Animated animation="light-speed-in-left" className={className}>
            {children}
        </Animated>
    )
}

export default Animated
