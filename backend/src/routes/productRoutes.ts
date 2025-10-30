import express from "express";
import { 
  getProducts, 
  getProductById, 
  getProductsByCategory,
  createProduct,
  updateProduct,
  deleteProduct
} from "../controllers/productController.js";
import { authenticateToken, optionalAuth } from "../middleware/auth.js";

const router = express.Router();

// Rotas públicas
router.get("/", optionalAuth, getProducts);
router.get("/:id", optionalAuth, getProductById);
router.get("/category/:category", optionalAuth, getProductsByCategory);

// Rotas protegidas (apenas admin)
router.post("/", authenticateToken, createProduct);
router.put("/:id", authenticateToken, updateProduct);
router.delete("/:id", authenticateToken, deleteProduct);

export default router;
