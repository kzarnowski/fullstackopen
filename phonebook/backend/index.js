const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()
const Person = require('./models/person')

const app = express()
app.use(express.json())
app.use(express.static('dist'))
app.use(cors())

morgan.token('body', function (req) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get('/api/persons', (req, res, next) => {
  Person.find({})
    .then((persons) => res.json(persons))
    .catch(err => next(err))
})

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => res.status(200).send(person))
    .catch(err => next(err))
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then(() => res.status(204).end())
    .catch(err => next(err))
})

app.post('/api/persons', (req, res, next) => {
  if (!req.body.name || !req.body.number) {
    return res.status(400).json({ erorr: 'Name or number missing' })
  }
  if (req.body.name.length < 3) {
    return res.status(400).json({ error: `Name ${req.body.name} to short. Min 3 characters.` })
  }
  Person.find({})
    .then((persons) => {
      // eslint-disable-next-line eqeqeq
      if (persons.find(p => p.number == req.body.number)) {
        return res.status(400).json({ error: 'Number already exists' })
      }
      const existingPerson = persons.find(p => p.name === req.body.name)
      if (existingPerson) {
        // update number
        console.log('updating person')
        const person = {
          name: req.body.name,
          number: req.body.number
        }
        Person.findByIdAndUpdate(existingPerson.id, person, { new: true })
          .then(updatedPerson => {
            res.status(200).json(updatedPerson).end()
          })
          .catch(err => next(err))
      } else {
        // create new person
        console.log('creating new person')
        const person = new Person({
          name: req.body.name,
          number: req.body.number
        })
        person.save()
          .then(() => res.status(201).json(person))
          .catch(err => next(err))
      }
    })
    .catch(err => next(err))
})

app.put('/api/persons/:id', (req, res, next) => {
  if (!req.body.name || !req.body.number) {
    return res.status(400).json({ erorr: 'Name or number missing' })
  }
  if (req.body.name.length < 3) {
    return res.status(400).json({ error: `Name ${req.body.name} to short. Min 3 characters.` })
  }
  const person = {
    name: req.body.name,
    number: req.body.number
  }
  Person.find({})
    .then((persons) => {
      // eslint-disable-next-line eqeqeq
      if (persons.find(p => p.number == req.body.number)) {
        return res.status(400).json({ error: 'Number already exists' })
      }
    })
    .catch(err => next(err))

  Person.findByIdAndUpdate(req.params.id, person, { new: true })
    .then(updatedPerson => {
      res.status(200).json(updatedPerson).end()
    })
    .catch(err => next(err))
})

const errorHandler = (error, request, response, next) => {
  console.log(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformed ID' })
  }
  next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

