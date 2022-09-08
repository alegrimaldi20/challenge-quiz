import React from "react";
import Card from "./Card";
import { useState } from "react";
import {BigNumber, ethers} from 'ethers';
import Survey from '../contracts/Survey.json';


import "./FinalPages.css";
import { useEffect } from "react";

const surveyAddress = '0x74F0B668Ea3053052DEAa5Eedd1815f579f0Ee03';

const FinalPage = ({
    score,
    setShowFinalPage,
    setShowStartingPage,
    topScore,
    setTopScore,
    setScore,
    username,
    setUsername,
  }) => {

   const [accounts, setAccounts] = useState([]);

    async function connectSurvey() {
     if (window.ethereum) {
      const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccounts(accounts);
      }
    }

    useEffect(() => {
      connectSurvey();
    }, []);
    
    
    //Mint
    const [mintAmount, setMintAmount] = useState(1);

    async function surveyMint() {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          surveyAddress, Survey.abi, signer
        );
        try {
          const response = await contract.submit(BigNumber.from(mintAmount));
          console.log("response: ", response);
        } catch(err) {
          console.log("error: ", err);
        }
      }
    }


    const handleClick = () => {
        if (score > topScore) {
          setTopScore(score);
        }
    
        setShowFinalPage(false);
        setShowStartingPage(true);
        setScore(0);
        setUsername("");
      };

      const Decrement = () => {
        if (mintAmount <= 1) return;
        setMintAmount(mintAmount - 1);
    };

    const Increment = () => {
        if (mintAmount >= 3) return;
        setMintAmount(mintAmount + 1);
    };

    return(
        <Card>
            <h1 className="heading">
                Llegaste al final del juego {username}!
            </h1>

            <h3 className="primary_text">Tu puntuacion final es:</h3>

            <h3 className="final_score">{score}</h3>
            {accounts.length && (
              <div>
                <button className="plus_btn" onClick={Increment}>+</button>
                <input type="number" value={mintAmount}/>
                <button className="subtraction_btn" onClick={Decrement}>-</button>
                <button className="mint_btn" onClick={surveyMint}>
                  Mint
                </button>
              </div>
            )}
            <button className="play_again_btn" onClick={handleClick}>
              Nuevo Juego
            </button>
        </Card>
    )
}


export default FinalPage;