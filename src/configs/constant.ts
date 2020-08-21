export default {
  fileUploadConfig: {
    maxFileSize: 100000000, // 100 MB
    maxFiles: 10,
  },
  statusCode: {
    unauthenticated: 401,
    errorServer: 500,
    notFound: 404,
    badRequest: 400,
    unprocessableEntity: 422,
    success: 200,
    preconditionRequire: 428,
    permissionDeny: 403,
  },
  subscriptions: {
    keepAlive: 30000,
  },
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  },
};
