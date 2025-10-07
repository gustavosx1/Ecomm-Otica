import express from "express";
import { getOculosEscuros, getProdutos } from "../controllers/productController.js";

const router = express.Router();

router.get("/produtos", getProdutos);
router.get("/produtos/oculos-escuros", getOculosEscuros);

export default router;
