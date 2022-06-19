export { displayError };

function displayError(fromClass, fromMethod, err) {
  let msg = `'${fromClass}|${fromMethod}' has thrown error '${err}'`;
  console.error(msg);
}
