import * as userController from "../controllers/user.controller";
import { Router } from "express";

const router: Router = Router();

router.post("/register", userController.register);
router.post("/login", userController.login);

export default router;
