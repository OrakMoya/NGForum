
import express from "express";
import { User } from "../models/user";
import bcrypt from "bcrypt";

export async function store(req: express.Request, res: express.Response, next: express.NextFunction) {
	let body: { username: string, display_name: string, email: string, password: string, password_confirmation: string } = req.body;

	let { username, display_name, email, password, password_confirmation } = body;

	if (!username || username.length < 5) {
		res.status(400).json("Username is too short");
		return;
	}
	if (!display_name || display_name.length < 5) {
		res.status(400).json("Name is too short");
		return;
	}
	if (!email || await User.byEmail(email)) {
		res.status(400).json("Email is taken");
		return;
	}
	if (!password || password.length < 8) {
		res.status(400).json("Password is too short");
		return;
	}
	if (password !== password_confirmation) {
		res.status(400).json("Passwords don't match");
		return;
	}


	try {
		let salt = await bcrypt.genSalt();
		let hash = await bcrypt.hash(password, salt);
		let doc = await User.create({
			username: body.username,
			displayName: body.display_name,
			email: body.email,
			passwordHash: hash
		})
		let user = new User({
			id: doc.id,
			username: req.body.username,
			displayName: req.body.display_name,
			email: req.body.email
		})
		req.session.user = user;
		req.session.save();
		res.status(200).send();

	} catch (e) {
		res.status(500).json(e);
	}
}
