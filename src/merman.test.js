import "./setup.js"; // Use the DOM shim
import assert from "node:assert";
import test from "node:test";
import MermanUI from "./merman.js";

test("MermanUI class tests (OTM Instrumented)", async (t) => {
	await t.test("it should be instantiatable and boot", async () => {
		// The merman.js file exports the class AND instantiates it.
		// In a test environment, we might want it to NOT instantiate automatically,
		// but we can just check if it already appended something to #app.
		const instance = new MermanUI();
		await new Promise((resolve) => setTimeout(resolve, 10)); // Allow boot() to run

		assert.ok(instance instanceof MermanUI);
		assert.ok(document.querySelector("#app").innerHTML.length > 0);
	});
});
