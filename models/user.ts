
import { firestore } from "firebase-admin";
import db from "../utils/database";

export class User {
	id: string = "";
	username: string = "";
	email: string = "";
	displayName: string = "";
	password: string = "";

	static userRef = db.collection("users");

	constructor(params: {
		id: string,
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

	public static create(params: {
		username: string,
		displayName: string,
		email: string,
		passwordHash: string
	}) {
		return User.userRef.add({
			username: params.username,
			displayName: params.displayName,
			email: params.email,
			password: params.passwordHash
		})
	}

	public static async byEmail(email: string) {
		const snapshot = await User.userRef.where('email', '==', email)
			.limit(1)
			.get();
		if (snapshot.empty) return null;

		let doc = snapshot.docs[0];
		return new User({
			id: doc.id,
			username: doc.data().username,
			displayName: doc.data().displayName,
			email: doc.data().email,
			password: doc.data().password
		});
	}

	public static async byIds(ids: string[]) {
		let docs = await User.userRef.where(firestore.FieldPath.documentId(), 'in', ids).get();
		let users: User[] = [];
		docs.forEach((doc) => users.push(
			{
				id: doc.id,
				username: "",
				displayName: doc.data().displayName,
				email: "",
				password: ""
			}
		))
		return users;
	}

}
