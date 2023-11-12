import { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Search from './components/Search'
import Persons from './components/Persons'
import { getPersons } from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [search, setSearch] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    getPersons()
      .then((res) => {
        if (res.data.length > 0) {
          setPersons(res.data)
        }
      })
      .catch((err) => console.log(err))
  }, [])

  const personsToShow = search
    ? persons.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
    : persons

  return (
    <div>
      {error && <div>Error: {error}</div>}
      <h2>Phonebook</h2>
      <Search search={search} setSearch={setSearch} />
      <h2>Add new person</h2>
      <PersonForm persons={persons} setPersons={setPersons} setError={setError}/>
      <h2>Numbers</h2>
      <Persons persons={personsToShow} setPersons={setPersons}/>
    </div>
  )
}

export default App
