import {dev} from '$app/env'
export const host = dev ? 'localhost:3000':import.meta.env.VITE_HOST
export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
export const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY
