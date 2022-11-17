const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    const role = decodedToken.role;
    console.log(req.body.role && req.body.role !== role)
    if (req.body.role && req.body.role !== role) {
      throw 'Not authorized role';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};
