import React from 'react';
import logo from './logo.svg';
import './App.css';
import Play from './Container/Play';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Play with Tamagotchi.
        </p>
      </header>
      <section>
        <Play/>
      </section>
    </div>
  );
}

export default App;
