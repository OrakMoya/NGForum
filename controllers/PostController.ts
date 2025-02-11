import express from "express";
import { Post } from "../models/post";
import { User } from "../models/user";
import { throwExpression } from "../utils/misc";

export async function index(req: express.Request, res: express.Response, next: express.NextFunction) {
	let targetAuthor = req.query.authorId;

	let results = targetAuthor && typeof (targetAuthor) == 'number' ? await Post.byAuthorId(targetAuthor) : await Post.all();
	if (!results) {
		res.json([]);
		return;
	}

	let posts: Post[] = [];
	let authorIds: number[] = [];


	results.forEach((doc) => {
		authorIds.push(doc.author_id);
	});

	let authors = await User.byIds(authorIds);

	results.forEach((doc) => {
		posts.push(
			new Post(
				doc.id,
				doc.author_id,
				doc.contents,
				doc.timestamp.getTime(),
				authors.find((author) => author.id == doc.author_id) ?? null
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

	if (!post) {
		res.status(404).json("Post not found.");
		return;
	}
	if (post.author_id !== req.session.user?.id) {
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
	let post = await Post.byId(Number(req.params.id));

	if (!post) {
		res.status(404).json("Post not found.");
		return;
	}
	if (post.author_id !== req.session.user?.id) {
		res.status(403);
		return;
	}

	await Post.delete(Number(req.params.id));
	res.send();

}
