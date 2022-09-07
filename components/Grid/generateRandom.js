const generateRandom = (pagesCount, count, row, column, length) => {
  // 2. 66, 6, 11, 59
  const nums = []
  const elementOnOnePage = ((row - 1) * (column - 1)) / 2

  // while (nums.length < count) {
  //   const num = Math.floor(Math.random() * range)
  //   if (nums.indexOf(num) < 0) {
  //     if (num < (row - 1) * column && num % column !== column - 1) {
  //       nums.push(num)
  //     }
  //   }
  // }

  while (nums.length < length) {
    const num =
      Math.floor(Math.random() * count) +
      Math.floor(nums.length / elementOnOnePage) * count

    if (nums.indexOf(num) < 0) {
      if (
        num % column !== column - 1 &&
        num < (pagesCount * row - 1) * column
      ) {
        nums.push(num)
      }
    }
  }
  console.log(nums, column)
  return nums
}

export default generateRandom
