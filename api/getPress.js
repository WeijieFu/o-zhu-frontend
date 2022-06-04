import baseURL from "./baseURL"

const getPress = async () => {
  try {
    const res = await fetch(`${baseURL}/Press`)
    const presses = await res.json()
    return presses.data
  } catch (err) {
    console.log(err)
  }
}

export default getPress
