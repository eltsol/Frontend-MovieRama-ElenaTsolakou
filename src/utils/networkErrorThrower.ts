const networkErrorThrower = (error: { status_message: string; status_code: number }) => {
  const networkError = new Error(error.status_message);
  networkError.stack = String(error.status_code);
  throw networkError;
};

export default networkErrorThrower;
