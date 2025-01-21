import 'dotenv/config';
import { drizzle } from "drizzle-orm/mysql2";


export const db = drizzle({
	connection:{
		host: process.env.DATABASE_URL! as string, 
		port: Number(process.env.DATABASE_PORT!),
		user: process.env.DATABASE_USER! as string,
		password: process.env.DATABASE_PASSWORD! as string,
		database: process.env.DATABASE_DB! as string
	}
});
