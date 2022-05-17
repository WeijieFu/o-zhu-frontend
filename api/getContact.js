import baseURL from "./baseURL"

const getContact = async () => {
  const res = await fetch(`${baseURL}/contact?populate=deep`)
  const contact = await res.json()
  return contact.data.attributes.Contacts
}

export default getContact
