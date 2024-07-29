import express from "express"
import dotenv, { parse } from "dotenv"

dotenv.config()

const app = express()

app.use(express.json())

const PORT = process.env.PORT || 3000

const mockUsers = [
  { id: 1, username: "anson", displayName: "Anson" },
  { id: 2, username: "john", displayName: "John" },
  { id: 3, username: "richard", displayName: "Richard" },
  { id: 4, username: "charles", displayName: "Charles" },
]

app.get("/", (request, response) => {
  response.status(201).send({ msg: "Hello" })
})

app.get("/api/users", (request, response) => {
  const {
    query: { name },
  } = request

  if (name) {
    return response.send(
      mockUsers.filter((user) => user.username.includes(name))
    )
  }

  return response.send(mockUsers)
})

app.post("/api/users", (request, response) => {
  const { body } = request
  const newUser = { id: mockUsers[mockUsers.length - 1].id + 1, ...body }
  mockUsers.push(newUser)
  return response.status(201).send(newUser)
})

app.get("/api/users/:id", (request, response) => {
  const userId = parseInt(request.params.id, 10)

  if (isNaN(userId)) {
    return response.status(400).json({ msg: "Bad Request. Invalid user ID." })
  }

  const user = mockUsers.find((user) => user.id === userId)

  if (!user) {
    return response.status(404).json({ msg: "User not found." })
  }

  return response.json(user)
})

app.put("/api/users/:id", (request, response) => {
  const {
    body,
    params: { id },
  } = request

  const parsedId = parseInt(id)
  if (isNaN(parsedId)) return response.sendStatus(400)

  const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId)

  if (findUserIndex === -1) return response.sendStatus(400)

  mockUsers[findUserIndex] = { id: parsedId, ...body }

  return response.sendStatus(200)
})

app.patch("/api/users/:id", (request, response) => {
  const {
    body,
    params: { id },
  } = request

  const parsedId = parseInt(id)

  if (isNaN(parsedId)) return response.sendStatus(400)

  const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId)

  if (findUserIndex === -1) return response.sendStatus(404)

  mockUsers[findUserIndex] = { ...mockUsers[findUserIndex], ...body }
  return response.sendStatus(200)
})

app.get("/api/products", (request, response) => {
  response.send([{ id: 123, name: "chichen breast", price: 12.99 }])
})

app.listen(PORT)
