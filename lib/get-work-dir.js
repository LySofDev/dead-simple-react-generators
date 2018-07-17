const path = require('path');
const fs = require('fs');

module.exports = function(args) {
  let srcDirectory;
  if (args.length === 0 || !args.includes('--path')) {
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
