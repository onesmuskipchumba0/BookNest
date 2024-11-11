import express from "express";
import mongoose from "mongoose";
import Book from "../models/book.js";
import dotenv from "dotenv"

dotenv.config();

const router = express.Router();


mongoose.connect(process.env.MONGO_URI);

// query by title
router.get("/search", async (req, res) => {
    const { q } = req.query;
    if (!q || q.trim() === ''){
        res.status(400).json({ message: 'Invalid search term' })
    }
    try {
        const books = await Book.find({ title: { $regex: q, $options: 'i' } });
        if (!books) {
            res.status(404).json({ message: 'No books found' })
        }
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
//Update a book
router.put("/:id", async (req, res) => {
    const { id } = req.params
    const { title, author, publishYear, image } = req.body

    if (!id || id.trim() === ''){
        return res.status(400).json({ message: 'Invalid id' })
    }
    try {
        const result = await Book.findByIdAndUpdate(id, req.body)
        if (!result) {
            return res.status(404).json({ message: 'Book not found' })
        }
        return res.status(200).json({ message: 'Book updated successfully' })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
})
// Delete a book
router.delete("/:id", async (req, res) => {
    const { id } = req.params
    if (!id || id.trim() === ''){
        return res.status(400).json({ message: 'Invalid id' })
    }
    try {
        const result = await Book.findByIdAndDelete(id)
        if (!result) {
            return res.status(404).json({ message: 'Book not found' })
        }
        return res.status(200).json({ message: 'Book deleted successfully' })
    } catch (error) {
        return res.status(500).json({ message: error.message })
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
    const { id } = req.params
    try {
        
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
router.get("/", async (req, res) => {
  try {
    const books = await Book.find();

    if (!books) {
      res.status(404).json({ message: 'No books found' })
    }
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
