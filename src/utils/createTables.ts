import { Database } from "sqlite3";

const CREATE_TABLES_SQL = `
CREATE TABLE IF NOT EXISTS packages (
    package_id INTEGER PRIMARY KEY,
    name TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS packages_package_id_index ON packages(package_id);

CREATE TABLE IF NOT EXISTS dependencies (
    parent_id INTEGER,
    child_id INTEGER,
    UNIQUE(parent_id, child_id) ON CONFLICT REPLACE,
    FOREIGN KEY(parent_id) REFERENCES packages(package_id),
    FOREIGN KEY(child_id) REFERENCES packages(package_id)
);

CREATE INDEX IF NOT EXISTS dependencies_parent_id_index ON dependencies(parent_id);
CREATE INDEX IF NOT EXISTS dependencies_child_id_index ON dependencies(child_id);
`;

export function createTables(database: Database) {
  database.exec(CREATE_TABLES_SQL);
}
