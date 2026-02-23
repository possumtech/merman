import SqlRite from "@possumtech/sqlrite";

export default class Merman {
	constructor(dbPath = ":memory:") {
		this.sql = new SqlRite({
			path: dbPath,
			dir: ["classes"],
		});
	}

	getRevisions(projectId) {
		return this.sql.getRevisions.all({ project_id: projectId });
	}

	saveRevision(projectId, filename, content) {
		return this.sql.saveRevision.run({
			project_id: projectId,
			filename: filename,
			content: content,
		});
	}

	close() {
		this.sql.close();
	}
}
