module.exports = function(error, args) {
  console.error("ERROR:", error);
  console.log("rg is exiting due to fatal errors.");
  process.exit(1);
}
