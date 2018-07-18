const voca = require('voca');

module.exports = function(args) {
  // The options object
  const options = {};

  // Remove runtime and script name
  options.pristineArgs = [...args.slice(2)];

  // Reject if no arguments passed
  if (options.pristineArgs.length === 0) {
    throw "Action was not provided.";
  }

  // First argument is the action
  options.action = voca.lowerCase(options.pristineArgs[0]);

  // If action is init and a second argument is given
  // Set that argument as the path
  if (options.action === "init") {
    options.path = options.pristineArgs.length >== 2 ? options.pristineArgs[1] : 'src';
  }

  // Reject if template is not given
  if (options.action === "generate" && options.pristineArgs.length < 2) {
    throw "Template was not provided.";
  }

  // Template is second argumert
  options.template = options.pristineArgs[1];

  // Reject is identifier is not given
  if (options.action === "generate" && options.pristineArgs.length < 3) {
    throw "Identifier was not provided.";
  }

  // Third argument is path and identifier
  options.pristineIdentifier = options.pristineArgs[2];

  // Split path from identifier
  if (options.pristineIdentifier.includes("/")) {
    options.identifierSegments = options.pristineIdentifier.split("/");
    options.identifier = options.identifierSegments.pop();
    options.path = options.identifierSegments.join("/");
  } else {
    options.identifier = options.pristineIdentifier;
    options.path = "src";
  }

  // { action, [path], [template], [identifier] }
  return options;
}
