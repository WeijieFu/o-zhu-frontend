import baseURL from "./baseURL"

const getTeam = async () => {
  try {
    const res = await fetch(`${baseURL}/team?populate=deep`)
    const team = await res.json()
    return team.data.attributes.Member
  } catch (err) {
    console.log(err)
  }
}

export default getTeam
