const marks = [
  { name: 'x', icon: 'assets/markX.svg', colorName: 'red' },
  { name: 'o', icon: 'assets/markO.svg', colorName: 'blue' },
]

const boardCells = document.querySelectorAll('.board__cell')
const turnIndicator = document.querySelector('.turn-indicator__mark')

let turnNumber = 0

const getMarkIcon = (markIndex) => {
  return `<img src=${marks[markIndex].icon} alt="Taken Cell, ${marks[markIndex].name}" class="mark icon--${marks[markIndex].name}" />`
}

const handlePlaceMark = (e) => {
  const cell = e.target

  cell.classList.add(`board__cell--${marks[turnNumber % 2].colorName}`)
  cell.innerHTML = getMarkIcon(turnNumber % 2)
  turnIndicator.classList.remove(
    `turn-indicator__mark--${marks[turnNumber % 2].name}`,
  )

  turnIndicator.classList.add(
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

  turnIndicator.classList.remove('turn-indicator__mark--o')
  turnIndicator.classList.add('turn-indicator__mark--x')
}

boardCells.forEach((cell) => {
  cell.addEventListener('click', handlePlaceMark)
})
