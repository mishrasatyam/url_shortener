import {MongoClient,ServerApiVersion} from 'mongodb'
import {dev} from '$app/env'

const db_name = 'url_shortener'
const mongo_url = dev?"mongodb://localhost:27017/":import.meta.env.VITE_MONGO_URL;
const mongo_connect_options = dev?{useUnifiedTopology: true }:{useNewUrlParser: true, useUnifiedTopology: true, serverApi : ServerApiVersion.v1 }
const mongo_connect = await MongoClient.connect(mongo_url,mongo_connect_options).catch((err)=>console.log('Error connecting mongodb',err));

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
	const {locals} = event 
	locals.db = await mongo_connect.db(db_name)
	const response = await resolve(event)
	return response;
}