import React from "react";
import { useState } from "react";
import { questions } from '../question'

import Question from "./Question";

const QuestionPage = ({
    setShowPages,
    score,
    setScore,
    setShowQuestionsPage,
    setShowFinalPage,
  }) => {

    const [questionIndex, setQuestionIndex] = useState(0);

    return (
        <>
        <Question 
        questionIndex={questionIndex}
        questions={questions}
        setQuestionIndex={setQuestionIndex}
        setShowQuestionsPage={setShowQuestionsPage}
        setShowFinalPage={setShowFinalPage}
        score={score}
        setScore={setScore}
        />
        </>
    )
}

export default QuestionPage