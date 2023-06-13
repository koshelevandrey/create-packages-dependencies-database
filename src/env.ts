import * as process from "process";

const envalid = require("envalid");
const dotenv = require("dotenv");

dotenv.config();

export default envalid.cleanEnv(process.env, {
  JSON_FILE_PATH: envalid.str(),
  DATABASE_NAME: envalid.str(),
});
