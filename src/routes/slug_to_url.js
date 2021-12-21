import { createClient } from '@supabase/supabase-js'
import {SUPABASE_URL, SUPABASE_ANON_KEY} from '$lib/utils'

export async function post({body}){
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
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