export const CommonErrors = {
  // 400 errors
  InvalidOtp: {
    statusCode: 400,
    error: 'Bad Request Error',
    message: 'Invalid OTP',
  },

  PasswordsNotMatch: {
    statusCode: 400,
    error: 'Bad Request Error',
    message: 'Passwords do not match',
  },

  SamePassword: {
    statusCode: 400,
    error: 'Bad Request Error',
    message: 'New password cannot be the same as the current password',
  },

  // 401 errors
  InvalidToken: {
    statusCode: 401,
    error: 'Unauthorized Error',
    message: 'Invalid token',
  },

  Unauthorized: {
    statusCode: 401,
    error: 'Unauthorized Error',
    message: 'Invalid credentials',
  },

  InvalidCredential: {
    statusCode: 401,
    error: 'Unauthorized Error',
    message: 'Username, email, or password is incorrect',
  },

  UserSessionExpire: {
    statusCode: 401,
    error: 'Unauthorized Error',
    message: 'Login session has expired',
  },

  MissingServiceToken: {
    statusCode: 401,
    error: 'Unauthorized Error',
    message: 'Service token is required',
  },

  InvalidServiceToken: {
    statusCode: 401,
    error: 'Unauthorized Error',
    message: 'Invalid or expired service token',
  },

  // 404 errors
  UserNotFound: {
    statusCode: 404,
    error: 'Not Found Error',
    message: 'User does not exist',
  },

  BuyerNotFound: {
    statusCode: 404,
    error: 'Not Found Error',
    message: 'Buyer details does not exist',
  },

  SellerNotFound: {
    statusCode: 404,
    error: 'Not Found Error',
    message: 'Seller not found',
  },

  // 409 errors
  EmailOrUserNameAlreadyExist: {
    statusCode: 409,
    error: 'Conflict Error',
    message: 'Email or username already exists',
  },

  EmailAlreadyVerified: {
    statusCode: 409,
    error: 'Conflict Error',
    message: 'Email is already verified',
  },

  SellerAlreadyExists: {
    statusCode: 409,
    error: 'Conflict Error',
    message: 'Seller already exists',
  },

  // 500 errors
  ServerError: {
    statusCode: 500,
    error: 'Server Error',
    message: 'An unexpected error occurred on the server',
  },
};
