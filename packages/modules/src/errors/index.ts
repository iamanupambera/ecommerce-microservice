export const CommonErrors = {
  EmailExist: {
    statusCode: 409,
    error: 'Conflict Error',
    message: 'Email already exists',
  },

  RoleExit: {
    statusCode: 409,
    error: 'Conflict Error',
    message: 'Role already exists',
  },

  NotFound: {
    statusCode: 404,
    error: 'NotFound Error',
    message: 'not exists',
  },

  Unauthorized: {
    statusCode: 401,
    error: 'Unauthorized Error',
    message: 'Invalid credentials',
  },

  UserNotFound: {
    statusCode: 404,
    error: 'NotFound Error',
    message: 'User not exists',
  },

  RoleNotFound: {
    statusCode: 404,
    error: 'NotFound Error',
    message: 'Role not exists',
  },

  ServerError: {
    statusCode: 500,
    error: 'Server Error',
    message: 'Server Error',
  },

  DeviceNotMatched: {
    statusCode: 401,
    error: 'Unauthorized Error',
    message: 'Invalid device type',
  },

  UserAlreadyExists: {
    statusCode: 409,
    error: 'Conflicted Error',
    message: 'User Already Exists',
  },

  InvalidCredential: {
    statusCode: 401,
    error: 'Unauthorized Error',
    message: 'username email and password is wrong',
  },

  UserSessionExpire: {
    statusCode: 401,
    error: 'Unauthorized Error',
    message: 'login session expire',
  },
};
