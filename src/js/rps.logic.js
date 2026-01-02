// GAME STATE
// Initial variable when game loaded
const CHOICES = ['rock', 'paper', 'scissors'];
const MAX_ROUNDS = 3;

const gameState = {
  roundPlayed: 0,
  playerScore: 0,
  computerScore: 0,
  isGameOver: false,
};

function getComputerChoice() {
  const index = Math.floor(Math.random() * CHOICES.length);
  return CHOICES[index];
}

function determineResult(player, computer) {
  if (player === computer) return 'draw';

  if (
    (player === 'rock' && computer === 'scissors') ||
    (player === 'scissors' && computer === 'paper') ||
    (player === 'paper' && computer === 'rock')
  ) {
    return 'win';
  }

  return 'lose';
}

export function playRound(playerChoice) {
  if (gameState.isGameOver) {
    return;
  }

  const computerChoice = getComputerChoice();
  const result = determineResult(playerChoice, computerChoice);

  gameState.roundPlayed++;
  if (result === 'win') gameState.playerScore++;
  if (result === 'lose') gameState.computerScore++;

  if (gameState.roundPlayed >= MAX_ROUNDS) {
    gameState.isGameOver = true;
  }
  return { playerChoice, computerChoice, result, gameState };
}

export function resetGame() {
  gameState.roundPlayed = 0;
  gameState.playerScore = 0;
  gameState.computerScore = 0;
  gameState.isGameOver = false;
}
