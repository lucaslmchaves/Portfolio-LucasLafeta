import type { MainData } from "../types"

export function SobreMimView({ data }: { data: MainData }) {
  return (
    <div className="content-block">
      <p className="content-block__lead">{data.occupation}</p>
      <p>{data.bio}</p>
      <p className="content-block__note">
        Versão em inglês desta seção chega na Sprint 2.
      </p>
    </div>
  )
}
