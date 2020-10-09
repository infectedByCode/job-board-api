exports.createConfig = () => {
  return Object.freeze({
    jwtSecret: process.env.JWT_SECRET,
  });
};
