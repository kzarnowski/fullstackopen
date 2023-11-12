const mongoose = require('mongoose')

mongoose.set('strictQuery', false)
mongoose.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})
mongoose.connect(process.env.DB_URL)

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

module.exports = mongoose.model('Person', personSchema)
