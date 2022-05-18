import baseURL from "./baseURL"

const getStudio = async () => {
  try {
    const res = await fetch(`${baseURL}/studio?populate=deep`)
    const studio = await res.json()
    return studio.data.attributes.Locations
  } catch (err) {
    console.log(err)
  }
}

export default getStudio
