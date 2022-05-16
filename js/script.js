swal('How to use?', `1. Start: fill all the cells
  2. Solution: To solve, click on "Enter" button
  3. To reset, click on "r" button`)

const sudoku = document.querySelector('#sudoku')
for (let i = 0; i < 81; i++) sudoku.appendChild(document.createElement('input'))
const inputs = Array.from(document.querySelectorAll('input'))
for (elem of inputs) elem.type = 'number'

document.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    const inputValues = [
      inputs.slice(0, 9),
      inputs.slice(9, 18),
      inputs.slice(18, 27),
      inputs.slice(27, 36),
      inputs.slice(36, 45),
      inputs.slice(45, 54),
      inputs.slice(54, 63),
      inputs.slice(63, 72),
      inputs.slice(72, 81)
    ]

    for (let i = 0; i < inputValues.length; i++) {
      for (let j = 0; j < inputValues[i].length; j++) inputValues[i][j] = inputValues[i][j].value
    }

    const solveSudoku = function (board) {
      const isValid = (row, col, num) => {
        for (let i = 0; i < 9; i++) {
          const boxRow = (parseInt(row / 3) * 3) + parseInt(i / 3)
          const boxCol = (parseInt(col / 3) * 3) + i % 3
          if (board[row][i] == num || board[i][col] == num || board[boxRow][boxCol] == num) return false
        }
        return true
      }

      const solve = () => {
        for (let i = 0; i < 9; i++) {
          for (let j = 0; j < 9; j++) {
            if (board[i][j] == '') {
              for (let num = 1; num < 10; num++) {
                if (isValid(i, j, num)) {
                  board[i][j] = String(num)
                  if (solve(board)) return true
                  board[i][j] = ''
                }
              }
              return false
            }
          }
        }
        return true
      }

      solve(board)
      return board
    }

    const solved = solveSudoku(inputValues)

    let currentElementIndex = 0
    solved.forEach(item => {
      item.forEach(elem => {
        inputs[currentElementIndex].value = elem
        currentElementIndex++
      })
    })
  }

  if (event.key === 'R' || event.key === 'r') for (elem of inputs) elem.value = ''
})