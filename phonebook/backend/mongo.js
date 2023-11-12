const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Provide arguments')
  process.exit(1)
}

const pass = process.argv[2]
const url = `mongodb+srv://fullstackopen:${pass}@phonebook.e3zetp9.mongodb.net/phonebookApp?retryWrites=true&w=majority`

const mode = process.argv.length === 5 ? 'write' : 'read'

mongoose.set('strictQuery',false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

if (mode === 'read') {
  Person.find({})
    .then((res) => {
      res.forEach((person) => {
        console.log(person)
      })
      mongoose.connection.close()
    })
} else {
  const name = process.argv[3]
  const number = process.argv[4]
  const person = new Person({ name, number })
  person.save()
    .then(() => {
      console.log(`Added ${name} number ${number} to phonebook`)
      mongoose.connection.close()
    })
}