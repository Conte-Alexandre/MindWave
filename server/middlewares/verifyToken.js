const jwt = require("jsonwebtoken");
const SECRET_KEY = "UTuFViayk5AxYjp9a9DHvLjnNiER45m3";

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return redirectOrDeny(req, res);
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return redirectOrDeny(req, res);
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return redirectOrDeny(req, res);
    }

    req.user = user;
    next();
  });
};


module.exports = verifyToken;
