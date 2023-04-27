const express = require("express")
const todo = require("./model/todoschema")
const router = express.Router()

//getTask by id
router.get("/find/:id", async (req, res) => {
    const { id } = req.params
    // todo.findById(id).then((data) => {
    //     res.json(data)
    // }).catch(err => {
    //     res.json(err)
    // })
    try {
        const task = await todo.findById(id)

        res.status(200).json(task)
    }
    catch (err) {
        res.json(err)
    }

})

router.get("/getall", async (req, res) => {
    const task = await todo.find()
    res.json(task)

})

//post data
router.post("/sendData", (req, res) => {
    new todo({
        name: req.body.name
    }).save()
    res.json("successfull created")
    console.log(req.body)
})


//delete data
router.delete("/deletData/:id", async (req, res) => {
    const { id } = req.params;
    const todos = await todo.findByIdAndDelete(id)
    // if (!todos) {
    //     return res.status(400).send("task id invalid or not found")
    // }
    res.send("deleted successfully")
})

//update data

router.patch("/update/:id", async (req, res) => {
    const { id } = req.params;
    const filter = { _id: id }
    const update = {
        name: req.body.name,
        completed: req.body.completed
    }
    const todos = await todo.findByIdAndUpdate(filter, update, { new: true })
    res.status(200).send('updated successfully')

})



module.exports = router
