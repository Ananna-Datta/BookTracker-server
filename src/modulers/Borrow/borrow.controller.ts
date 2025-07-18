import { Request, Response } from "express";
import Borrow from "./borrow.model";

const borrowBook = async (req: Request, res: Response) => {
  try {
    const { book, quantity, dueDate } = req.body;

    if (!book || !quantity || !dueDate) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    await Borrow.updateBookAvailability(book, quantity);

    const borrowRecord = await Borrow.create({ book, quantity, dueDate });

    res.status(201).json({
      success: true,
      message: "Book borrowed successfully",
      data: borrowRecord,
    });
  } catch (error: unknown) {
    const errMsg = error instanceof Error ? error.message : "Borrowing failed";
    const statusCode = errMsg === "Not enough copies available" || errMsg === "Book not found" ? 400 : 500;

    res.status(statusCode).json({
      success: false,
      message: errMsg,
      error,
    });
  }
};

const getBorrowSummary = async (req: Request, res: Response) => {
  try {
    const summary = await Borrow.aggregate([
      {
        $group: {
          _id: "$book",
          totalQuantity: { $sum: "$quantity" },
        },
      },
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "bookInfo",
        },
      },
      { $unwind: "$bookInfo" },
      {
        $project: {
          _id: 0,
          totalQuantity: 1,
          book: {
            title: "$bookInfo.title",
            isbn: "$bookInfo.isbn",
          },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      message: "Borrowed books summary retrieved successfully",
      data: summary,
    });
  } catch (error: unknown) {
    const errMsg = error instanceof Error ? error.message : "Failed to retrieve summary";

    res.status(500).json({
      success: false,
      message: errMsg,
      error,
    });
  }
};

export { borrowBook, getBorrowSummary };
