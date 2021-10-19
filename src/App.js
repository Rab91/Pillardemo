
import './App.css';

function App() {
  return (
    <div className="App">
      <p>Pillar App</p>
      <script src="main.js" ></script>
      <button onclick="enableEth()">check wallet</button><br/><br/>
    <button onclick="enableEthBalance()">check my balance</button><br/><br/>
    <button onclick="sendTransaction()">Send Transaction</button>
    </div>
  );
}

export default App;
