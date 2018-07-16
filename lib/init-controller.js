const path = require('path');
const fs = require('fs');
const voca = require('voca');
const { templatesDirectory } = require('./constants');

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

function generateModuleDirectory(workDir, identifier) {
  const moduleDirectory = `${workDir}/${voca.kebabCase(identifier)}`
  if (!fs.existsSync(moduleDirectory)) {
    fs.mkdirSync(moduleDirectory);
    console.log(`Created directory: ${moduleDirectory}`);
  } else{
    console.log(`Skipped creating directory: ${moduleDirectory}`);
  }
  return moduleDirectory;
}

function moduleName(identifier) {
  return voca.capitalize(voca.camelCase(identifier));
}

function generateModuleFile(moduleDirectory, identifier) {
  const targetFilePath = `${moduleDirectory}/index.tsx`;
  const templateFilePath = `${templatesDirectory}/template.module.tsx`;
  const moduleName = voca.capitalize(voca.camelCase(identifier));
  const fileName = voca.kebabCase(identifier);
  let renderedTemplate = fs.readFileSync(templateFilePath, 'utf-8');
  renderedTemplate = renderedTemplate.split('Template').join( moduleName);
  renderedTemplate = renderedTemplate.split('template').join(fileName);
  fs.writeFileSync(targetFilePath, renderedTemplate);
  console.log(`Created the module: ${targetFilePath}.`);
  return targetFilePath;
}

function generateComponentModule(workDir, identifier) {
  const moduleDirectory = generateModuleDirectory(workDir, identifier);
  console.log(moduleDirectory);
  const moduleFile = generateModuleFile(moduleDirectory, identifier);
  console.log(moduleFile);
}

module.exports = function(args) {

  copyStaticTemplateFile(
    getWorkDir(args),
    [
      'theme.ts',
      'styled-components.ts',
      'routes.ts',
      'history.ts'
    ]
  );

  generateComponentModule(getWorkDir(args), 'foo-bar');

}
