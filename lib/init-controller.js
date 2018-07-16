const path = require('path');
const fs = require('fs');
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

function generateComponentModule(opts) {
  // const workDir = generateDirectory(opts.workDir);
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

  generateComponentModule({
    identifier: 'home',
    workDir: getWorkDir(args)
  });

}
