import { Response, Request } from "express";
import Book from "./book.model";
import { formatMongooseError } from "../Error/ValidationError";
import { BookQuery } from "./book.interface";
import { Error as MongooseError } from "mongoose";

const createBook = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const book = new Book(payload);
    const data = await book.save();

    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data,
    });
  } catch (error: unknown) {
    if (error instanceof MongooseError.ValidationError) {
      return res.status(400).json(formatMongooseError(error));
    }

    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

const getBook = async (req: Request, res: Response) => {
  try {
    const { filter, sortBy, sort, limit } = req.query as unknown as BookQuery;

    const query: Record<string, unknown> = {};
    if (filter) {
      query.genre = filter;
    }

    const sortField = Array.isArray(sortBy) ? sortBy[0] : String(sortBy || "createdAt");
    const sortDirection = sort === "desc" ? -1 : 1;
    const limitValue = Number(limit);
    const validLimit = !isNaN(limitValue) && limitValue > 0 ? limitValue : 10;

    const sortOption: Record<string, 1 | -1> = {
      [sortField]: sortDirection,
    };

    const data = await Book.find(query).sort(sortOption).limit(validLimit);

    res.status(200).json({
      success: true,
      message: "Books retrieved successfully",
      data,
    });
  } catch (error: unknown) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch books",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

const getBookbyId = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;

    const data = await Book.findById(bookId);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Book retrieved successfully",
      data,
    });
  } catch (error: unknown) {
    res.status(500).json({
      success: false,
      message: "Failed to fetched book",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

const updateBook = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;
    const updateData = req.body;

    const data = await Book.findByIdAndUpdate(
      bookId,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Book updated successfully",
      data,
    });
  } catch (error: unknown) {
    res.status(500).json({
      success: false,
      message: "Failed to update book",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

const deleteBook = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;

    const data = await Book.findByIdAndDelete(bookId);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Book deleted successfully",
      data,
    });
  } catch (error: unknown) {
    res.status(500).json({
      success: false,
      message: "Failed to delete book",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export { createBook, getBook, deleteBook, getBookbyId, updateBook };
