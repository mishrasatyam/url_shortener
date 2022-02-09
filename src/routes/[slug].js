/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get({params,locals}){
    const db = locals.db
    const {slug} = params
    const {data,error} = await supabase.from('url_list').select('*').eq('short_slug',slug)
    return {
        status : 302,
        headers:{
            location: data.length?data[0].url:'/'
        }
    }
}