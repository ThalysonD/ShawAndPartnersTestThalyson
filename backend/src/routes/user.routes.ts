import { Router } from "express";
import { userController } from "../controllers/user.controller";
import asyncHandler from "../utils/asyncHandler";

const userRoutes = Router();

userRoutes.get("/", asyncHandler(userController.searchUsers));
userRoutes.delete("/delete", asyncHandler(userController.deleteAllUsers));

export default userRoutes;
