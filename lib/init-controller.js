const path = require('path');
const fs = require('fs');
const voca = require('voca');
const { templatesDirectory } = require('./constants');
const { generateComponentModule } = require('./generators');
const getWorkDir = require('./get-work-dir');

function copyStaticTemplateFile(workDir, fileNames) {
  fileNames.forEach(fileName => {
    const targetFilePath = `${workDir}/${fileName}`;
    const templateFilePath = `${templatesDirectory}/${fileName}`;
    const templateText = fs.readFileSync(templateFilePath, 'utf-8');
    fs.writeFileSync(targetFilePath, templateText);
  });
}

module.exports = function(args) {
  generateComponentModule(getWorkDir(args), 'home');
  copyStaticTemplateFile(getWorkDir(args), [
    'theme.ts',
    'styled-components.ts',
    'routes.ts',
    'history.ts'
  ]);
}
