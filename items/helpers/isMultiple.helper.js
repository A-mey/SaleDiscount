const isMultipleHelper = (dividend, divisor) => {
  const remainder = dividend % divisor;
  const isMultiple = remainder === 0;
  return isMultiple;
};

export default isMultipleHelper;
