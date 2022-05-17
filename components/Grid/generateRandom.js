const generateRandom = (range, row, column, count) => {
  const nums = []

  while (nums.length < count) {
    const num = Math.floor(Math.random() * range)
    if (nums.indexOf(num) < 0) {
      if (num < (row - 1) * column && num % column !== column - 1) {
        nums.push(num)
      }
    }
  }
  return nums
}

export default generateRandom
