<script context="module">
    export async function load({params, fetch}){
        const url = '/slug_to_url'
        const method = 'POST'
        const headers = {'content-type':'application/json'}
        const body = JSON.stringify({short_slug: params.slug})
        const res = await fetch(url,{method,body,headers})
        const data = await res.json()
        console.log(data,res.status)
        if(res.status==401){
            return {
                props:{
                    message : data.message
                }
            }
        }
        return {
            status:302,
            redirect : data.url
        }
    }
</script>
<script>
    export let message
    console.log(message)
</script>

<div class="mx-auto">
        <div class="shadow-lg rounded-lg p-4 text-center mx-10">
            <h3 class="p-4 font-semibold text-gray-200">{message}</h3>
        </div>
</div>

