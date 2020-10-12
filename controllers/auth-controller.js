const { loginUserQuery } = require('../models/auth-models');

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
