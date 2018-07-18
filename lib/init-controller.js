const path = require('path');
const fs = require('fs');
const voca = require('voca');
const { exec } = require('child_process');
const { templatesDirectory } = require('./constants');
const { generateComponentModule } = require('./generators');
const getWorkDir = require('./get-work-dir');


module.exports = async function(args) {
  const REPO = "https://github.com/LySofDev/react-typescript-template.git";
  const target = args[0] || ".";
  try {
    await exec(`git clone ${REPO} ${target}`);
    console.log("Finished copying the React - Typescript template");
  } catch (error) {
    console.log(error);
    throw "Unable to create project";
  }
}
