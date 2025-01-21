import { Timestamp } from "firebase-admin/firestore";
import { eq } from "drizzle-orm";
import { User } from "./user";
import { db } from "../db";
import { postsTable } from "../db/schema";

export class Post {

	constructor(
		public id: number,
		public author_id: number,
		public contents: string,
		public timestamp: number,
		public author: User | null
	) { }


	public static async all() {
		return await db.select().from(postsTable);
	}

	public static async create(props: { contents: string, author: User }) {
		return await db.insert(postsTable)
			.values({
				author_id: props.author.id,
				contents: props.contents
			})
	}

	public static async byAuthorId(targetAuthor: number) {

		return await db.select().from(postsTable).where(eq(postsTable.author_id, targetAuthor));
	}

	public static async byId(id: number) {
		return (await db.select().from(postsTable).where(eq(postsTable.id, id))).at(0);
	}

	public static async update(props: { id: number; contents: string; }) {
		return await db.update(postsTable)
			.set({
				contents: props.contents
			}).where(eq(postsTable.id, props.id))
	}

	public static async delete(id: number) {
		return await db.delete(postsTable)
			.where(eq(postsTable.id, id));
	}
}
