export type Direction = "up" | "down" | "left" | "right"

interface PlayerProps {
  x: number
  y: number
  direction: Direction
  moving: boolean
}

export function Player({ x, y, direction, moving }: PlayerProps) {
  return (
    <div
      className={`player player--${direction} ${moving ? "player--walking" : ""}`}
      style={{ left: `${x}%`, top: `${y}%` }}
    >
      <span className="player__head" />
      <span className="player__body" />
    </div>
  )
}
