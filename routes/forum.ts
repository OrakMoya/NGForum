import { Router } from 'express';
import { index as postsIndex, store as postsStore } from '../controllers/PostController';
import { store as registerStore } from '../controllers/RegisterController';
import bodyParser from "body-parser";
import { store as loginStore } from '../controllers/LoginController';
import { auth } from '../utils/guards';

const routes = Router();
const guestRoutes = Router();
const authenticatedRoutes = Router();
const jsonParser = bodyParser.json();

guestRoutes.get("/api/posts", postsIndex);
authenticatedRoutes.post("/api/posts", auth, jsonParser, postsStore);

guestRoutes.get("/api/user", (req, res) => {
	if (req.session.user) {
		const { password, ...user } = req.session.user;
		res.json(user);
		return;
	}
	res.json(null);
});

guestRoutes.post("/api/register", jsonParser, registerStore);
guestRoutes.post("/api/login", jsonParser, loginStore);

routes.use(guestRoutes);
routes.use(authenticatedRoutes);

export default routes;
