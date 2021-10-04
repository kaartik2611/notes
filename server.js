const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require('./models/user')
const app = express();
const dotenv = require("dotenv");
const port = 4000;
dotenv.config()
const log = console.log

// const User = require('./models/user')
// const Todos = require('./models/todo')


app.use(express.json()); //Used to parse JSON bodies
app.use(express.urlencoded({ extended: true })); //Parse URL-encoded bodies
app.use(cors())
const mongo = 'mongodb+srv://kaartik:kaartik@cluster0.rvt1m.mongodb.net/notion-users?retryWrites=true&w=majority'

mongoose.connect(mongo, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(res => console.log('database connected'))
  .catch(err => console.error(err))

app.post("/api/register", async (req, res) => {
  const { username, password: textPassword } = req.body
  if (textPassword.length < 6) {
    return res.send({ status: 'error', error: "Password too Short" })
  }
  const password = await bcrypt.hash(textPassword, 5)
  // console.log(password);
  try {
    const response = await User.create({
      username,
      password
    })
    console.log('user added ' + response);
  } catch (err) {
    if (err.code === 11000) {
      return res.send({ status: 'error', error: 'username already in use' })
    }
    throw err
  }
  res.send({ status: 'ok' })
})

app.post("/api/login", async (req, res) => {
  const { username, password } = req.body
  const user = await User.findOne({ username }).lean()

  if (!user) {
    return res.send({ status: 'error', error: " Invalid username/Password" })
  }

  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ id: user._id, username: user.username }, process.env.jwtSECRET, { expiresIn: '24h' })
    return res.send({ status: 'ok', data: token, user: username })
  }
  res.send({ status: 'error', error: " Invalid username/Password" })
})

const authCheck = (req, res, next) => {
  if (req.headers['authorization']) {
    const token = req.headers['authorization'].split(" ")
    if (token[0] !== 'Bearer') {
      return res.send({ status: 'error', error: 'invalid request' });
    } else {
      req.jwt = jwt.verify(token[1], process.env.jwtSECRET);
      return next();
    }
  }
}

app.post("/api/todos", authCheck, async (req, res) => {
  const todos = req.body
  console.log(todos);
  const { id } = req.jwt
  const user = await User.findByIdAndUpdate(id, { "todos": todos })
})
app.get("/api/todos", authCheck, async (req, res) => {
  const { id } = req.jwt
  const user = await User.findById(id)
  log(user)
  res.send({
    status: "ok", todos: user.todos
  })
})

app.post("/api/notes", authCheck, async (req, res) => {
  const notes = req.body
  console.log(notes);
  const { id } = req.jwt
  const user = await User.findByIdAndUpdate(id, { "notes": notes })
})
app.get("/api/notes", authCheck, async (req, res) => {
  const { id } = req.jwt
  const user = await User.findById(id)
  log(user)
  res.send({
    status: "ok", notes: user.notes
  })
})

app.listen(port, () => {
  console.log(`express app listening at http://localhost:${port}`);
});