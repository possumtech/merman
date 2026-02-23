import fs from "node:fs";
import { createServer } from "node:http";
import path from "node:path";
import express from "express";
import session from "express-session";
import { createServer as createViteServer } from "vite";
import { WebSocketServer } from "ws";
import Merman from "./classes/Merman.js";

const isDev = process.env.NODE_ENV !== "production";

async function startServer() {
	const app = express();
	const server = createServer(app);
	const wss = new WebSocketServer({ server });

	const merman = new Merman("merman.sqlite3");

	app.use(
		session({
			secret: process.env.SESSION_SECRET || "merman-secret",
			resave: false,
			saveUninitialized: true,
		}),
	);

	wss.on("connection", (ws) => {
		ws.on("message", (message) => ws.send(`Pong: ${message}`));
	});

	app.get("/api/health", (req, res) => res.json({ status: "ok" }));

	if (isDev) {
		const vite = await createViteServer({
			server: {
				middlewareMode: true,
				allowedHosts:
					process.env.ALLOWED_HOSTS === "true"
						? true
						: (process.env.ALLOWED_HOSTS?.split(",") || []),
			},
			appType: "custom",
		});

		// 1. Vite middlewares handle JS/CSS/Assets
		app.use(vite.middlewares);

		// 2. ONLY serve index.html for non-asset requests (Navigation Fallback)
		app.use("*", async (req, res, next) => {
			const url = req.originalUrl;

			// Ignore asset-like paths that Vite should have caught but didn't
			if (url.includes(".") && !url.endsWith(".html")) {
				return next();
			}

			try {
				let template = fs.readFileSync(path.resolve("./index.html"), "utf-8");
				template = await vite.transformIndexHtml(url, template);
				res.status(200).set({ "Content-Type": "text/html" }).end(template);
			} catch (e) {
				vite.ssrFixStacktrace(e);
				next(e);
			}
		});
	} else {
		app.use(express.static("dist"));
	}

	const PORT = process.env.PORT;
	server.listen(PORT, () => {
		console.log(`Merman environment running on http://localhost:${PORT}`);
	});
}

startServer();
