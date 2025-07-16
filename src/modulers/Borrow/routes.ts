import { Router } from "express";
import { borrowBook, getBorrowSummary } from "./borrow.controller";

const borrowRoute = Router();

borrowRoute.post("/", borrowBook);
borrowRoute.get("/", getBorrowSummary);

export default borrowRoute;