import { $, $$, on, the } from "on_the_money.js";

export default class MermanUI {
	constructor() {
		this.boot();
	}

	async boot() {
		// Wait for OTM Handshake (i18n + state)
		await the.ready;

		the("title", "Merman Markdown Editor");
		the("status", "Online");

		const editor = $.clone("#tmp-editor");
		const container = $("#app");
		if (container && editor) {
			container.appendChild(editor);
			the(editor, {
				content: "graph TD\nA --> B",
			});
		}

		on(document.body, "click", '[data-action="toggle-mode"]', (e) => {
			console.log("Toggle button clicked");
			// In OTM, global state is accessed via the('key')
			const currentMode = localStorage.getItem('viewMode') || 'edit';
			const nextMode = currentMode === "edit" ? "view" : "edit";
			
			the("viewMode", nextMode);
			the("status", `Mode: ${nextMode}`);
			console.log(`Toggled to ${nextMode}`);
		});
	}
}

new MermanUI();
