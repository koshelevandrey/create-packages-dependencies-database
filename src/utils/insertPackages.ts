import { Database } from "sqlite3";
import { Packages } from "./readPackagesJsonFile";

const getInsertPackagesSql = (packagesValues: string) => `
INSERT INTO packages (package_id, name) VALUES ${packagesValues}
`;

export function insertPackages(database: Database, packages: Packages): Promise<Record<string, number>> {
  return new Promise((resolve, reject) => {
    const packagesSet = new Set<string>();
    for (const packageName in packages) {
      packagesSet.add(packageName);
      if (packages[packageName] && packages[packageName]["Depends:"] && packages[packageName]["Depends:"].length) {
        packages[packageName]["Depends:"].forEach((dependencyPackage) => {
          packagesSet.add(dependencyPackage);
        });
      }
    }

    const packageNameToIndex = {};
    let i = 1;
    packagesSet.forEach((packageName) => {
      packageNameToIndex[packageName] = i;
      i++;
    });

    const allPackagesValues = Object.keys(packageNameToIndex)
      .map((packageName) => `(${packageNameToIndex[packageName]}, "${packageName}")`)
      .join(", ");

    database.exec(getInsertPackagesSql(allPackagesValues), (error) => {
      if (error) {
        reject(error);
      }
      resolve(packageNameToIndex);
    });
  });
}
