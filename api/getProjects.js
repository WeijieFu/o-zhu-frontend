import baseURL from "./baseURL"

const getProjects = async (category) => {
  if (category == "all") {
    try {
      const categories = [
        "exhibition",
        "interior",
        "architecture",
        "urban_design",
        "research_publication",
      ]
      const responseData = []

      categories.forEach(async (category) => {
        const res = await fetch(`${baseURL}/${category}`)
        const resJson = await res.json()
        responseData.push(...resJson.data)
      })

      return responseData
    } catch (err) {
      console.log(err)
    }
  } else {
    try {
      const res = await fetch(`${baseURL}/${category}`)
      const projects = await res.json()
      return projects.data
    } catch (err) {
      console.log(err)
    }
  }
}

export default getProjects
