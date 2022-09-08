import { useState } from "react";
import './App.css';
import FinalPage from './components/FinalPage';
import StartingPage from "./components/startingPage";
import QuestionPage from "./components/QuestionPage"

function App() {


  const [showStartingPage, setShowStartingPage] = useState(true);
  const [showQuestionsPage, setShowQuestionsPage] = useState(false);
  const [showFinalPage, setShowFinalPage] = useState(false);

  const [score, setScore] = useState(0);
  const [topScore, setTopScore] = useState(0);

  const [username, setUsername] = useState("");

  return (
    <>
    {showStartingPage && (
    <StartingPage 
    setShowStartingPage={setShowStartingPage}
    setShowQuestionsPage={setShowQuestionsPage}
    topScore={topScore}
    username={username}
    setUsername={setUsername}
    />
    )}

    {showQuestionsPage && (
    <QuestionPage 
    score={score}
    setScore={setScore}
    setShowQuestionsPage={setShowQuestionsPage}
    setShowFinalPage={setShowFinalPage}
    />
    )}
    {showFinalPage && (
    <FinalPage 
    score={score}
    topScore={topScore}
    setTopScore={setTopScore}
    setShowStartingPage={setShowStartingPage}
    setShowFinalPage={setShowFinalPage}
    setScore={setScore}
    username={username}
    setUsername={setUsername}
    />
    )}
    </>
    
  );
}

export default App;
