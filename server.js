
import express from "express";
import cors from "cors";
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

app.all('*', (req, res) => {
	res.status(200).sendFile('/', { root: frontendFolder })
})


app.listen(port, () => {
	console.log("Listening on port " + port);
})
