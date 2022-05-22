import baseURL from "./baseURL"

const getAward = async () => {
  try {
    const res = await fetch(`${baseURL}/awards?populate=deep`)
    const awards = await res.json()
    return awards.data
  } catch (err) {
    console.log(err)
  }
}

export default getAward
