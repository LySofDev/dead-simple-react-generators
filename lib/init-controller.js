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
    fs.writeFileSync(
      `${workDir}/${fileName}`,
      fs.readFileSync(
        `${templatesDirectory}/${fileName}`,
        'utf-8'
      )
    );
  });
}

module.exports = function(args) {
  copyStaticTemplateFile(
    getWorkDir(args),
    ['theme.ts', 'styled-components.ts', 'routes.ts']
  );
}
