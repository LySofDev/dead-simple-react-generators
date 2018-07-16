const path = require('path');
const fs = require('fs');
const voca = require('voca');
const { templatesDirectory } = require('./constants');

function generateModuleDirectory(workDir, identifier) {
  const moduleDirectory = `${workDir}/${voca.kebabCase(identifier)}`
  if (fs.existsSync(moduleDirectory)) {
    console.log(`Skipped creating directory: ${moduleDirectory}`);
    return moduleDirectory;
  }
  fs.mkdirSync(moduleDirectory);
  console.log(`Created directory: ${moduleDirectory}`);
  return moduleDirectory;
}

function generateModuleFile(moduleDirectory, identifier) {
  const templateFilePath = `${templatesDirectory}/template.module.tsx`;
  const moduleName = voca.capitalize(voca.camelCase(identifier));
  const fileName = voca.kebabCase(identifier);
  const targetFilePath = `${moduleDirectory}/index.tsx`;
  if (fs.existsSync(targetFilePath)) {
    console.log(`Skipped creating module: ${targetFilePath}`);
    return targetFilePath;
  }
  let renderedTemplate = fs.readFileSync(templateFilePath, 'utf-8');
  renderedTemplate = renderedTemplate.split('Template').join( moduleName);
  renderedTemplate = renderedTemplate.split('template').join(fileName);
  fs.writeFileSync(targetFilePath, renderedTemplate);
  console.log(`Created the module: ${targetFilePath}.`);
  return targetFilePath;
}

function generateComponentFile(componentDirectory, identifier) {
  const fileName = voca.kebabCase(identifier);
  const componentName = voca.capitalize(voca.camelCase(identifier));
  const templateFilePath = `${templatesDirectory}/template.component.tsx`;
  const targetFilePath = `${componentDirectory}/${fileName}.component.tsx`;
  if (fs.existsSync(targetFilePath)) {
    console.log(`Skipped creating component: ${targetFilePath}`);
    return targetFilePath;
  }
  let renderedTemplate = fs.readFileSync(templateFilePath, 'utf-8');
  renderedTemplate = renderedTemplate.split('Template').join(componentName);
  renderedTemplate = renderedTemplate.split('template').join(fileName);
  fs.writeFileSync(targetFilePath, renderedTemplate);
  console.log(`Created the component: ${targetFilePath}.`);
  return targetFilePath;
}

function generateLayoutFile(componentDirectory, identifier) {
  const fileName = voca.kebabCase(identifier);
  const componentName = voca.capitalize(voca.camelCase(identifier));
  const templateFilePath = `${templatesDirectory}/template.layout.tsx`;
  const targetFilePath = `${componentDirectory}/${fileName}.layout.tsx`;
  if (fs.existsSync(targetFilePath)) {
    console.log(`Skipped creating layout: ${targetFilePath}`);
    return targetFilePath;
  }
  let renderedTemplate = fs.readFileSync(templateFilePath, 'utf-8');
  renderedTemplate = renderedTemplate.split('Template').join(componentName);
  renderedTemplate = renderedTemplate.split('template').join(fileName);
  fs.writeFileSync(targetFilePath, renderedTemplate);
  console.log(`Created the layout: ${targetFilePath}.`);
  return targetFilePath;
}

function generateStylesFile(componentDirectory, identifier) {
  const fileName = voca.kebabCase(identifier);
  const componentName = voca.capitalize(voca.camelCase(identifier));
  const templateFilePath = `${templatesDirectory}/template.styles.ts`;
  const targetFilePath = `${componentDirectory}/${fileName}.styles.ts`;
  if (fs.existsSync(targetFilePath)) {
    console.log(`Skipped creating styles: ${targetFilePath}`);
    return targetFilePath;
  }
  let renderedTemplate = fs.readFileSync(templateFilePath, 'utf-8');
  renderedTemplate = renderedTemplate.split('Template').join(componentName);
  renderedTemplate = renderedTemplate.split('template').join(fileName);
  fs.writeFileSync(targetFilePath, renderedTemplate);
  console.log(`Created the styles: ${targetFilePath}.`);
  return targetFilePath;
}

function generateComponent(workDir, identifier, flat) {
  const componentDirectory = flat ? workDir : `${workDir}/${voca.kebabCase(identifier)}`;
  const componentFile = generateComponentFile(componentDirectory, identifier);
  const layoutFile = generateLayoutFile(componentDirectory, identifier);
  const stylesFile = generateStylesFile(componentDirectory, identifier);
}

function generateComponentModule(workDir, identifier) {
  const moduleDirectory = generateModuleDirectory(workDir, identifier);
  generateModuleFile(moduleDirectory, identifier);
  generateComponent(moduleDirectory, identifier, true);
}

module.exports = {
  generateLayoutFile,
  generateModuleFile,
  generateStylesFile,
  generateComponentFile,
  generateComponentModule,
  generateModuleDirectory,
  generateComponent
}
