import { Timestamp } from "firebase-admin/firestore";
import db from "../utils/database";
import { User } from "./user";
import { firestore } from "firebase-admin";

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
	public static byAuthorId(targetAuthor: string) {
		return this.postsRef.where('author_id', '==', targetAuthor).get();
	}

	public static byId(id: string) {
		return this.postsRef.where(firestore.FieldPath.documentId(), '==', id).get();
	}

	public static update(props: { id: any; contents: any; }) {
		return this.postsRef.doc(props.id)
			.set({ contents: props.contents }, {
				merge: true
			});
	}

	static delete(id: string) {
		return this.postsRef.doc(id).delete();
	}
}
