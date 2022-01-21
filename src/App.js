import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import abi from "./utils/WavePortal.json";

import "./App.css";

function App() {
  const [currentAccount, setCurrentAccout] = useState("");
  const contractAddress = "0x36C33E5807B3D5f4E47C44838D96fF676EBC018d";
  const contractABI = abi.abi;

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get Metamask!");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("connected", accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const wave = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        let count = await wavePortalContract.getTotalWaves();
        console.log("Retrieved total wave count...", count.toNumber());

        const waveTxn = await wavePortalContract.wave();
        console.log("Mining...", waveTxn.hash);

        await waveTxn.wait();
        console.log("Mined --", waveTxn.hash);

        count = await wavePortalContract.getTotalWaves();
        console.log("Retrieved total wave count...", count.toNumber());
      } else {
        console.log("Etherum object doesnt exist");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const checkIfWalletIsConnected = async () => {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Make sure you have metamask");
      } else {
        console.log("We have the etherum object", ethereum);
      }

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setCurrentAccout(account);
        console.log(currentAccount);
      } else {
        console.log("No authorized account found");
      }
    };

    checkIfWalletIsConnected();
  }, []);

  return (
    <div className="App">
      <div className="App-header">
        <div>🤖</div>

        <div className="bio">
          I am wave and this is my first smart contract.
        </div>

        <button className="waveButton" onClick={wave}>
          Wave at me
        </button>
        <br></br>
        <button className="waveButton" onClick={connectWallet}>
          Connect Metamask &nbsp;
          <img
            src="https://emoji.gg/assets/emoji/1385-metamask.png"
            width="30px"
            height="30px"
            alt="metamask"
          />
        </button>
      </div>
    </div>
  );
}

export default App;
