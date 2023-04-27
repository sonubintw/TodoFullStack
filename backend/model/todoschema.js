const mongoose = require("mongoose")
const { Schema, model } = mongoose

const todoSchema = new Schema(
    {
        name: {
            type: String,
            require: [true, "please add a task"]
        },
        completed: {
            type: Boolean,
            require: true,
            default: false,
        }
    },
    {
        timestamps: true
    }

)

const todo = model("todoTask", todoSchema)
module.exports = todo