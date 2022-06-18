import baseURL from "./baseURL"

const getProject = async (id) => {
  try {
    const res = await fetch(`${baseURL}/Projects/${id}`)
    const project = await res.json()
    return project.data
  } catch (err) {
    console.log(err)
  }
}

export default getProject
