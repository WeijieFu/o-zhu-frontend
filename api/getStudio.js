import baseURL from "./baseURL"

const getStudio = async () => {
  try {
    const res = await fetch(
      `${baseURL}/Studio`
      // {
      //   method: "GET",
      //   mode: "no-cors",
      // }
    )
    const studio = await res.json()
    console.log(studio.data)
    return studio.data
  } catch (err) {
    console.log(err)
  }
}

export default getStudio
