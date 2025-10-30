import { Router } from 'express';
import { 
  getCategories, 
  getCategoryById, 
  getCategoryBySlug 
} from '../controllers/categoryController.js';
import { optionalAuth } from '../middleware/auth.js';

const router = Router();

// Rotas públicas para categorias
router.get('/', optionalAuth, getCategories);
router.get('/id/:id', optionalAuth, getCategoryById);
router.get('/slug/:slug', optionalAuth, getCategoryBySlug);

export default router;