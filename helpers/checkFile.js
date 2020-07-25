const fsPromises = require('fs').promises;

const checkFile = (path) => fsPromises
  .readFile(path, { encoding: 'utf8' })
  .then((data) => data)
  .catch((err) => err);

module.exports = checkFile;
