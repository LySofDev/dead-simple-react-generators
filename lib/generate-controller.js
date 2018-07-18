const v = require('voca');
const path = require('path');
const fs = require('fs');
const { TEMPLATES_DIRECTORY } = require('./constants');

function getTemplateFrom(args) {
  const validTemplates = [
    'component', 'reducer', 'actions', 'styles', 'layout', 'middleware', 'service'
  ];
  const template = args[0];
  if (!template) throw "Template was not provided.";
  if (!validTemplates.includes(template)) throw "Unsupported template provided";
  return template;
}

function getIdentifierFrom(args) {
  let identifier = args[1];
  if (!identifier) throw "Identifier was not provided.";
  return v.kebabCase(path.basename(identifier));
}

function getDirectoryFrom(args) {
  return path.join(process.cwd(), 'src', path.dirname(args[1]));
}

function makeMissingDirectories(targetDirectory) {
  let currentDirectory = path.join(process.cwd(), 'src');
  if (!fs.existsSync(currentDirectory)) throw "Invalid project directory";
  targetDirectory.split("src")[1].split("/").map(segment => {
    currentDirectory = path.join(currentDirectory, segment);
    console.log(currentDirectory);
    if (!fs.existsSync(currentDirectory)) fs.mkdirSync(currentDirectory);
  });
}

function renderTemplateWith(template, identifier) {
  if (template === "actions") return "";
  const templatePath = path.join(TEMPLATES_DIRECTORY, template);
  const templateText = fs.readFileSync(templatePath, 'utf-8');
  return templateText
    .split('Template').join(v.capitalize(v.camelCase(identifier)))
    .split('template').join(v.camelCase(identifier));
}

function buildTargetWith(template, directory, identifier) {
  return path.join(directory, `${identifier}.${template}.tsx`);
}

module.exports = function(args) {
  let renderedTemplate, templateText;
  const template = getTemplateFrom(args);
  const identifier = getIdentifierFrom(args);
  const directory = getDirectoryFrom(args);
  const target = buildTargetWith(template, directory, identifier);
  const payload = renderTemplateWith(template, identifier);
  makeMissingDirectories(directory);
  fs.writeFileSync(target, payload);
}
