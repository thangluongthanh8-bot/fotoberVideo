import { useEffect, useState } from "react"

const TypeWrite = ({ text }: { text: string }) => {
    const [displayText, setDisplayText] = useState('')
    useEffect(() => {
        let i = 0
        const interval = setInterval(() => {
            setDisplayText(text.slice(0, i))
            i++
            if (i > text.length) {
                clearInterval(interval)
            }
        }, 100)
        return () => clearInterval(interval)
    }, [text])
    return (
        <div>
            {displayText}
        </div>
    )
}

export default TypeWrite