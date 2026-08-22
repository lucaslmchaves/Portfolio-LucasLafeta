import type { HouseConfig } from "../types"

interface HouseProps {
  house: HouseConfig
  active: boolean
  onClick: (id: HouseConfig["id"]) => void
}

export function House({ house, active, onClick }: HouseProps) {
  return (
    <button
      type="button"
      className={`house house--${house.id} ${active ? "house--active" : ""}`}
      style={{ left: `${house.x}%`, top: `${house.y}%` }}
      onClick={() => onClick(house.id)}
      aria-label={`Entrar em ${house.label}`}
    >
      <span className="house__sprite" />
      <span className="house__sign">{house.label}</span>
      {active && <span className="house__prompt">ENTER ▶</span>}
    </button>
  )
}
