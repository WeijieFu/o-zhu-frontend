const isClickingMenu = (className) => {
  if (typeof className === "string") {
    // console.log(typeof className)
    return className.includes("menu")
  }
  return false
}
export default isClickingMenu
