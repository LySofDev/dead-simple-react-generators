const processedArguments = require('./processed-arguments');
const errorsController = require('./errors-controller');
const initController = require('./init-controller');
const generateController = require('./generate-controller');

module.exports = function router(rawArguments) {
  const args = processedArguments(rawArguments);

  try {
    switch (args.action) {

      case "INIT":
        initController(args.options);
        break;

      case "I":
        initController(args.options);
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
