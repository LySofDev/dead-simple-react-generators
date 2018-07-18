const v = require('voca');
const { exec } = require('child_process');
const { TEMPLATE_REPOSITORY } = require('./constants');

module.exports = async function(args) {
  try {
    const target = v.kebabCase(args[0]) || `.`;
    await exec(`git clone ${TEMPLATE_REPOSITORY} ${target}`);
    console.log(`Finished copying the React - Typescript template into ${target}`);
  } catch (error) {
    console.log(error);
    throw `Unable to create project`;
  }
}
