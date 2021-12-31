<script>
    import {page} from '$app/stores'
    import CopyIcon from '$lib/Copy_icon.svelte'
    let full_url,message
    let form_submitted = false
    async function handleSubmit(){
        form_submitted = true
        message = undefined
        const url = '/short_url'
        const method = 'POST'
        const headers = {'content-type':'application/json'}
        const body = JSON.stringify({url:full_url})
        const res = await fetch(url,{method,body,headers})
        const data = await res.json()
        message = {short_url:`${$page.host}/${data.short_slug}` , full_url:`${full_url}`}
        form_submitted = false
    }
    let text_copied = false
</script>
<div class="mx-auto">
    <div class="shadow-lg  bg-gradient-to-r from-purple-600 to-cyan-500">
        <header class="p-3 font-bold text-2xl mb-10 text-gray-300">Babyurl.in</header>
    </div>
    {#if message}
        <div class="bg-sky-100 shadow-lg rounded-lg p-4 text-center mx-10  text-blue-600 font-bold flex flex-col">
            {#if text_copied}
                <h7 class="text-stone-400 text-xs text-right">Copied!</h7>
            {:else}
                <i style="text-align: -webkit-right;" on:click={()=>{navigator.clipboard.writeText(message.short_url);text_copied=true}}><CopyIcon/></i>
            {/if}
            <a href="{message.full_url}" class="block">{message.full_url}</a>
            <h5 class="text-black">can be reached at</h5>
            <a class="underline" href="{message.short_url}">{message.short_url} </a> 
        </div>
    {:else}
        <form on:submit|preventDefault={handleSubmit} class="mx-10 block mt-20">
            <input type="url" class="shadow-lg rounded-lg w-full p-4 shadow-gray-300 focus:outline-none focus:shadow-gray-500" placeholder="Write url" bind:value={full_url} required>
            <div class="text-center mt-5">
                {#if form_submitted}
                <button type="button" class="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-indigo-500 hover:bg-indigo-400 transition ease-in-out duration-150 cursor-not-allowed" disabled="">
                    <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </button>      
                {:else}
                    <button type="submit" class="shadow-lg rounded-lg px-5 py-2.5 bg-blue-600 text-white shadow-blue-200 hover:bg-blue-500 hover:shadow-blue-400">Submit</button>
                {/if}
            </div>    
        </form>
    {/if}
</div>
