import React from "react";
import Card from "./Card";
import { useState, useEffect } from "react";
import "./Question.css";

const Question = ({
    questionIndex,
    setQuestionIndex,
    questions,
    setShowQuestionsPage,
    setShowFinalPage,
    score,
    setScore,
  }) => {

    const [tiempoRestante, setTiempoRestante] = useState(30);
    const [tiempoAacabado, setTiempoAcabado] = useState(false);

    const handleClick = (isCorrect) => {
        if (questionIndex < 3) {
          if (isCorrect) {
            setScore((score) => (score += 100));
          }
    
          setQuestionIndex((prevIndex) => prevIndex + 1);
        } else {
          if (isCorrect) {
            setScore((score) => (score += 100));
          }
    
          setShowQuestionsPage(false);
          setShowFinalPage(true);
        }
      };
      
      useEffect(() => {
        const intervalo = setInterval(() => {
          if (tiempoRestante > 0) setTiempoRestante((prev) => prev - 1);
          if (tiempoRestante === 0) setTiempoAcabado(true);
        }, 1000);
    
        return () => clearInterval(intervalo);
      }, [tiempoRestante]);  
  

    return (
        <Card>
            <h1 className="question">{questions[questionIndex].questionText}</h1>

            <div className="answers">
                {questions[questionIndex].answers.map((answer, i) => (
                    <div
                        key={i}
                        className="answer"
                        onClick={() => handleClick(answer.correctAnswer)}
                    >
                        <p>{answer.answerText}</p>
                    </div>
                ))}
                
            </div>
            <div>
            {!tiempoAacabado ? (
            <span className="tiempo-restante">Tiempo restante: {tiempoRestante}{" "}</span>
          ) : (
            <button className="continuar-btn"
              onClick={() => {
                setTiempoRestante(30);
                setTiempoAcabado(false);
                setQuestionIndex(questionIndex + 1)
              }}
            >Continuar</button>
          )}
            </div>

            <p className="score">
                Score: <span>{score}</span>
            </p>
        </Card>
    );
};

export default Question