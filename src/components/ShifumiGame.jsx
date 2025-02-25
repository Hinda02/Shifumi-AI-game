import { useState } from "react";
import { FaHandRock, FaHandPaper, FaHandScissors } from "react-icons/fa";
import AiOpponent from "../utils/AiOpponent";

// 3 possible choices and their icons
const choices = [
  { name: "rock", icon: <FaHandRock size={60} /> },
  { name: "paper", icon: <FaHandPaper size={60} /> },
  { name: "scissors", icon: <FaHandScissors size={60} /> }
];

const ai = new AiOpponent(); // AI instance

const ShifumiGame = () => {
  const [playerChoice, setPlayerChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState("");
  const [score, setScore] = useState({ wins: 0, losses: 0, draws: 0 });

  const playGame = (choice) => {
    setPlayerChoice(choice);
    ai.recordPlayerMove(choice);
    
    const aiMove = ai.getAiMove();
    setComputerChoice(aiMove);

    determineWinner(choice, aiMove);
  };

  const determineWinner = (player, computer) => {
    if (player === computer) {
      setResult("It's a Draw! 🤝");
      setScore((prev) => ({ ...prev, draws: prev.draws + 1 }));
    } else if (
      (player === "rock" && computer === "scissors") ||
      (player === "paper" && computer === "rock") ||
      (player === "scissors" && computer === "paper")
    ) {
      setResult("You Win! 🎉");
      setScore((prev) => ({ ...prev, wins: prev.wins + 1 }));
    } else {
      setResult("You Lose! 😢");
      setScore((prev) => ({ ...prev, losses: prev.losses + 1 }));
    }
  };

  return (
    
    <div 
      className="flex flex-col items-center justify-center w-screen h-screen p-8 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/background.png')" }}
    >
      <div className="flex items-center space-x-4 ">
        <img src="/shifumi.svg" alt="Shifumi Logo" className="w-12 h-12" />
        <h1 className="text-5xl font-bold text-gray-700">Shifumi Game</h1>
      </div>
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">
        You are playing against an intelligent opponent 🤖
      </h2>

      {/* Scoreboard */}
      <div className="flex space-x-8 bg-white p-4 rounded-lg shadow-md text-lg font-medium mt-6 mb-6 border-2 border-gray-300">
        <p className="text-green-700">✅ Wins: <span className="font-bold">{score.wins}</span></p>
        <p className="text-gray-700">🤝 Draws: <span className="font-bold">{score.draws}</span></p>
        <p className="text-red-700">❌ Losses: <span className="font-bold">{score.losses}</span></p>
      </div>

      {/* Choices */}
      <div className="flex space-x-6">
        {choices.map((choice) => (
          <button
          key={choice.name}
          className="flex flex-col items-center px-6 py-3 bg-blue-500 text-blue font-semibold rounded-lg hover:bg-blue-700 transition transform hover:scale-110"
          onClick={() => playGame(choice.name)}
        >
          {choice.icon}
          <span className="mt-2">{choice.name.toUpperCase()}</span>
        </button>
        ))}
      </div>

      {/* Results */}
      <div className="mt-8 text-2xl font-semibold text-gray-900 border-gray-300">
        {playerChoice && <p>You chose: <strong className="text-blue-500">{playerChoice}</strong></p>}
        {computerChoice && <p>AI chose: <strong className="text-red-500">{computerChoice}</strong></p>}
        {result && <p className="mt-4 text-2xl font-bold">{result}</p>}
      </div>
    </div>

  );
};

export default ShifumiGame;
