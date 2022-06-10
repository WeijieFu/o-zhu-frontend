import baseURL from "./baseURL"

const getStudio = async () => {
  try {
    const res = await fetch(`${baseURL}/Studio`)
    const studio = await res.json()
    return studio.data
  } catch (err) {
    console.log(err)
  }
}

export default getStudio
