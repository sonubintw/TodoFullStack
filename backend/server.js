const express = require("express")
const app = express()
const mongoose = require("mongoose")
const PORT = 8000
const cors = require("cors")
const uri = "mongodb://127.0.0.1:27017"
const todo = require("./model/todoschema")
const todoRoutes = require("./router")

//middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors({
    origin: "*"
}))
app.use(todoRoutes)

// app.get("/", async (req, res) => {
//     const { id } = req.params
//     const todos = await todo.findById(id)
//     res.send(todos)
// })
//get all
// app.get("/", async (req, res) => {
//     const todos = await todo.findById()
//     res.send(todos)
// })

// app.post("/", (req, res) => {
//     new todo({
//         name: req.body.name
//     }).save()
//     res.json("successfull created")
//     console.log(req.body)
// })

// app.delete("/", async (req, res) => {
//     const { id } = req.params;
//     const todos = await todo.findByIdAndDelete(id)
//     // if (!todos) {
//     //     return res.status(400).send("task id invalid or not found")
//     // }
//     res.send("deleted successfully")

// })

// app.patch("/", async (req, res) => {
//     const { id } = req.params;
//     const filter = { _id: id }
//     const update = {
//         name: req.body.name,
//         completed: req.body.completed--
//     }
//     const todos = await todo.findByIdAndUpdate(filter, update, { new: true })
//     res.status(200).send('updated successfully')

// })

mongoose.connect(uri).then(() => {
    console.log("connected to database")
}).catch(err => {
    console.log(err)
})

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})