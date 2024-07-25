import express from "express"
import dotenv from "dotenv"

dotenv.config()

const app = express()
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
    query: { filter, value },
  } = request

  console.log(filter, value)

  if (filter && value) {
    return response.send(
      mockUsers.filter((user) => user[filter].includes(value))
    )
  }

  return response.send(mockUsers)
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

app.get("/api/products", (request, response) => {
  response.send([{ id: 123, name: "chichen breast", price: 12.99 }])
})

app.listen(PORT)
