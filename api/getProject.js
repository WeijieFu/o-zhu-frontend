import baseURL from "./baseURL"

const getProject = async (category, id) => {
  try {
    const res = await fetch(`${baseURL}/${category}/${id}`)
    const project = await res.json()
    return project.data
  } catch (err) {
    console.log(err)
  }
}

export default getProject
