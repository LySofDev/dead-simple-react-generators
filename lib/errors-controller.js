module.exports = function(errors) {
  errors.forEach(error => {
    console.error("ERROR:", error);
  });
  console.log("rg is exiting due to fatal errors.");
  process.exit(1);
}
