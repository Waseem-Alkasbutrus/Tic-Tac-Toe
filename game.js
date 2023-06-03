const marks = [
  { name: 'x', icon: 'assets/markX.svg', colorName: 'red' },
  { name: 'o', icon: 'assets/markO.svg', colorName: 'blue' },
]

const boardCells = document.querySelectorAll('.board__cell')
const turnIndicator = document.querySelector('.turn-indicator__mark')
const gameOverModal = document.querySelector('.modal--game-over')

let turnNumber = 0

const checkForWinner = () => {
  for (let row = 0; row < 3; row++) {
    // const marker = boardCells[row].classList.contains('board__cell--x')
    let isALine = true

    for (let col = 0; col < 3; col++) {
      // TODO
    }
  }
}

const getMarkIcon = (markIndex) => {
  return `<img src=${marks[markIndex].icon} alt="Taken Cell, ${marks[markIndex].name}" class="mark icon--${marks[markIndex].name}" />`
}

const handlePlaceMark = (e) => {
  const cell = e.target

  cell.classList.add(`board__cell--${marks[turnNumber % 2].colorName}`)
  cell.innerHTML = getMarkIcon(turnNumber % 2)

  turnIndicator.classList.replace(
    `turn-indicator__mark--${marks[turnNumber % 2].name}`,
    `turn-indicator__mark--${marks[(turnNumber + 1) % 2].name}`,
  )
  turnIndicator.innerHTML = `${marks[
    (turnNumber + 1) % 2
  ].name.toUpperCase()}'s`

  turnNumber++

  cell.removeEventListener('click', handlePlaceMark)
}

const resetCell = (cell) => {
  cell.innerHTML = ''
  cell.classList.remove('board__cell--red', 'board__cell--blue')

  cell.addEventListener('click', handlePlaceMark)
}

const handleResetBoard = () => {
  boardCells.forEach((cell) => resetCell(cell))

  turnNumber = 0

  turnIndicator.classList.replace(
    'turn-indicator__mark--o',
    'turn-indicator__mark--x',
  )
  turnIndicator.innerHTML = "X's"

  gameOverModal.showModal()
}

const closeModal = () => gameOverModal.close()

boardCells.forEach((cell) => {
  cell.addEventListener('click', handlePlaceMark)
})
