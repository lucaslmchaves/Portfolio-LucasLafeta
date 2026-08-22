import { useEffect, useImperativeHandle, useRef, useState, forwardRef } from "react"
import { House } from "./House"
import { Player, type Direction } from "./Player"
import type { HouseConfig, SectionId } from "../types"

const HOUSES: HouseConfig[] = [
  { id: "sobre", label: "Sobre Mim", x: 28, y: 20 },
  { id: "experiencia", label: "Experiências", x: 72, y: 42 },
  { id: "projetos", label: "Projetos", x: 28, y: 64 },
]

const BOAT = { id: "contato" as SectionId, label: "Contato", x: 62, y: 92 }
const WATER_TOP = 84

const START_POS = { x: 50, y: 13 }
const PLAYER_SIZE = 6
const STEP = 0.38
const ENTER_DISTANCE_X = 9
const ENTER_DISTANCE_Y = 8

export interface MapSceneHandle {
  goHome: () => void
  focusHouse: (id: SectionId) => void
}

interface MapSceneProps {
  onEnterSection: (id: SectionId) => void
  contatoOpen?: boolean
}

export const MapScene = forwardRef<MapSceneHandle, MapSceneProps>(function MapScene(
  { onEnterSection, contatoOpen },
  ref,
) {
  const [pos, setPos] = useState(START_POS)
  const [direction, setDirection] = useState<Direction>("down")
  const [moving, setMoving] = useState(false)
  const [hasMoved, setHasMoved] = useState(false)
  const keysHeld = useRef(new Set<string>())
  const worldRef = useRef<HTMLDivElement>(null)
  const allSpots: HouseConfig[] = [...HOUSES, BOAT]
  const nearestHouse = getNearestSpot(pos, allSpots)

  useImperativeHandle(ref, () => ({
    goHome: () => setPos(START_POS),
    focusHouse: (id) => {
      const spot = allSpots.find((h) => h.id === id)
      if (spot) setPos({ x: spot.x, y: clamp(spot.y + 10, 0, 100 - PLAYER_SIZE) })
    },
  }))

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "w", "a", "s", "d"].includes(e.key)) {
        keysHeld.current.add(e.key.toLowerCase())
        e.preventDefault()
      }
      if (e.key === "Enter" && nearestHouse) {
        onEnterSection(nearestHouse.id)
      }
    }
    function handleKeyUp(e: KeyboardEvent) {
      keysHeld.current.delete(e.key.toLowerCase())
    }
    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("keyup", handleKeyUp)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("keyup", handleKeyUp)
    }
  }, [nearestHouse, onEnterSection])

  useEffect(() => {
    let frameId: number
    const tick = () => {
      const keys = keysHeld.current
      let dx = 0
      let dy = 0
      if (keys.has("arrowup") || keys.has("w")) dy -= 1
      if (keys.has("arrowdown") || keys.has("s")) dy += 1
      if (keys.has("arrowleft") || keys.has("a")) dx -= 1
      if (keys.has("arrowright") || keys.has("d")) dx += 1

      if (dx !== 0 || dy !== 0) {
        setMoving(true)
        setHasMoved(true)
        if (dx < 0) setDirection("left")
        else if (dx > 0) setDirection("right")
        else if (dy < 0) setDirection("up")
        else if (dy > 0) setDirection("down")

        setPos((prev) => ({
          x: clamp(prev.x + dx * STEP, 6, 94 - PLAYER_SIZE),
          y: clamp(prev.y + dy * STEP, 0, 100 - PLAYER_SIZE),
        }))
      } else {
        setMoving(false)
      }
      frameId = requestAnimationFrame(tick)
    }
    frameId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameId)
  }, [])

  function handleWorldClick(e: React.MouseEvent<HTMLDivElement>) {
    if ((e.target as HTMLElement).closest(".house")) return
    setHasMoved(true)
    const rect = worldRef.current!.getBoundingClientRect()
    const clickX = ((e.clientX - rect.left) / rect.width) * 100
    const clickY = ((e.clientY - rect.top) / rect.height) * 100
    setPos({
      x: clamp(clickX - PLAYER_SIZE / 2, 6, 94 - PLAYER_SIZE),
      y: clamp(clickY - PLAYER_SIZE / 2, 0, 100 - PLAYER_SIZE),
    })
  }

  return (
    <div className="map-scene">
      <div className="map-scene__world" ref={worldRef} onClick={handleWorldClick}>
        <div className="map-scene__hedge map-scene__hedge--left" />
        <div className="map-scene__hedge map-scene__hedge--right" />
        <div className="map-scene__water" style={{ top: `${WATER_TOP}%` }} />

        <span className="decor decor--tree" style={{ left: "60%", top: "10%" }} />
        <span className="decor decor--flowers" style={{ left: "14%", top: "48%" }} />
        <span className="decor decor--tree" style={{ left: "60%", top: "55%" }} />
        <span className="decor decor--flowers" style={{ left: "16%", top: "78%" }} />

        {!hasMoved && (
          <div className="signboard" style={{ left: "50%", top: "2%" }}>
            <p className="signboard__hint">↑ Pressione as setas para começar</p>
          </div>
        )}

        {HOUSES.map((house) => (
          <House
            key={house.id}
            house={house}
            active={nearestHouse?.id === house.id}
            onClick={onEnterSection}
          />
        ))}

        <button
          type="button"
          className={`boat ${nearestHouse?.id === BOAT.id ? "boat--active" : ""} ${contatoOpen ? "boat--sailing" : ""}`}
          style={{ left: `${BOAT.x}%`, top: `${BOAT.y}%` }}
          onClick={() => onEnterSection(BOAT.id)}
          aria-label={`Entrar em ${BOAT.label}`}
        >
          <span className="boat__sprite" />
          <span className="house__sign">{BOAT.label}</span>
          {nearestHouse?.id === BOAT.id && <span className="house__prompt">ENTER ▶</span>}
        </button>

        <Player x={pos.x} y={pos.y} direction={direction} moving={moving} />
      </div>
      <div className="map-scene__hint">
        <span>↑ ↓ ← → / WASD move · clique no mapa para teleportar</span>
        <span>ENTER para entrar · use o menu ☰ pra ir direto</span>
      </div>
    </div>
  )
})

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function getNearestSpot(pos: { x: number; y: number }, spots: HouseConfig[]) {
  const playerCenter = { x: pos.x + PLAYER_SIZE / 2, y: pos.y + PLAYER_SIZE / 2 }
  return spots.find(
    (spot) =>
      Math.abs(spot.x - playerCenter.x) < ENTER_DISTANCE_X &&
      Math.abs(spot.y - playerCenter.y) < ENTER_DISTANCE_Y,
  )
}
