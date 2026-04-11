import { Router } from "express";
import { contactForm } from "../controllers/contactController.js";

const router = Router();

router.post("/", contactForm);

export default router;
