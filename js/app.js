/*-------------------------------- Constants --------------------------------*/
const winningCombos = [
  [ 0, 1, 2], 
  [ 3, 4, 5], 
  [ 6, 7, 8], 
  [ 0, 3, 6], 
  [ 1, 4, 7], 
  [ 2, 5, 8], 
  [ 0, 4, 8], 
  [ 2, 4, 6] 
]

/*---------------------------- Variables (state) ----------------------------*/
let board, turn, winner;


/*------------------------ Cached Element References ------------------------*/
const messageEl = document.getElementById('message')  
const squareEls = document.querySelectorAll('section > div')
const reset = document.getElementById('reset-btn')


/*----------------------------- Event Listeners -----------------------------*/
squareEls.forEach(function(square) {
  square.addEventListener('click', handleClick)
})

reset.addEventListener('click', resetGame)
/*-------------------------------- Functions --------------------------------*/
init()

function init() {
  board = [null, null, null, null, null, null, null, null, null]
  turn = 1
  winner = null
  render() 
}

function render() {
  board.forEach(function(num, idx) {
    squareEls[idx].textContent = num
    if(board[idx] === 1) {
      squareEls[idx].textContent = 'X'
    } if (board[idx] === -1) {
      squareEls[idx].textContent = 'O'
    } if (board[idx] === null) {
      squareEls[idx].textContent = ''
    }
  })  
  if(!winner) {
    messageEl.textContent = `It's ${turn === 1 ? 'x' : '0'} turn to play.`
  } else if(winner === 'T') {
    messageEl.textContent = `It's a tie!`
  } else {
    messageEl.textContent = `${winner === 1 ? 'Congratulations! Player X has won' : 'Congratulations! Player O has won'}`
  }
}

function handleClick(evt) {
  const sqIdx = parseInt(evt.target.id.replace('sq', ''))
  if(board[sqIdx]) {
    return
  } if(winner) {
    return turn = winner
  }
  board[sqIdx] = turn
  turn *= -1
  winner = getWinner()
  render()
}

function getWinner() {
  let bestCombo = []
  winningCombos.forEach(function(combo){
    let comboValue = board[combo[0]] + board[combo[1]] + board[combo[2]]
    bestCombo.push(Math.abs(comboValue))
  }) 
    let winnersCombo = bestCombo.some(function(value){
      return value === 3
    })
    if (winnersCombo === true) {
      return turn * -1
    } else if (!board.some(function(value){return value === null})){
      return 'T' 
    }
      return null
}

function resetGame() {
  init();
  messageEl.textContent = 'Test Your Tic Tac Toe Skills'
}
