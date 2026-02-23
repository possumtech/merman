import assert from "node:assert";
import test from "node:test";
import Merman from "./Merman.js";

test("Merman class tests (SqlRite Instrumented)", async (t) => {
	const merman = new Merman(":memory:");

	await t.test("it should save and retrieve revisions", () => {
		const projectId = "test-project";
		const filename = "test.md";
		const content = "graph TD\nA --> B";

		merman.saveRevision(projectId, filename, content);
		const revisions = merman.getRevisions(projectId);

		assert.strictEqual(revisions.length, 1);
		assert.strictEqual(revisions[0].filename, filename);
		assert.strictEqual(revisions[0].content, content);
	});

	merman.close();
});
