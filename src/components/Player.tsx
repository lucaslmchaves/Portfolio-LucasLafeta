import { useEffect, useState } from "react"

export type Direction = "up" | "down" | "left" | "right"

interface PlayerProps {
  x: number
  y: number
  direction: Direction
  moving: boolean
}

const ROW: Record<Direction, number> = {
  down: 0,
  left: 1,
  right: 2,
  up: 3,
}

// sequência clássica de charset: parado, passo, parado, outro passo
const WALK_CYCLE = [1, 0, 1, 2]

export function Player({ x, y, direction, moving }: PlayerProps) {
  const [step, setStep] = useState(0)

  useEffect(() => {
    if (!moving) {
      setStep(0)
      return
    }
    const id = setInterval(() => setStep((s) => (s + 1) % WALK_CYCLE.length), 170)
    return () => clearInterval(id)
  }, [moving])

  const row = ROW[direction]
  const col = moving ? WALK_CYCLE[step] : 1
  const backgroundPosition = `${col * 50}% ${row * (100 / 3)}%`

  return (
    <div className="player" style={{ left: `${x}%`, top: `${y}%` }}>
      <span className="player__shadow" />
      <span className="player__sprite" style={{ backgroundPosition }} />
    </div>
  )
}
