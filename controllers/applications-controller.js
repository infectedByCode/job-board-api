const { insertApplication } = require('../models/application-models');

exports.postApplication = async (req, res, next) => {
  const result = await insertApplication(req.body);
  if (result instanceof Error) {
    return next(result);
  }
  // TODO: logic for dealing with applications, e.g. email, form data
  if (result.affectedRows === 1) {
    res.status(200).json({
      status: 200,
      msg: 'application successful',
      ref: result.applicationID,
    });
  }
};
