import { Router } from 'express';
import { destroy as postsDestroy, index as postsIndex, store as postsStore, update as postsUpdate } from 'controllers/PostController.js';
import { store as registerStore } from 'controllers/RegisterController.js';
import bodyParser from "body-parser";
import { store as loginStore } from 'controllers/LoginController.js';
import { auth } from 'utils/guards.js';

const routes = Router();
const guestRoutes = Router();
const authenticatedRoutes = Router();
const jsonParser = bodyParser.json();

guestRoutes.get("/api/posts", postsIndex);
authenticatedRoutes.post("/api/posts", auth, jsonParser, postsStore);
authenticatedRoutes.patch("/api/posts", auth, jsonParser, postsUpdate);
authenticatedRoutes.delete("/api/posts/:id", auth, jsonParser, postsDestroy);

guestRoutes.get("/api/user", (req, res) => {
	if (req.session.user) {
		const { password, ...user } = req.session.user;
		res.json(user);
		return;
	}
	res.json();
});

guestRoutes.post("/api/register", jsonParser, registerStore);
guestRoutes.post("/api/login", jsonParser, loginStore);

routes.use(guestRoutes);
routes.use(authenticatedRoutes);


export default routes;
