import baseURL from "./baseURL"

const getContact = async () => {
  try {
    const res = await fetch(`${baseURL}/Contact`)
    const contact = await res.json()
    return contact.data
  } catch (err) {
    console.log(err)
  }
}

export default getContact
