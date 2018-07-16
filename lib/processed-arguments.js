module.exports = function(rawArguments) {
  if (rawArguments.length < 3) {
    return {
      action: "ERROR",
      options: ["INSUFFICIENT_ARGUMENTS"]
    }
  }
  return {
    action: rawArguments[2].toUpperCase(),
    options: rawArguments.slice(3)
  }
}
