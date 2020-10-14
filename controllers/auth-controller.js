const { loginUserQuery, checkAuth } = require('../models/auth-models');

exports.loginUser = async (req, res, next) => {
  const data = req.body;
  const result = await loginUserQuery(data);
  if (result instanceof Error) {
    return next(result);
  }
  if (result.length === 0 || !result.userId) {
    return res.status(401).json({
      status: 401,
      msg: 'error with login',
    });
  }
  if (result.userId) {
    return res.status(200).json({
      status: 200,
      userId: result.userId,
      token: result.token,
      msg: `user successfully logged in`,
    });
  }
};

exports.authUser = async (req, res, next) => {
  const { token } = req.query;
  const { jobseekerId, companyId } = req.params;
  const userId = jobseekerId || companyId;
  if (!token) {
    return res.sendStatus(403);
  }
  const result = await checkAuth(token, userId);
  console.log('<>>>>>>>>>>>>>', token, jobseekerId, result);
  if (result instanceof Error) {
    return next(result);
  }
  if (!result) {
    return res.sendStatus(403);
  }
  if (result) {
    next();
  }
};
