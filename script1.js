const boxes = document.querySelectorAll('[data-cell]');
const statustext = document.querySelector('.status');
const restartButton = document.getElementById('restartButton');
let currentplayer = 'X';
let active = true;

const winningcombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function updateStatusText() {
     statustext.textContent = `Player ${currentplayer}'s Turn`;
     statustext.style.color = currentplayer === 'X' ? '#ff7043' : '#a43484';
   }

function checkWin() {
  return winningcombinations.some(combination => {
    return combination.every(index => {
      return boxes[index].textContent === currentplayer;
    });
  });
}

function checkDraw() {
  return [...boxes].every(box => box.textContent !== '');
}

function handleClick(e) {
  const box = e.target;
  if (box.textContent || !active) return;

  box.textContent = currentplayer;
  box.classList.add('taken', 'grow'); 
  setTimeout(() => box.classList.remove('grow'), 200); 

  if (checkWin()) {
    statustext.textContent = `${currentplayer} Wins!`;
    active = false;
  } else if (checkDraw()) {
    statustext.textContent = `It's a Draw!`;
    active = false;
  } else {
    currentplayer = currentplayer === 'X' ? 'O' : 'X';
    updateStatusText();
  }
}

function restartGame() {
  currentplayer = 'X';
  active = true;
  updateStatusText();
  boxes.forEach(box => {
    box.textContent = '';
    box.classList.remove('taken');
  });
}

boxes.forEach(box => box.addEventListener('click', handleClick));
restartButton.addEventListener('click', restartGame);
updateStatusText();
