import type { ReactNode } from "react"

interface SectionViewProps {
  title: string
  onBack: () => void
  children: ReactNode
}

export function SectionView({ title, onBack, children }: SectionViewProps) {
  return (
    <div className="section-view">
      <div className="section-view__panel">
        <header className="section-view__header">
          <h2>{title}</h2>
        </header>
        <div className="section-view__content">{children}</div>
        <footer className="section-view__footer">
          <button type="button" className="pixel-button" onClick={onBack}>
            ◀ Voltar ao mapa (ESC)
          </button>
        </footer>
      </div>
    </div>
  )
}
