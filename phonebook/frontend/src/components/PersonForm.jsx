import { useState } from 'react'
import { addPerson, updatePerson } from '../services/persons'

export default function PersonForm({persons, setPersons, setError}) {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleNameChange = (event) => {
    event.preventDefault()
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    event.preventDefault()
    setNewNumber(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!newName || !newNumber) {
      return
    }
    // if (persons.find(p => p.number === newNumber)) {
    //   alert('Number already exists')
    //   return
    // }
    const newPerson = { name: newName, number: newNumber }
    const p = persons.find(p => p.name === newName)
    if (p) {
      if (window.confirm(`${newName} is already in the phonebook, replace number?`)) {
        newPerson.id = p.id
        updatePerson(newPerson)
          .then(() => {
            setPersons((prevPersons) => [...prevPersons.map(p => p.id !== newPerson.id ? p : newPerson)])
            setNewName('')
            setNewNumber('')
          })
      }
      
      return
    }
    addPerson(newPerson)
      .then((res) => {
        newPerson.id = res.data.id
        setPersons((prevPersons) => [...prevPersons, newPerson])
        setNewName('')
        setNewNumber('')
      })
      .catch((err) => {
        console.log(err)
        setError(err.response.data.error)
        setTimeout(() => setError(''), 3000)
      })
  }

  return (
    <form>
      <div>
        name: <input onChange={handleNameChange} value={newName}/>
      </div>
      <div>
        number: <input onChange={handleNumberChange} value={newNumber}/>
      </div>
      <div>
        <button onClick={handleSubmit} type="submit">add</button>
      </div>
    </form>
  )
}