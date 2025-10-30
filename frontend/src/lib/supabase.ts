import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types para TypeScript baseados no schema criado
export type User = {
  id: string
  email?: string
  user_metadata?: {
    full_name?: string
  }
  created_at: string
}

export type AuthError = {
  message: string
  status?: number
}

export type Product = {
  id: string
  name: string
  slug: string
  description: string
  price: number
  sale_price?: number
  stock_quantity: number
  category_id: string
  brand?: string
  gender?: 'masculino' | 'feminino' | 'unissex' | 'infantil'
  frame_material?: string
  lens_type?: string
  frame_color?: string
  lens_color?: string
  featured_image?: string
  is_active: boolean
  is_featured: boolean
  created_at: string
  updated_at: string
  categories?: {
    name: string
    slug: string
  }
}

export type Category = {
  id: string
  name: string
  slug: string
  description?: string
  parent_id?: string
  is_active: boolean
  display_order: number
}