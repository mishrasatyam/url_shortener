/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get({params}){
    const supabase = locals.db
    const {slug} = params
    const {data,error} = await supabase.from('url_list').select('*').eq('short_slug',slug)
    if(data.length==0){
        return {
            staus:302,
            headers:{
                location:'/'
            }
        }
    }
    return {
        status : 302,
        headers:{
            location:data[0].url
        }
    }
}