"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bookRoutes_1 = __importDefault(require("../Book/bookRoutes"));
const routes_1 = __importDefault(require("../Borrow/routes"));
const routes = (0, express_1.Router)();
routes.use("/books", bookRoutes_1.default);
routes.use("/borrow", routes_1.default);
exports.default = routes;
