import env from "./env";
import { createDatabase } from "./utils/createDatabase";
import { readPackagesJsonFile } from "./utils/readPackagesJsonFile";
import { createTables } from "./utils/createTables";
import { insertPackages } from "./utils/insertPackages";
import { insertDependencies } from "./utils/insertDependencies";

const { JSON_FILE_PATH, DATABASE_NAME } = env;

async function createDatabaseFromJSON() {
  const database = await createDatabase(`./dist/${DATABASE_NAME}`);
  console.log("Connected to database");

  await createTables(database);
  console.log("Created tables");

  const packagesFromFile = await readPackagesJsonFile(JSON_FILE_PATH);
  await insertPackages(database, packagesFromFile);
  console.log("Inserted packages");

  await insertDependencies(database, packagesFromFile);
  console.log("Inserted dependencies");
}

createDatabaseFromJSON().catch((error) => {
  console.error(error);
});
