import { Timestamp } from "firebase-admin/firestore";
import db from "../utils/database";
import { User } from "./user";

export class Post {

	constructor(
		public id: string,
		public author_id: string,
		public contents: string,
		public timestamp: number,
		public author: User | null
	) { }

	static postsRef = db.collection("posts");

	public static all() {
		return this.postsRef.get();
	}

	public static create(props: { contents: string, author: User }) {
		return this.postsRef.doc()
			.set(
				{
					author_id: props.author.id,
					contents: props.contents,
					timestamp: Timestamp.now()
				}
			);
	}
}
