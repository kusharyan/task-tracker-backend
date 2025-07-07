const jwt = require("jsonwebtoken");
const logger = require('../logger');

module.exports = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token){
    logger.warn('Access denied: No token provided');
    return res.status(401).json({ error: "No token, Access denied" });
  };

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    logger.info(`User authenticated: ${decoded.email}`)
    next();
  } catch (err) {
    logger.error('Invalid token!')
    res.status(401).json({ error: "Token is not valid" });
  }
};