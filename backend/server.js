import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import booksRouter from "./routes/books.js";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/books", booksRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on  http://localhost:${PORT}`);
});
