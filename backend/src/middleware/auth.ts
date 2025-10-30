import type { Request, Response, NextFunction } from 'express';
import supabase from '../database/supabase.js';

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string | undefined;
    user_metadata: any;
  };
}

export async function authenticateToken(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({ error: 'Token de acesso requerido' });
    }

    // Verificar o token com Supabase
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      return res.status(401).json({ error: 'Token inválido' });
    }

    // Adicionar usuário ao request
    req.user = {
      id: user.id,
      email: user.email,
      user_metadata: user.user_metadata,
    };

    next();
  } catch (error) {
    console.error('Erro na autenticação:', error);
    return res.status(401).json({ error: 'Token inválido' });
  }
}

// Middleware opcional (não bloqueia se não tiver token)
export async function optionalAuth(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (token) {
      const { data: { user }, error } = await supabase.auth.getUser(token);
      
      if (!error && user) {
        req.user = {
          id: user.id,
          email: user.email,
          user_metadata: user.user_metadata,
        };
      }
    }

    next();
  } catch (error) {
    // Se der erro, apenas continue sem usuário autenticado
    next();
  }
}