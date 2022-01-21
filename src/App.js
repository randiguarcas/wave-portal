import './App.css';

const wave = () => {
  alert(1)
}

function App() {
  return (
    <div className="App">
      <div className="App-header">
        <div>
          🤖
        </div>
        <div className="bio">
          I am bot and this is my first smart contract.
        </div>
        <button className="waveButton" onClick={wave}>
          Wave at me
        </button>
      </div>
    </div>
  );
}

export default App;
