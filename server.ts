import express from "express";
import cors from "cors";
import forum from "./routes/forum";
import dotenv from "dotenv";
import session from "express-session";
import { throwExpression } from "./utils/misc";


dotenv.config()

const app = express();
const port = 3000;

const frontendFolder = "./frontend/dist/ngforum/browser/"
const options = {
	dotfiles: 'ignore',
	etag: false,
	extensions: ['html', 'js', 'scss', 'css'],
	index: false,
	maxAge: '1y',
	redirect: true,
}

app.use(cors());
app.use(express.static(frontendFolder, options))
app.use(session({
	secret: process.env.SECRET ?? throwExpression("Application secret is not defined."),
	resave: false,
	saveUninitialized: false
}));
app.use(forum)

app.get('/logout', (req, res) => {
	req.session.destroy(() => res.redirect('/'));
})

// Forward all other requests to angular
app.all('*', (req, res) => {
	res.status(200).sendFile('/', { root: frontendFolder })
})


app.listen(port, () => {
	console.log("Listening on localhost:" + port);
})
