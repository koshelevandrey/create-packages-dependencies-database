const fs = require("fs");

export type Packages = Record<string, { "Depends:": string[] }>;

export function readPackagesJsonFile(filePath): Promise<Packages> {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf8", function (error, data) {
      if (error) {
        reject(error);
      }
      const packages = JSON.parse(data) as Packages;
      resolve(packages);
    });
  });
}
