/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get({params,locals}){
    const {db} = locals
    const {slug} = params
    const collection = 'url_list'
    const result = await db.collection(collection).findOne({slug})
    return {
        status : 302,
        headers:{
            location: result?result.url:'/'
        }
    }
}