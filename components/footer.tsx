"use client"

import { useEffect, useState } from "react"

export default function Footer() {
  const [displayText, setDisplayText] = useState("")
  const fullText = "> coding the future, one bit at a time_"
  const [showCursor, setShowCursor] = useState(true)
  
  useEffect(() => {
    let currentIndex = 0
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayText(fullText.slice(0, currentIndex))
        currentIndex++
      } else {
        clearInterval(typingInterval)
        setShowCursor(true)
      }
    }, 80)

    return () => clearInterval(typingInterval)
  }, [fullText])

  return (
    <footer className="container mx-auto px-4 py-8 md:py-12">
      <div className="max-w-4xl mx-auto">
        <div className="font-mono space-y-4">
          <div className="flex items-center justify-center min-h-[2rem]">
            <img 
              src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&size=18&pause=1000&color=000000&center=true&vCenter=true&width=700&lines=%3E+coding+the+future%2C+one+bit+at+a+time_" 
              alt="Typing SVG"
              className="max-w-full h-auto"
            />
          </div>
          
          <p className="text-muted-foreground text-xs sm:text-sm text-center px-4">
            © {new Date().getFullYear()} Lucas Lima Magalhães Lafetá Chaves • Engenharia de Software • Belo Horizonte, MG
          </p>
        </div>
      </div>
    </footer>
  )
}
