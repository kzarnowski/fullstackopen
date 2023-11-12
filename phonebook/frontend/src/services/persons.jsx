import axios from 'axios'
const baseUrl = '/api/persons'

export const getPersons = () => {
  return axios.get(baseUrl)
}

export const addPerson = (person) => {
  return axios.post(baseUrl, person)
}

export const deletePerson = (person) => {
  return axios.delete(baseUrl + `/${person.id}`)
}

export const updatePerson = (person) => {
  return axios.put(baseUrl + `/${person.id}`, person)
}