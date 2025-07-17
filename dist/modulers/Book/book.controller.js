"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBook = exports.getBookbyId = exports.deleteBook = exports.getBook = exports.createBook = void 0;
const book_model_1 = __importDefault(require("./book.model"));
const ValidationError_1 = require("../Error/ValidationError");
const mongoose_1 = require("mongoose");
const createBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = req.body;
        const book = new book_model_1.default(payload);
        const data = yield book.save();
        res.status(201).json({
            success: true,
            message: "Book created successfully",
            data,
        });
    }
    catch (error) {
        if (error instanceof mongoose_1.Error.ValidationError) {
            return res.status(400).json((0, ValidationError_1.formatMongooseError)(error));
        }
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
});
exports.createBook = createBook;
const getBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { filter, sortBy, sort, limit } = req.query;
        const query = {};
        if (filter) {
            query.genre = filter;
        }
        const sortField = Array.isArray(sortBy) ? sortBy[0] : String(sortBy || "createdAt");
        const sortDirection = sort === "desc" ? -1 : 1;
        const limitValue = Number(limit);
        const validLimit = !isNaN(limitValue) && limitValue > 0 ? limitValue : 10;
        const sortOption = {
            [sortField]: sortDirection,
        };
        const data = yield book_model_1.default.find(query).sort(sortOption).limit(validLimit);
        res.status(200).json({
            success: true,
            message: "Books retrieved successfully",
            data,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch books",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
});
exports.getBook = getBook;
const getBookbyId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const data = yield book_model_1.default.findById(bookId);
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
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetched book",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
});
exports.getBookbyId = getBookbyId;
const updateBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const updateData = req.body;
        const data = yield book_model_1.default.findByIdAndUpdate(bookId, updateData, {
            new: true,
            runValidators: true,
        });
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
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update book",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
});
exports.updateBook = updateBook;
const deleteBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const data = yield book_model_1.default.findByIdAndDelete(bookId);
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
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to delete book",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
});
exports.deleteBook = deleteBook;
