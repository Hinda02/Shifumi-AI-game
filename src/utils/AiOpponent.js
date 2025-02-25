class AiOpponent {
    constructor() {
      this.moveHistory = { rock: 0, paper: 0, scissors: 0 }; // Stores the history of the player's moves
      this.recentMoves = []; // Stores the last few moves
      this.memory = 5; // length at which recentMoves is kept at
    }
  
    /**
     * Records the player's last move and updates history.
     * @param {string} playerMove 
     */
    recordPlayerMove(playerMove) {
      if (this.moveHistory[playerMove] !== undefined) {
        this.moveHistory[playerMove]++;
      }
  
      // Store the recent moves in a cycling memory
      // of the 5 most recent moves
      this.recentMoves.push(playerMove);
      if (this.recentMoves.length > this.memory) {
        // Remove the oldest move (FIFO concept)
        this.recentMoves.shift(); 
      }
    }
  
    /**
     * Detects patterns in the player's last few moves.
     * If a cycle is detected (Rock → Paper → Scissors) the AI counters the next expected move.
     * Or else returns null.
     * @returns {string|null}
     */
    detectPattern() {
      if (this.recentMoves.length < 3) return null; // Not enough data
  
      const lastThree = this.recentMoves.slice(-3).join("");
  

      switch (lastThree) {
        case "rockpaperscissors":
        case "rockscissorspaper":
          return "rock";
        case "paperscissorsrock":
        case "paperrockscissors":
          return "paper";
        case "scissorsrockpaper":
        case "scissorspaperrock":
          return "scissors";
      }
      
  
      return null;
    }
  
    /**
     * Predicts the player's next move based on frequency and patterns.
     * @returns {string}
     */
    predictPlayerMove() {
      let predictedMove = this.randomChoice();

      // 60% chance to use pattern detection, 40% to use frequency

      if (Math.random() < 0.6) {
        const patternMove = this.detectPattern();
        if (patternMove){
          predictedMove = patternMove;
        }
      }else{

        let maxCount = 0;
        for (const move in this.moveHistory) {
          if (this.moveHistory[move] > maxCount) {
            maxCount = this.moveHistory[move];
            predictedMove = move;
          }
        }
      }
  
      return predictedMove;
    }
  
    /**
     * Selects the best counter-move to beat the predicted player move.
     * @returns {string}
     */
    getAiMove() {
      const predictedMove = this.predictPlayerMove();
  
      // AI picks the move that beats the predicted move
      const counterMoves = {
        rock: "paper",
        paper: "scissors",
        scissors: "rock",
      };

      let aiMove = counterMoves[predictedMove];
  
      // Random move by AI at a rate of 10% to keep some of the game's authentic randomness
      if (Math.random() < 0.1) {
        aiMove = this.randomChoice();
      }
  
      return aiMove;
    }

    getRandomInteger(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    randomChoice(){
      let choices = ["rock", "paper", "scissors"];
      let randInt = this.getRandomInteger(0, 2); // between 0 and 2 included
      return choices[randInt];
    }
  }

  
  export default AiOpponent;
  