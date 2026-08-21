import { useEffect, useRef, useState } from "react"
import type { SectionId } from "../types"

interface NavMenuProps {
  onNavigate: (id: SectionId) => void
  onGoHome: () => void
  onHelp: () => void
}

const NAV_ITEMS: { id: SectionId; label: string }[] = [
  { id: "sobre", label: "Sobre Mim" },
  { id: "experiencia", label: "Experiências" },
  { id: "projetos", label: "Projetos" },
  { id: "contato", label: "Contato" },
]

export function NavMenu({ onNavigate, onGoHome, onHelp }: NavMenuProps) {
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [open])

  return (
    <div className="nav-menu" ref={menuRef}>
      <button
        type="button"
        className="nav-menu__toggle pixel-button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Abrir menu de navegação"
        aria-expanded={open}
      >
        ☰
      </button>

      {open && (
        <nav className="nav-menu__dropdown">
          <ul>
            <li>
              <button
                type="button"
                onClick={() => {
                  onGoHome()
                  setOpen(false)
                }}
              >
                Início
              </button>
            </li>
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => {
                    onNavigate(item.id)
                    setOpen(false)
                  }}
                >
                  {item.label}
                </button>
              </li>
            ))}
            <li>
              <button
                type="button"
                onClick={() => {
                  onHelp()
                  setOpen(false)
                }}
              >
                ? Como jogar
              </button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  )
}
