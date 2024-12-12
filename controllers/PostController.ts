import express from "express";
import { Post } from "../models/post";
import { throwExpression } from "../utils/misc";
import { User } from "../models/user";

export const index = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
	let snapshot = await Post.all();
	let posts: Post[] = [];
	let authorIds: string[] = [];

	snapshot.forEach((doc) => {
		authorIds.push(doc.data().author_id);
	});

	let authors = await User.byIds(authorIds);

	snapshot.forEach((doc) => {
		posts.push(
			new Post(
				doc.id,
				doc.data().author_id,
				doc.data().contents,
				doc.data().timestamp._seconds,
				authors.find((author) => author.id == doc.data().author_id) ?? null
			)
		)
	})
	res.json(posts)
}

export const store = (req: express.Request, res: express.Response, next: express.NextFunction) => {
	Post.create({
		author: req.session.user ?? throwExpression("Tried to create post by unauthenticated user"),
		contents: req.body.contents
	}).then(
		(data) => res.json(data)
	);
}


