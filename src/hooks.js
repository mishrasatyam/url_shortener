import {MongoClient,ServerApiVersion} from 'mongodb'
import {dev} from '$app/env'

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
	const {locals} = event 
	const mongo_connect = await mongo_db_connection()
	const db_name = 'url_shortener'
	locals.db = await mongo_connect.db(db_name)
	const response = await resolve(event)
	return response;
}

async function mongo_db_connection(){
	
	const mongo_url = dev?"mongodb://localhost:27017/":import.meta.env.VITE_MONGO_URL;
	const mongo_connect_options = dev?{useUnifiedTopology: true }:{useNewUrlParser: true, useUnifiedTopology: true, serverApi : ServerApiVersion.v1 }
	const mongo_connect = await MongoClient.connect(mongo_url,mongo_connect_options).catch((err)=>console.log('Error connecting mongodb',err));
	return mongo_connect
}