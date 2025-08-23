"use client"

import { useState, useEffect } from "react"

interface TypingAnimationProps {
  text: string
  speed?: number
  className?: string
  loop?: boolean
  pauseDuration?: number
  onComplete?: () => void
}

export const CustomTypingAnimation = ({ 
  text, 
  speed = 100, 
  className = "",
  loop = false,
  pauseDuration = 2000,
  onComplete
}: TypingAnimationProps) => {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isCompleted, setIsCompleted] = useState(false)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, speed)

      return () => clearTimeout(timeout)
    } else if (currentIndex === text.length && !isCompleted) {
      setIsCompleted(true)
      onComplete?.()
      
      if (loop) {
        const resetTimeout = setTimeout(() => {
          setDisplayText("")
          setCurrentIndex(0)
          setIsCompleted(false)
        }, pauseDuration)

        return () => clearTimeout(resetTimeout)
      }
    }
  }, [currentIndex, text, speed, loop, pauseDuration, isCompleted])

  useEffect(() => {
    setDisplayText("")
    setCurrentIndex(0)
    setIsCompleted(false)
  }, [text])

  return (
    <span className={className}>
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  )
}