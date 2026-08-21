import { SectionView } from "./SectionView"

interface HelpViewProps {
  onBack: () => void
}

export function HelpView({ onBack }: HelpViewProps) {
  return (
    <SectionView title="Como Jogar?" onBack={onBack}>
      <ul className="help-list">
        <li>Use as setas do teclado ou WASD para mover o personagem (↑ ↓ ← →)</li>
        <li>Entre nas casas para acessar as informações de cada seção</li>
        <li>Clique em qualquer lugar do mapa para teleportar o personagem até lá</li>
        <li>Aperte "Esc" para sair de uma casa ou fechar este aviso</li>
        <li>Use o menu (☰) no topo para ir direto a qualquer seção</li>
      </ul>
    </SectionView>
  )
}
