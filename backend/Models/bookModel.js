const mongoose = require("mongoose")

const booksSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    publishYear: {
        type: Number,
        reuired: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Books", booksSchema)