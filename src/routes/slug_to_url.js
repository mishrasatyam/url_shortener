/** @type {import('@sveltejs/kit').RequestHandler} */
export async function post({request,locals}){
    const supabase = locals.db
    const body = await request.json()
    const {short_slug} = body
    const {data,error} = await supabase.from('url_list').select('*').eq('short_slug',short_slug)
    if(data.length==0){
        return {
            staus:401,
            body : {
                message : 'URL does not exists!'
            }
        }
    }
    return {
        status : 200,
        body:{
            url:data[0].url,
            short_slug : short_slug
        }
    }
}