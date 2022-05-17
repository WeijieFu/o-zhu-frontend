import baseURL from "./baseURL"

const getTeam = async () => {
  const res = await fetch(`${baseURL}/team?populate=deep`)
  const team = await res.json()
  return team.data.attributes.Member
}

export default getTeam
