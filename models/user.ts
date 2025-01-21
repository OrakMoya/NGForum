
import { db } from "db/index.js";
import { usersTable } from "db/schema.js";
import { eq, inArray } from "drizzle-orm";

export class User {
	id: number = 0;
	username: string = "";
	email: string = "";
	displayName: string = "";
	password: string = "";

	constructor(params: {
		id: number,
		username: string,
		email: string,
		displayName: string,
		password?: string
	} | null) {
		if (params) {
			this.id = params.id;
			this.username = params.username;
			this.email = params.email;
			this.displayName = params.displayName;
			this.password = params.password ?? "";
		}

	}

	public static async create(params: {
		username: string,
		displayName: string,
		email: string,
		passwordHash: string
	}) {
		return db.insert(usersTable)
			.values({
				username: params.username,
				displayName: params.displayName,
				email: params.email,
				password: params.passwordHash
			});
	}

	public static async byEmail(email: string) {
		let results = await db.select()
			.from(usersTable)
			.where(eq(usersTable.email, email))
			.limit(1);

		let row = results.at(0);
		if(!row) 
			return null;
		
		return new User({
			id: row.id,
			username: row.username,
			displayName: row.displayName,
			email: row.email,
			password: row.password
		});
	}

	public static async byIds(ids: number[]) {
		let results = await db.select()
			.from(usersTable)
			.where(inArray(usersTable.id, ids))

		let users: User[] = [];
		results.forEach((res) => users.push(
			{
				id: res.id,
				username: res.username,
				displayName: res.displayName,
				email: res.email,
				password: res.password
			}
		))
		return users;
	}

}
