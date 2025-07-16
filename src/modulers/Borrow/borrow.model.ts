import { Schema, model, Model } from "mongoose";
import Book from "../Book/book.model";
import { IBorrow } from "./borrow.interface";

interface IBorrowModel extends Model<IBorrow> {
  updateBookAvailability(bookId: string, quantity: number): Promise<void>;
}

const borrowSchema = new Schema<IBorrow>(
  {
    book: { type: Schema.Types.ObjectId, ref: "Book", required: true },
    quantity: { type: Number, required: true, min: 1 },
    dueDate: { type: Date, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

borrowSchema.statics.updateBookAvailability = async function (
  bookId: string,
  quantity: number
) {
  const book = await Book.findById(bookId);
  if (!book) throw new Error("Book not found");
  if (book.copies < quantity) throw new Error("Not enough copies available");

  book.copies -= quantity;
  if (book.copies === 0) book.available = false;

  await book.save();
};

const Borrow = model<IBorrow, IBorrowModel>("Borrow", borrowSchema);

export default Borrow;
