const path = require('path');
const fs = require('fs');
const voca = require('voca');
const { templatesDirectory } = require('./constants');
const { generateComponentModule } = require('./generators');

function getWorkDir(args) {
  let srcDirectory;
  if (args.length === 0) {
    srcDirectory = path.join(process.cwd(), 'src');
  } else if (args.includes('--path') && args.length === 1) {
    throw "Path was not provided.";
  } else {
    srcDirectory = path.join(process.cwd(), args[args.indexOf('--path') + 1]);
  }
  if (!fs.existsSync(srcDirectory)) {
    throw "Missing project directory";
  }
  return srcDirectory;
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
