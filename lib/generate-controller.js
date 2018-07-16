const voca = require('voca');
const getWorkDir = require('./get-work-dir');
const { generateComponent, generateModuleFile, generateModuleDirectory } = require('./generators');

const templates = [
  'component',
  'module'
]

function getTemplateName(args) {
  if (args.length === 0) throw "No template provided.";
  const templateName = voca.lowerCase(args[0]);
  if (!templates.includes(templateName)) throw "Invalid template provided.";
  return templateName;
}

function getIdentifier(args) {
  if (args.length < 2) throw "No identifier provided.";
  return args[1];
}

function getIsFlat(args) {
  return args.includes('--flat');
}

module.exports = function(args) {
  const templateName = getTemplateName(args);
  const identifier = getIdentifier(args);
  let workDir = getWorkDir(args);
  const flat = getIsFlat(args);

  switch (voca.lowerCase(args[0])) {

    case 'component':
      generateComponent(workDir, identifier, flat);
      break;

    case 'module':
      workDir = generateModuleDirectory(workDir, identifier);
      generateModuleFile(workDir, identifier);
      break;

    default:
      throw 'INTERNAL ERROR';

  }
}
