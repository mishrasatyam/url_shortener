import { createClient } from '@supabase/supabase-js'
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
console.log(1)
/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
	const {locals} = event 
	// console.log(locals.user)
	locals.db = supabase
	const response = await resolve(event)
	return response;
}