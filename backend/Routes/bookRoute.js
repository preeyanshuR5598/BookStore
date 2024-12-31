const express = require("express");
const router = express.Router();
const Books = require("../Models/bookModel");

// Route to save a new book
router.post("/", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return req.status(400).send({
        message: "Send all required fields.",
      });
    }
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };
    const book = await Books.create(newBook);
    return res.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({
      message: error.message,
    });
  }
});

// Route to get all the books
router.get("/", async (req, res) => {
  try {
    const books = await Books.find({});
    return res.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({
      message: error.message,
    });
  }
});

// Route to get one book by ID
router.get("/:id", async (req, res) => {
  try {
    const book = await Books.findById(req.params.id);
    return res.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({
      message: error.message,
    });
  }
});

// Route to update a book
router.put("/:id", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message: "Send all required fields.",
      });
    }

    const result = await Books.findByIdAndUpdate(req.params.id, req.body);

    if (!result) {
      return res.status(400).json({
        message: "Book not found.",
      });
    }

    return res.status(200).send({
      message: "Book updated successfully.",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route to delete a book
router.delete('/:id', async (req, res) => {
  try {
    const result = await Books.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({
        message: "Book not found",
      });
    }
    return res.status(200).send({ message: "Book deleted successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({
      message: error.message,
    });
  }
});

module.exports = router;
