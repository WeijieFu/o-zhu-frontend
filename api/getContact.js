import baseURL from "./baseURL"

const getContact = async () => {
  try {
    const res = await fetch(`${baseURL}/contact?populate=deep`)
    const contact = await res.json()
    return contact.data.attributes.Contacts
  } catch (err) {
    console.log(err)
  }
}

export default getContact
