import './App.css';
import { useState, useEffect } from 'react';
import { ethers, BrowserProvider, Contract } from 'ethers';
import Greeter from './artifacts/contracts/Greeter.sol/Greeter.json'

// Update with the contract address logged out to the CLI when it was deployed 
const greeterAddress = "0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6"

function App() {
  // store greeting in local state
  const [greeting, setGreetingValue] = useState()

  // request access to the user's MetaMask account
  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  }

  // call the smart contract, read the current greeting value
  async function fetchGreeting() {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new BrowserProvider(window.ethereum);
      const contract = new Contract(greeterAddress, Greeter.abi, provider)
      try {
        const data = await contract.greet()
        console.log('data: ', data)
      } catch (err) {
        console.log("Error: ", err)
      }
    }    
  }

  // 添加 provider 状态
  const [provider, setProvider] = useState(null);

  // 在 useEffect 中初始化 provider
  useEffect(() => {
    const initProvider = async () => {
      if (window.ethereum) {
        const provider = new BrowserProvider(window.ethereum);
        setProvider(provider);
      }
    };
    initProvider();
  }, []);

  // call the smart contract, send an update
  const setGreeting = async () => {
    try {
      if (!provider) return;
      const signer = await provider.getSigner();
      const contract = new Contract(greeterAddress, Greeter.abi, signer);
      
      const transaction = await contract.setGreeting(greeting);
      await transaction.wait();
      
      fetchGreeting();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={fetchGreeting}>Fetch Greeting</button>
        <button onClick={setGreeting}>Set Greeting</button>
        <input onChange={e => setGreetingValue(e.target.value)} placeholder="Set greeting" />
      </header>
    </div>
  );
}

export default App;