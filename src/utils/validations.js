var validate = require("validate.js");

export const constraints = {
  username: {
    presence: true,
    length: {
      minimum: 3,
      maximum: 20,
    },
    format: {
      // We don't allow anything that a-z and 0-9
      pattern: "[a-z0-9]+",
      // but we don't care if the username is uppercase or lowercase
      flags: "i",
      message: "Usernames can only contain letters and numbers",
    },
  },
  password: {
    presence: true,
    length: {
      minimum: 6,
    },
  },
  email: {
    presence: true,
    email: true,
  },
};

export const validateThis = (value, fieldName) => {
  const formValues = {};
  formValues[fieldName] = value;
  const formFields = {};
  formFields[fieldName] = constraints[fieldName];

  const result = validate(formValues, formFields);
  if (result) {
    return result[fieldName][0];
  }
  return null;
};
