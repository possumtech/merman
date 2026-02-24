import { on, the } from "on_the_money.js";

export default class MermanUI {
	constructor() {
		this.boot();
	}

	async boot() {
		// Handshake handles i18n and global state rehydration automatically
		await the.ready;

		// No imperative title/status setting here.
		// Content comes from index.html + locales/en.json

		on(document.body, "click", '[data-action="toggle-mode"]', (e) => {
			console.log("Toggle button clicked");
			const currentMode = localStorage.getItem("viewMode") || "edit";
			const nextMode = currentMode === "edit" ? "view" : "edit";

			the("viewMode", nextMode);
			the("status", `Mode: ${nextMode}`);
			console.log(`Toggled to ${nextMode}`);
		});
	}
}

new MermanUI();
