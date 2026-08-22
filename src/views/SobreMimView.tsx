import { useState } from "react"
import type { MainData } from "../types"

export function SobreMimView({ data }: { data: MainData }) {
  const [lang, setLang] = useState<"pt" | "en">("pt")

  return (
    <div className="content-block">
      <div className="lang-toggle" role="group" aria-label="Idioma">
        <button
          type="button"
          className={lang === "pt" ? "lang-toggle__active" : ""}
          onClick={() => setLang("pt")}
        >
          PT
        </button>
        <button
          type="button"
          className={lang === "en" ? "lang-toggle__active" : ""}
          onClick={() => setLang("en")}
        >
          EN
        </button>
      </div>

      <p className="content-block__lead">
        {lang === "pt" ? data.occupation : data.occupation_en}
      </p>
      <p>{lang === "pt" ? data.bio : data.bio_en}</p>
    </div>
  )
}
