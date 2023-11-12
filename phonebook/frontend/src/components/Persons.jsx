import { deletePerson } from "../services/persons"

export default function Persons({persons, setPersons}) {
  const handleDelete = (person) => {
    deletePerson(person)
      .then(() => setPersons([...persons].filter(p => p.id !== person.id)))
      .catch((err) => console.log(err))
  }

  return (
    <ul>
      {persons.map((p) => (
        <li key={p.id}>
          {p.name} : {p.number}
          <button onClick={() => handleDelete(p)}>delete</button>
        </li>
      ))}
    </ul>
  )
}