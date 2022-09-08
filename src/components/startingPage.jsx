import React, { useState } from "react";
import Card from "./Card";
import {ethers} from 'ethers';

import "./startingPage.css";


const StartingPage = ({
    setShowStartingPage,
    setShowQuestionsPage,
    topScore,
    username,
    setUsername,
  }) => {

  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
	const [userBalance, setUserBalance] = useState(null);
	const [connButtonText, setConnButtonText] = useState('Connect');
    
  //Wallet
    const connectWallet = () => {
      if (window.ethereum) {
        window.ethereum.request({method: 'eth_requestAccounts'})
        .then(result => {
          accountChanged(result[0]);
          setConnButtonText('Conectado')
        })
      } else {
        setErrorMessage('Instalar Metamask');
      }
    }
    
    const accountChanged = (newAccount) => {
      setDefaultAccount(newAccount);
      getUserBalance(newAccount);
    }
    //balance del wallet
    const getUserBalance = (address) => {
      window.ethereum.request({method: 'eth_getBalance', params: [address, 'latest']})
      .then(balance => {
        setUserBalance(ethers.utils.formatEther(balance));
      })
    }

    const startGame = () => {
        if (username.trim().length > 0) {
          setShowStartingPage(false);
          setShowQuestionsPage(true);
        }
      };
      
      return (
        <Card>
            <h1 className="header">Welcome to Quiz </h1>
            <h3 className="primary_text">Conecta tu Wallet</h3>
            <button className="connect_wallet" onClick={connectWallet}>{connButtonText}</button>
            <input 
            type="text" 
            className="username_input" 
            placeholder='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            />

            <button className="start_btn" onClick={startGame}>Comenzar</button>
            <div className="accountDislay">
              <h3>Address: {defaultAccount}</h3> 
            </div>

            <div className="balanceDisplay">
              <h3>Balance: {userBalance}</h3>
            </div>
            {errorMessage}

            <p className="top_score">
                Top score: <span>0</span>
            </p>
        </Card>
    );
}

export default StartingPage;