import { playRound, resetGame } from "./rps.logic.js";

const ui = {
  choiceButton: document.querySelectorAll(".choiceButton"),
  feedback: document.getElementById("feedback"),
  playAgainButton: document.getElementById("playAgainButton"),
};

function setChoiceButtonDisabled(disabled) {
  ui.choiceButton.forEach((button) => {
    button.disabled = disabled;
  });
}

function resetUI() {
  ui.feedback.textContent = "";
  setChoiceButtonDisabled(false);
  ui.playAgainButton.disabled = true;
}

function handlePlayerChoice(playerChoice) {
  const roundResult = playRound(playerChoice);
  if (!roundResult) {
    return;
  }

  const { playerChoice: player, computerChoice, result, gameState } = roundResult;

  ui.feedback.textContent = `You chose ${playerChoice}. Computer chose ${computerChoice}. Result: ${result.toUpperCase()}`;

  if (gameState.isGameOver) {
    setChoiceButtonDisabled(true);
    ui.playAgainButton.disabled = false;
    ui.feedback.innerHTML += `<br> Final Score: You ${gameState.playerScore} - ${gameState.computerScore} Computer`;
  }
}

function handlePlayAgain() {
  resetGame();
  resetUI();
}

ui.choiceButton.forEach((button) => {
  button.addEventListener("click", () => {
    const playerChoice = button.dataset.choice;
    handlePlayerChoice(playerChoice);
  });
});

ui.playAgainButton.addEventListener("click", handlePlayAgain);
resetUI();
