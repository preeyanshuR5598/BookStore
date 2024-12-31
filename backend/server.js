const express = require("express")
const dotenv = require("dotenv").config()
const cors = require("cors")
const connectDB = require("./Config/db")
const booksRoute = require("./Routes/bookRoute")

const port = process.env.PORT || 8000

connectDB()

const app = express()

app.use(express.json())
app.use(cors())
app.use("/books", booksRoute)

app.listen(port, () => {
    try {
        console.log(`Server connected at port ${port}.`)
    } catch (error) {
        console.log(`Error occured while connection to server: ${error.message}`)
    }
})
