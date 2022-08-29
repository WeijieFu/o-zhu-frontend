const isClickingMenu = (className) => {
  if (typeof className === "string") {
    return className.includes("menu")
  }
  return false
}
export default isClickingMenu
