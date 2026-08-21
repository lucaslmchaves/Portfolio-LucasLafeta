import { useEffect, useState } from "react"
import type { ResumeData } from "../types"

export function useResumeData() {
  const [data, setData] = useState<ResumeData | null>(null)

  useEffect(() => {
    fetch("/resumeData.json")
      .then((res) => res.json())
      .then(setData)
      .catch((err) => console.error("Falha ao carregar resumeData.json:", err))
  }, [])

  return data
}
