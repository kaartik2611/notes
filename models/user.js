const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const todoSchema = new Schema({
  key: {
    type: Number,
    required: true
  },
  todo: {
    type: String,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  }
})

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  todos: [todoSchema]
},
  { timestamps: true },
  { collection: 'users' }
)
const model = mongoose.model('UserData', userSchema);

module.exports = model;