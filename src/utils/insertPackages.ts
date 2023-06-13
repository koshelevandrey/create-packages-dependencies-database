import { Database } from "sqlite3";
import { Packages } from "./readPackagesJsonFile";

const getInsertPackagesSql = (packagesValues: string) => `
INSERT INTO packages (name) VALUES ${packagesValues}
`;

export function insertPackages(database: Database, packages: Packages) {
  return new Promise((resolve, reject) => {
    const allPackagesValues = Object.keys(packages)
      .map((packageName) => `("${packageName}")`)
      .join(", ");

    database.exec(getInsertPackagesSql(allPackagesValues), (error) => {
      if (error) {
        reject(error);
      }
      resolve(true);
    });
  });
}
