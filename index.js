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
		const allowedHosts =
			process.env.ALLOWED_HOSTS === "true"
				? true
				: process.env.ALLOWED_HOSTS
					? process.env.ALLOWED_HOSTS.split(",")
					: [];
		console.log(`Vite allowedHosts: ${JSON.stringify(allowedHosts)}`);

		const vite = await createViteServer({
			configFile: false,
			server: {
				middlewareMode: true,
				host: true,
				allowedHosts: allowedHosts === "true" ? true : allowedHosts,
			},
			appType: "custom",
		});

		// 0. Debug Middleware
		app.use((req, res, next) => {
			console.log(`[DEBUG] ${req.method} ${req.url} | Host: ${req.headers.host}`);
			next();
		});

		// 1. Vite middlewares handle JS/CSS/Assets
		app.use(vite.middlewares);

		// 2. ONLY serve index.html for non-asset requests (Navigation Fallback)
		app.use("*", async (req, res, next) => {
			const url = req.originalUrl;
			console.log(`Request for ${url} from Host: ${req.headers.host}`);

			// Ignore asset-like paths that Vite should have caught but didn't
			if (url.includes(".") && !url.endsWith(".html")) {
				return next();
			}

			try {
				let template = fs.readFileSync(path.resolve("./index.html"), "utf-8");

				// Merman HTML Assembly (Static Inclusion)
				const includeRegex = /<merman-include src="(.+?)"><\/merman-include>/g;
				let includesCount = 0;
				template = template.replace(includeRegex, (_match, src) => {
					includesCount++;
					const filePath = path.resolve(src);
					const content = fs.readFileSync(filePath, "utf-8");
					const bodyMatch = /<body.*?>([\s\S]*?)<\/body>/i.exec(content);
					const injected = bodyMatch ? bodyMatch[1] : content;
					console.log(`[ASSEMBLY] Injected ${src} (${injected.length} bytes)`);
					return injected;
				});
				if (includesCount > 0) console.log(`[ASSEMBLY] Total sections injected: ${includesCount}`);

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
