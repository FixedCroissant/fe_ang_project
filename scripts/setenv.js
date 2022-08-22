const { writeFile } = require("fs");
const { argv } = require("yargs");

require("dotenv").config();

//read the command line arguments passed with yargs
const environment = argv.environment;
const isProduction = environment === "prod";
const targetPath = isProduction
  ? `./src/environments/environment.prod.ts`
  : `./src/environments/environment.ts`;

//Recreate Angular file
const environmentFileContent = `
export const environment = {
   production: ${isProduction},
   API_REST_URL: "${process.env.API_REST_URL}",
   API_REST_PORT: "${process.env.API_REST_PORT}"
};
`;

// write the content to the respective file
writeFile(targetPath, environmentFileContent, function (err) {
  if (err) {
    console.log(err);
  }
  console.log(`Wrote variables to ${targetPath}`);
});
