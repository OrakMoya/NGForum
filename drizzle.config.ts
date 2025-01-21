
import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

import dotenv from "dotenv";


dotenv.config()

export default defineConfig({
	out: './drizzle',
	schema: './db/schema.ts',
	dialect: 'mysql',
	dbCredentials: {
		host: process.env.DATABASE_URL! as string, 
		port: Number(process.env.DATABASE_PORT!),
		user: process.env.DATABASE_USER! as string,
		password: process.env.DATABASE_PASSWORD! as string,
		database: process.env.DATABASE_DB! as string
	},
});
