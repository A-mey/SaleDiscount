const itemsValidator = async (input) => {
  const pattern = /^\s*[a-zA-Z]+(?:\s+[a-zA-Z]+)*\s*(?:,\s*[a-zA-Z]+(?:\s+[a-zA-Z]+)*\s*)*$/;
  return pattern.test(input);
};

export default itemsValidator;
