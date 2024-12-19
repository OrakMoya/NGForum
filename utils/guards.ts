import express from "express";


export function auth(req: express.Request, res: express.Response, next: express.NextFunction){
	if(req.session.user){
		next();
		return;
	}
	if(req.accepts("html")){
		res.redirect("/login")
		return;
	}
	res.status(403).json({error: "You have to be logged in to perform this action"});
}
