import {randomUUID as uuid} from 'crypto'
import { createClient } from '@supabase/supabase-js'
import {SUPABASE_URL, SUPABASE_ANON_KEY} from '$lib/utils'


export async function post({body}){
    // Initialize the JS client
    
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
    // Make a request
    let url_exists = false
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