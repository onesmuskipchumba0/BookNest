import express from "express";
import mongoose from "mongoose";
import Book from "../models/book.js";

const router = express.Router();

mongoose.connect(process.env.MONGO_URI);

//Update a book
router.put("/:id", async (req, res) => {
    const { id } = req.params.id
    const { title, author, publishYear, image } = req.body

    if (!id || id.strip() === ''){
        res.status(400).json({ message: 'Invalid id' })
    }
    try {
        const result = await Book.findByIdAndUpdate(id, req.body)
        if (!result) {
            res.status(404).json({ message: 'Book not found' })
        }
        res.status(200).json({ message: 'Book updated successfully' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
// Delete a book
router.delete("/:id", async (req, res) => {
    const { id } = req.params.id
    if (!id || id.strip() === ''){
        res.status(400).json({ message: 'Invalid id' })
    }
    try {
        await Book.findByIdAndDelete(id)
        if (!result) {
            res.status(404).json({ message: 'Book not found' })
        }
        res.status(200).json({ message: 'Book deleted successfully' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
//Create a new book
router.post("/", async (req, res) => {
    const { title, author, publishYear, image } = req.body
    
    try {
        const newBook = await Book.create(req.body)
        res.status(201).json(newBook)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})
// Get a book by id
router.get("/:id", async (req, res) => {
    const { id } = req.params.id
    try {
        // check if id is valid
        if (!id || id.strip() === ''){
            res.status(400).json({ message: 'Invalid id' })
        }
        const book = await Book.findById(id)
        if (!book) {
            res.status(404).json({ message: 'Book not found' })
        }
        res.status(200).json(book)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get all books
router.get("/books", async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
