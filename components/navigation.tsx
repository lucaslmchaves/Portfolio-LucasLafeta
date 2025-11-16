"use client"

import { useState, useEffect } from "react"
import { Menu, X } from 'lucide-react'
import { ThemeToggle } from "./theme-toggle"

const navItems = [
  { id: "sobre", label: "Sobre" },
  { id: "experiencia", label: "Experiência" },
  { id: "projetos", label: "Projetos" },
  { id: "habilidades", label: "Habilidades" },
  { id: "educacao", label: "Educação" },
  { id: "contato", label: "Contato" },
]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => document.getElementById(item.id))
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        if (section) {
          const sectionTop = section.offsetTop
          const sectionBottom = sectionTop + section.offsetHeight

          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            setActiveSection(section.id)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (isOpen) {
      const handleClickOutside = (e: MouseEvent) => {
        const target = e.target as HTMLElement
        if (!target.closest('nav')) {
          setIsOpen(false)
        }
      }
      document.addEventListener('click', handleClickOutside)
      return () => document.removeEventListener('click', handleClickOutside)
    }
  }, [isOpen])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const offset = 80
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
    setIsOpen(false)
  }

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden lg:block fixed top-0 left-0 right-0 z-[100] bg-background/95 backdrop-blur-md border-b border-accent/20 shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="font-mono text-accent text-sm">
              {"<"}<span className="text-foreground">Lucas Lafetá</span>{" />"}
            </div>
            <div className="flex items-center gap-6">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`font-mono text-sm transition-colors hover:text-accent ${
                    activeSection === item.id ? "text-accent" : "text-muted-foreground"
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <div className="ml-2">
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>
      </nav>

      <nav className="lg:hidden fixed top-0 left-0 right-0 z-[100] bg-background/95 backdrop-blur-md border-b border-accent/20 shadow-lg">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <button
            onClick={(e) => {
              e.stopPropagation()
              setIsOpen(!isOpen)
            }}
            className="p-2 text-accent hover:bg-accent/10 rounded transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          
          <div className="font-mono text-accent text-xs sm:text-sm absolute left-1/2 transform -translate-x-1/2">
            {"<"}<span className="text-foreground">Lucas Lafetá</span>{" />"}
          </div>
          
          <ThemeToggle />
        </div>

        {isOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[98]"
              onClick={() => setIsOpen(false)}
            />
            
            <div className="fixed top-[57px] left-0 bottom-0 w-64 bg-background border-r border-accent/30 shadow-2xl z-[99] animate-in slide-in-from-left duration-300">
              <div className="p-6 space-y-1">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`block w-full text-left px-4 py-3 font-mono text-sm rounded transition-all ${
                      activeSection === item.id
                        ? "bg-accent/20 text-accent border-l-2 border-accent"
                        : "text-muted-foreground hover:bg-accent/10 hover:text-foreground hover:translate-x-1"
                    }`}
                  >
                    <span className="text-accent">{">"}</span> {item.label}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </nav>
    </>
  )
}
