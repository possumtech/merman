-- INIT: createRevisionsTable
BEGIN TRANSACTION;

CREATE TABLE IF NOT EXISTS revisions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    project_id TEXT NOT NULL,
    filename TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

END TRANSACTION;

-- PREP: getRevisions
SELECT * FROM revisions WHERE project_id = $project_id;

-- PREP: saveRevision
INSERT INTO revisions (project_id, filename, content)
VALUES ($project_id, $filename, $content);
