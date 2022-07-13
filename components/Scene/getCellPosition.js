import { row, column } from "../Grid/GridSetting"
//row = 6 ; column = 11

const cellPosition = []
for (let z = -(row - 2); z <= row - 2; z += 2) {
  for (let x = -(column - 2); x <= column - 2; x += 2) {
    cellPosition.push({ x, z })
  }
}

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
const offset = 0 * 1.414
const getCellPosition = (index) => {
  // console.log(index)
  const cellIndex = index - Math.floor(index / column)

  const position = {
    x: cellPosition[cellIndex].x,
    z: cellPosition[cellIndex].z * 1.414 + offset,
  }
  return position
}
export default getCellPosition
