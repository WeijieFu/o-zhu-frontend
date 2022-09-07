// import { row, column } from "../Grid/GridSetting"
import useGridState from "../../state/GridState"

//row = 6 ; column = 11

// const cellPosition = [
//   { x: -9, z: -4 },
//   { x: -7, z: -4 },
//   { x: -5, z: -4 },
//   { x: -3, z: -4 },
//   { x: -1, z: -4 },
//   { x: 1, z: -4 },
//   { x: 3, z: -4 },
//   { x: 5, z: -4 },
//   { x: 7, z: -4 },
//   { x: 9, z: -4 },
//   { x: -9, z: -2 },
//   { x: -7, z: -2 },
//   { x: -5, z: -2 },
//   { x: -3, z: -2 },
//   { x: -1, z: -2 },
//   { x: 1, z: -2 },
//   { x: 3, z: -2 },
//   { x: 5, z: -2 },
//   { x: 7, z: -2 },
//   { x: 9, z: -2 },
//   { x: -9, z: 0 },
//   { x: -7, z: 0 },
//   { x: -5, z: 0 },
//   { x: -3, z: 0 },
//   { x: -1, z: 0 },
//   { x: 1, z: 0 },
//   { x: 3, z: 0 },
//   { x: 5, z: 0 },
//   { x: 7, z: 0 },
//   { x: 9, z: 0 },
//   { x: -9, z: 2 },
//   { x: -7, z: 2 },
//   { x: -5, z: 2 },
//   { x: -3, z: 2 },
//   { x: -1, z: 2 },
//   { x: 1, z: 2 },
//   { x: 3, z: 2 },
//   { x: 5, z: 2 },
//   { x: 7, z: 2 },
//   { x: 9, z: 2 },
//   { x: -9, z: 4 },
//   { x: -7, z: 4 },
//   { x: -5, z: 4 },
//   { x: -3, z: 4 },
//   { x: -1, z: 4 },
//   { x: 1, z: 4 },
//   { x: 3, z: 4 },
//   { x: 5, z: 4 },
//   { x: 7, z: 4 },
//   { x: 9, z: 4 },
// ]
const offset = 0 * Math.sqrt(3)
const getCellPosition = (index, length) => {
  const grid = useGridState()
  const row = grid.row
  const column = grid.column

  const pagesCount = Math.ceil(length / ((row - 1) * (column - 1) * 0.5))
  const cellPosition = []
  for (let z = -(row - 2); z <= row * (pagesCount * 2); z += 2) {
    for (let x = -(column - 2); x <= column - 2; x += 2) {
      cellPosition.push({ x, z })
    }
  }
  // console.log(pagesCount, length, cellPosition)
  // console.log(index)
  // console.log(index)
  const cellIndex = index - Math.floor(index / column)

  const position = {
    x: cellPosition[cellIndex].x,
    z: cellPosition[cellIndex].z * 1.8 + offset,
  }

  // console.log(cellPosition, length, row, column, pagesCount)
  return position
}
export default getCellPosition
