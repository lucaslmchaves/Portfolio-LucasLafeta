import React, { useState, useEffect } from 'react';
import './PortfolioRoom.css';

const PortfolioRoom = () => {
  // 1. Criamos um estado para armazenar a posição do scroll
  const [scrollY, setScrollY] = useState(0);

  // 2. Função que será chamada toda vez que o usuário rolar a página
  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  // 3. Usamos o useEffect para adicionar e remover o "ouvinte" do evento de scroll
  useEffect(() => {
    // Adiciona o ouvinte quando o componente é montado
    window.addEventListener('scroll', handleScroll);

    // Remove o ouvinte quando o componente é desmontado (importante para performance)
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // O array vazio [] garante que isso rode apenas uma vez

  // 4. Calculamos os estilos dinâmicos com base no scrollY
  const titleStyle = {
    // Faz o título desaparecer conforme rolamos para baixo
    opacity: Math.max(0, 1 - scrollY / 300), 
  };
  
  const projectStyle = {
    // Move o quadro para dentro da tela a partir da esquerda
    transform: `translateX(${Math.min(0, -500 + scrollY * 1.5)}px)`,
  };

  const decorationStyle = {
    // Move o objeto decorativo para cima mais lentamente (efeito parallax)
    transform: `translateY(-${scrollY * 0.3}px)`,
  };

  return (
    <div className="room-container">
      <h1 className="welcome-title" style={titleStyle}>
        Olá, sou o Lucas!
      </h1>

      <div className="project-frame" style={projectStyle}>
        Projeto 1
      </div>

      <div className="decorative-object" style={decorationStyle}></div>

      {/* Adicione mais objetos aqui e crie seus próprios estilos dinâmicos! */}

    </div>
  );
};

export default PortfolioRoom;