import {randomUUID as uuid} from 'crypto'

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function post({request,locals}){
    const {db} = locals
    const collection = 'url_list'
    const body = await request.json()
    const {url} = body
    const result = await db.collection(collection).findOne({url})
    if(result){
        return {
            status : 200,
            body:{
                url,
                slug : result.slug
            }
        }        
    }
    while(true){
        let slug = uuid().slice(0,4)
        const result = await db.collection(collection).findOne({slug})
        if(!result){
            await db.collection(collection).insertOne({url,slug})
            return {
                status : 200,
                body : {
                    url,
                    slug
                }
            }
        }
    }    
}