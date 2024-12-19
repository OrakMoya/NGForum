import express from "express";
import bcrypt from "bcrypt";
import { User } from "../models/user";
import { UserMetadata } from "firebase-admin/lib/auth/user-record";

export async function store(req: express.Request, res: express.Response, next: express.NextFunction) {
	let email = req.body.email;
	let password = req.body.password;

	let user = await User.byEmail(email);
	if (user) {
		const matches = await bcrypt.compare(password, user.password);
		if (matches) {
			req.session.user = user;
			req.session.save();
			res.status(200).send();
			return;
		}
	}
	res.status(403).json({ email: "Invalid email or password" });
}
