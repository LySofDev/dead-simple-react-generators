const path = require('path');
const fs = require('fs');
const voca = require('voca');

module.exports = function() {
  const paths = {};

  paths.projectDirectory = process.cwd();

  paths.segments = options.path.split("/");

  paths.targetDirectory = paths.projectDirectory;

  path.segments.forEach(segment => {
    paths.targetDirectory += `/${segment}`;
    if (!fs.existsSync(paths.targetDirectory)) fs.mkdirSync(paths.targetDirectory);
  });

  paths.targetFile = path.join(paths.targetDirectory, options.identifier);

}
