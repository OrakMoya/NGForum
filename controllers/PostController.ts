import express from "express";
import { Post } from "../models/post";
import { throwExpression } from "../utils/misc";
import { User } from "../models/user";

export async function index(req: express.Request, res: express.Response, next: express.NextFunction) {
	let targetAuthor = req.query.authorId;

	let snapshot = targetAuthor && typeof (targetAuthor) == 'string' ? await Post.byAuthorId(targetAuthor) : await Post.all();
	if (snapshot.empty) {
		res.json([]);
		return;
	}

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

export async function store(req: express.Request, res: express.Response, next: express.NextFunction) {
	let data = Post.create({
		author: req.session.user ?? throwExpression("Tried to create post by unauthenticated user"),
		contents: req.body.contents
	});
	res.json(data)
}


export async function update(req: express.Request, res: express.Response, next: express.NextFunction) {
	let post = await Post.byId(req.body.id);

	if (post.size == 0) {
		res.status(404).json("Post not found.");
		return;
	}
	if (post.docs[0].data().author_id !== req.session.user?.id) {
		res.status(403);
		return;
	}

	await Post.update({
		id: req.body.id,
		contents: req.body.contents
	});

	res.status(200).send();
}

export async function destroy(req: express.Request, res: express.Response, next: express.NextFunction) {
	let post = await Post.byId(req.params.id);

	if (post.size == 0) {
		res.status(404).json("Post not found.");
		return;
	}
	if (post.docs[0].data().author_id !== req.session.user?.id) {
		res.status(403);
		return;
	}

	await Post.delete(req.params.id);
	res.send();

}
