const NUM_OF_MARKS = 2
const MARKS = [
  { name: 'x', icon: 'assets/markX.svg', colorName: 'red' },
  { name: 'o', icon: 'assets/markO.svg', colorName: 'blue' },
]

const GAME_BOARD = document.querySelectorAll('.board__cell')
const TURN_INDICATOR = document.querySelector('.turn-indicator__mark')
const GAMEOVER_MODAL = document.querySelector('.modal--game-over')

let turnNumber = 0

const checkForWinner = () => {
  return areRowsAndColsWinners() || areDiagonalsWinners()
}

const areRowsAndColsWinners = () => {
  for (let i = 0; i < 3; i++) {
    if (isRowAWinner(i * 3) || isColAWinner(i)) {
      return true
    }
  }

  return false
}

const isRowAWinner = (row) => {
  const firstCell = getCellMark(row)
  const secondCell = getCellMark(row + 1)
  const thirdCell = getCellMark(row + 2)

  return areCellsEqualAndNotBlank(firstCell, secondCell, thirdCell)
}

const isColAWinner = (col) => {
  const firstCell = getCellMark(col)
  const secondCell = getCellMark(col + 3)
  const thirdCell = getCellMark(col + 6)

  return areCellsEqualAndNotBlank(firstCell, secondCell, thirdCell)
}

const areDiagonalsWinners = () => {
  const centerCell = getCellMark(4)

  const topLeftCell = getCellMark(0)
  const bottomRightCell = getCellMark(8)

  const topRightCell = getCellMark(2)
  const bottomLeftCell = getCellMark(6)

  return (
    areCellsEqualAndNotBlank(topLeftCell, centerCell, bottomRightCell) ||
    areCellsEqualAndNotBlank(bottomLeftCell, centerCell, topRightCell)
  )
}

const areCellsEqualAndNotBlank = (string1, string2, string3) =>
  string1 !== 'blank' && string1 === string2 && string2 === string3

const getCellMark = (index) => GAME_BOARD[index].getAttribute('data-mark')

const getCurrentMark = () => MARKS[turnNumber % 2]
const getNextMark = () => MARKS[(turnNumber + 1) % 2]

const getMarkIcon = (markIndex) => {
  return `<img src=${MARKS[markIndex].icon} alt="Taken Cell, ${MARKS[markIndex].name}" class="mark icon--${MARKS[markIndex].name}" />`
}

const handlePlaceMark = (e) => {
  const cell = e.target

  updateCell(cell)
  updateTurnIndicator()

  if (checkForWinner()) {
    GAMEOVER_MODAL.showModal()
  }

  turnNumber++

  cell.removeEventListener('click', handlePlaceMark)
}

const updateCell = (cell) => {
  cell.setAttribute('data-mark', getCurrentMark().name)
  cell.classList.add(`board__cell--${getCurrentMark().colorName}`)
  cell.innerHTML = getMarkIcon(turnNumber % 2)
}

const updateTurnIndicator = () => {
  TURN_INDICATOR.classList.replace(
    `turn-indicator__mark--${getCurrentMark().name}`,
    `turn-indicator__mark--${getNextMark().name}`,
  )
  TURN_INDICATOR.innerHTML = `${MARKS[
    (turnNumber + 1) % 2
  ].name.toUpperCase()}'s`
}

const resetCell = (cell) => {
  cell.innerHTML = ''
  cell.classList.remove('board__cell--red', 'board__cell--blue')
  cell.setAttribute('data-mark', 'blank')

  cell.addEventListener('click', handlePlaceMark)
}

const handleResetBoard = () => {
  GAME_BOARD.forEach((cell) => resetCell(cell))

  TURN_INDICATOR.classList.replace(
    'turn-indicator__mark--o',
    'turn-indicator__mark--x',
  )
  TURN_INDICATOR.innerHTML = "X's"

  GAMEOVER_MODAL.close()
  turnNumber = 0
}

GAME_BOARD.forEach((cell) => {
  cell.addEventListener('click', handlePlaceMark)
  cell.setAttribute('data-mark', 'blank')
})
