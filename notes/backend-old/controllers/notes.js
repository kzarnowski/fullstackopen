const notesRouter = require('express').Router()
const Note = require('../models/note')

notesRouter.get('/', async (req, res, next) => {
  try {
    const notes = await Note.find({})
    res.json(notes)
  } catch(exception) {
    next(exception)
  }
})

notesRouter.post('/', async (request, response, next) => {
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

  try {
    const newNote = await note.save()
    response.status(201).json(newNote)
  } catch (exception) {
    next(exception)
  }
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