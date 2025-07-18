import { Router } from "express";
import { createBook, deleteBook, getBook, getBookbyId, updateBook } from "./book.controller";

const bookRoute = Router();

bookRoute.put("/:bookId", updateBook);
bookRoute.get("/:bookId", getBookbyId);
bookRoute.delete("/:bookId", deleteBook);
bookRoute.post("/", createBook); 
bookRoute.get("/", getBook); 

export default bookRoute;
