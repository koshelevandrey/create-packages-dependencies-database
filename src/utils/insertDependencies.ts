import { Database } from "sqlite3";
import { Packages } from "./readPackagesJsonFile";

const getInsertDependenciesSql = (packagesValues: string) => `
INSERT INTO dependencies (parent_id, child_id) VALUES ${packagesValues}
`;

export function insertDependencies(database: Database, packages: Packages, packageNameToIndex: Record<string, number>) {
  return new Promise((resolve, reject) => {
    const allDependenciesArray: string[] = [];
    Object.keys(packages).forEach((packageName) => {
      const childPackageId = packageNameToIndex[packageName];
      if (packages[packageName] && packages[packageName]["Depends:"] && packages[packageName]["Depends:"].length) {
        packages[packageName]["Depends:"].forEach((dependencyPackage) => {
          const parentPackageId = packageNameToIndex[dependencyPackage];
          allDependenciesArray.push(`(${parentPackageId}, ${childPackageId})`);
        });
      }
    });

    const allDependenciesValues = allDependenciesArray.join(", ");

    database.exec(getInsertDependenciesSql(allDependenciesValues), (error) => {
      if (error) {
        reject(error);
      }
      resolve(true);
    });
  });
}
