import assert from "node:assert";
import test from "node:test";
import Editor from "./editor.js";

test("Editor class tests", async (t) => {
	await t.test("it should be instantiatable", () => {
		const instance = new Editor();
		assert.ok(instance instanceof Editor);
	});

	await t.test("it should have a toggleMode method (unimplemented)", () => {
		const instance = new Editor();
		assert.strictEqual(
			typeof instance.toggleMode,
			"function",
			"Method toggleMode should exist",
		);
		assert.throws(() => instance.toggleMode(), /unimplemented/);
	});
});
