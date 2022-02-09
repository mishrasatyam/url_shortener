import {randomUUID as uuid} from 'crypto'

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function post({request,locals}){
    const supabase = locals.db
    // Make a request
    let url_exists = false
    const body = await request.json()
    const {url} = body
    const {data,error} = await supabase.from('url_list').select('*').eq('url',url)
    let random_slug
    if(data.length==0){
        let unique=false
        while(!unique){
            random_slug = uuid().slice(0,4)
            const {count} = await supabase.from('url_list').select('*').eq('short_slug',random_slug)
            if(count==null){
                unique = true
                await supabase.from('url_list').insert([{ url, short_slug:random_slug }])
            }
        }   
    }else{
        url_exists = true
    }
    if(url_exists){
        return {
            status : 200,
            body:{
                url,
                short_slug : data[0].short_slug
            }
        }
    }
    return {
        status : 201,
        body:{
            url,
            short_slug : random_slug
        }
    }
}