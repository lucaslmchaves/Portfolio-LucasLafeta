import React from 'react';
import PortfolioRoom from './components/PortfolioRoom';
import './App.css';

function App() {
  return (
    <div className="scroll-container">
      <PortfolioRoom />
      <div className="scroll-prompt">
        Role para baixo para explorar
      </div>
    </div>
  );
}

export default App;