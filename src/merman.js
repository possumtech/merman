import { $, $$, on, the } from "on_the_money.js";

export default class MermanUI {
	constructor() {
		this.boot();
	}

	async boot() {
		await the.ready;

		// Set initial global state
		the("title", "Merman Markdown Editor");
		the("status", "Online");

		// Clone and append editor template
		const editor = $.clone("#tmp-editor");
		$("#app").appendChild(editor);

		// Set scoped state for the editor
		the(editor, {
			content: "graph TD\nA --> B",
		});

		// Handle events
		on(document.body, "click", '[data-action="toggle-mode"]', (e) => {
			const currentMode = the("viewMode") || "edit";
			const nextMode = currentMode === "edit" ? "view" : "edit";
			the("viewMode", nextMode);
			the("status", `Mode: ${nextMode}`);
			console.log(`Toggled to ${nextMode}`);
		});
	}
}

// Instantiate in the modern way (though this class itself handles it)
new MermanUI();
