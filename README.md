# Debian packages dependencies database creator
Console utility for parsing JSON file with debian packages dependencies and creating SQLite3 database out of it.

## How to use

1. Put your packages dependencies JSON file to `src/packages_dependencies.json`.
2. Run command   
   `npm run create`
3. Get generated database from `dist/packages.sqlite`