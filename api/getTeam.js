import baseURL from "./baseURL"

const getTeam = async () => {
  try {
    const res = await fetch(`${baseURL}/Team`)
    const team = await res.json()
    return team.data
  } catch (err) {
    console.log(err)
  }
}

export default getTeam
