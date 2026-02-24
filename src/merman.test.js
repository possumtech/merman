import "./setup.js"; // Use the DOM shim
import assert from "node:assert";
import test from "node:test";
import MermanUI from "./merman.js";

test("MermanUI class tests (OTM Instrumented)", async (t) => {
	await t.test("it should be instantiatable and boot", async () => {
		// The merman.js file exports the class AND instantiates it.
		const instance = new MermanUI();
		await new Promise((resolve) => setTimeout(resolve, 10)); // Allow boot() to run

		assert.ok(instance instanceof MermanUI);
		// With server-side assembly, #app is pre-populated in index.html,
		// and the boot sequence should not break it.
		assert.ok(document.querySelector("#app").innerHTML.length > 0);
	});
});
