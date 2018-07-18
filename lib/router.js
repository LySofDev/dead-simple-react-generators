const errorsController = require('./errors-controller');
const newController = require('./new-controller');
const generateController = require('./generate-controller');

module.exports = function router(rawArguments) {
  if (rawArguments.length === 2) throw "No action provided";
  const args = {
    action: rawArguments[2].toUpperCase(),
    options: rawArguments.slice(3)
  };

  try {
    switch (args.action) {

      case "NEW":
        newController(args.options);
        break;

      case "N":
        newController(args.options);
        break;

      case "GENERATE":
        generateController(args.options);
        break;

      case "G":
        generateController(args.options);
        break;

      default:
        throw "INTERNAL ERROR";

    }
  } catch(error) {
    errorsController(error, args);
  }

  console.log("rg is done. :)");
}
