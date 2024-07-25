import express from "express"
import dotenv from "dotenv"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`)
})
