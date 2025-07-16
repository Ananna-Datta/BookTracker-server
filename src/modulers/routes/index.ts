import { Router } from "express";
import bookRoute from "../Book/bookRoutes";
import borrowRoute from "../Borrow/routes";

const routes= Router();

routes.use("/books",bookRoute)
routes.use("/borrow",borrowRoute)

export default routes