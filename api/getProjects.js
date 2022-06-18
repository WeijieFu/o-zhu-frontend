import baseURL from "./baseURL"

const getProjects = async () => {
  try {
    const res = await fetch(`${baseURL}/Projects`)
    const resJson = await res.json()

    return resJson.data
  } catch (err) {
    console.log(err)
  }
}

export default getProjects
