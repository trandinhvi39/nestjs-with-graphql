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
};
