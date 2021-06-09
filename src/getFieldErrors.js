const getFieldErrors = function getFieldErrors(result) {
  let errors = {};
  if (result.data &&
    result.data.errors
  ) {
    errors = result.data.errors;
  }
  return errors;
};

export default getFieldErrors;
