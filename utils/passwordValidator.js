const PasswordValidator = require('password-validator');

const schemaValidator = new PasswordValidator();

schemaValidator
  .is()
  .min(8)
  .has()
  .not()
  .spaces();

module.exports = schemaValidator;
