import { useCallback, useEffect, useRef, useState } from "react"
import { MapScene, type MapSceneHandle } from "./components/MapScene"
import { NavMenu } from "./components/NavMenu"
import { SectionView } from "./views/SectionView"
import { SobreMimView } from "./views/SobreMimView"
import { ProjetosView } from "./views/ProjetosView"
import { ExperienciasView } from "./views/ExperienciasView"
import { ContatoView } from "./views/ContatoView"
import { HelpView } from "./views/HelpView"
import { useResumeData } from "./data/useResumeData"
import type { SectionId } from "./types"

const SECTION_TITLES: Record<SectionId, string> = {
  sobre: "Sobre Mim",
  projetos: "Projetos",
  experiencia: "Experiências",
  contato: "Contato",
}

type Overlay = SectionId | "ajuda" | null

export default function App() {
  const data = useResumeData()
  const [overlay, setOverlay] = useState<Overlay>(null)
  const mapRef = useRef<MapSceneHandle>(null)

  const closeOverlay = useCallback(() => setOverlay(null), [])

  const handleNavigate = useCallback((id: SectionId) => {
    mapRef.current?.focusHouse(id)
    setOverlay(id)
  }, [])

  const handleGoHome = useCallback(() => {
    mapRef.current?.goHome()
    setOverlay(null)
  }, [])

  useEffect(() => {
    if (!overlay) return
    function handleEsc(e: KeyboardEvent) {
      if (e.key === "Escape") closeOverlay()
    }
    window.addEventListener("keydown", handleEsc)
    return () => window.removeEventListener("keydown", handleEsc)
  }, [overlay, closeOverlay])

  if (!data) {
    return (
      <div className="loading-screen">
        <div className="loading-screen__sprite">
          <span className="loading-screen__cap" />
          <span className="loading-screen__head" />
          <span className="loading-screen__body" />
        </div>
        <h1 className="loading-screen__title">Só um instante</h1>
        <p className="loading-screen__subtitle">não vá a lugar nenhum...</p>
      </div>
    )
  }

  return (
    <div className="game">
      <header className="game__header">
        <h1>{data.main.name}</h1>
        <NavMenu onNavigate={handleNavigate} onGoHome={handleGoHome} onHelp={() => setOverlay("ajuda")} />
      </header>

      <main className="game__main">
        <MapScene ref={mapRef} onEnterSection={setOverlay} contatoOpen={overlay === "contato"} />
      </main>

      <footer className="game__footer">
        <p>Portfólio profissional — Engenharia de Software, PUC Minas</p>
      </footer>

      {overlay === "sobre" && (
        <SectionView title={SECTION_TITLES.sobre} onBack={closeOverlay}>
          <SobreMimView data={data.main} />
        </SectionView>
      )}
      {overlay === "projetos" && (
        <SectionView title={SECTION_TITLES.projetos} onBack={closeOverlay}>
          <ProjetosView data={data.portfolio} />
        </SectionView>
      )}
      {overlay === "experiencia" && (
        <SectionView title={SECTION_TITLES.experiencia} onBack={closeOverlay}>
          <ExperienciasView data={data.resume} />
        </SectionView>
      )}
      {overlay === "contato" && (
        <SectionView title={SECTION_TITLES.contato} onBack={closeOverlay}>
          <ContatoView data={data.main} />
        </SectionView>
      )}
      {overlay === "ajuda" && <HelpView onBack={closeOverlay} />}
    </div>
  )
}
