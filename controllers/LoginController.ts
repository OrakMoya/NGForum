import express from "express";
import bcrypt from "bcrypt";
import { User } from "../models/user";
import { UserMetadata } from "firebase-admin/lib/auth/user-record";

export function store(req: express.Request, res: express.Response, next: express.NextFunction) {
	let email = req.body.email;
	let password = req.body.password;

	User.byEmail(email)
		.then(async (user) => {
			if (!user) throw "Fail";
			const result = await bcrypt.compare(password, user.password);
			return ({ matches: result, user: user });
		}
		)
		.then((data) => {
			if (data.matches) {
				console.log("login success");
				req.session.user = data.user;
				req.session.save();
				res.status(200).send();
				return;
			}
			throw "Fail";
		}).catch(() => {
			console.log("login fail");
			res.status(400).json({error: "Invalid email or password"});
		});
}
