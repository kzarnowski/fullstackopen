const notesRouter = require('express').Router()
const Note = require('../models/note')
const logger = require('../utils/logger')

notesRouter.get('/', (req, res) => {
  Note.find({})
    .then((notes) => {
      logger.info(notes)
      res.json(notes)
    })
})

notesRouter.post('/', (request, response) => {
  const body = request.body

  if (!body.content) {
    return response.status(400).json({
      error: 'content missing'
    })
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
  })

  note.save().then(() => {
    response.json(note)
  })
})

notesRouter.get('/:id', (request, response, next) => {
  Note.findById(request.params.id)
    .then(note => {
      if (note) {
        response.json(note)
      } else {
        response.status(404).end()
      }
    })
    .catch((err) => next(err))
})

notesRouter.put('/:id', (request, response, next) => {
  const note = {
    content: request.body.content,
    important: request.body.important
  }
  Note.findByIdAndUpdate(request.params.id, note, { new: true })
    .then(updatedNote => response.json(updatedNote))
    .catch(err => next(err))
})

notesRouter.delete('/:id', (request, response, next) => {
  Note.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(err => next(err))
})

module.exports = notesRouter