import express from "express"
import dotenv from "dotenv"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.get("/", (request, response) => {
  response.status(201).send({ msg: "Hello" })
})

app.get("/api/users", (request, response) => {
  response.send([
    { id: 1, username: "anson", displayName: "Anson" },
    { id: 1, username: "john", displayName: "John" },
    { id: 1, username: "richard", displayName: "Richard" },
    { id: 1, username: "charles", displayName: "Charles" },
  ])
})

app.get("/api/products", (request, response) => {
  response.send([{ id: 123, name: "chichen breast", price: 12.99 }])
})

app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`)
})
