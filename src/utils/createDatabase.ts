import { Database } from "sqlite3";

const sqlite3 = require("sqlite3");

export function createDatabase(databaseName: string): Promise<Database> {
  return new Promise((resolve, reject) => {
    const database = new sqlite3.Database(`./${databaseName}`, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
      if (err) {
        reject(err);
      }
      resolve(database);
    });
  });
}
