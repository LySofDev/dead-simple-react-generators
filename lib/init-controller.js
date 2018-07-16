const path = require('path');
const fs = require('fs');
const voca = require('voca');
const { templatesDirectory } = require('./constants');
const { generateComponentModule } = require('./generators');

function getWorkDir(args) {
  // Use current directory
  if (args.length === 0) {
    return path.join(process.cwd(), 'src');
  }
  // Path flag expects an argument
  if (args.includes('--path') && args.length === 1) {
    throw "Path was not provided.";
  }
  // Return argument as relative path
  return path.join(process.cwd(), args[args.indexOf('--path') + 1]);
}

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
