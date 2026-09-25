import { Router } from "express";
import { getUserById, createUser, updateUser } from "../controller/user.controller.js";

const router = Router();

router.get("/users/:id", getUserById);
router.post("/users", createUser);
router.put("/users/:id", updateUser);

export default router;
