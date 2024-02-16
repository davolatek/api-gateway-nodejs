const jwt = require("jsonwebtoken");

// Middleware to validate JWT token
function verifyToken(req, res, next) {
  // Get token from request headers, query parameters, or cookies
  const token =
    req.headers.authorization || req.query.token || req.cookies.token;

  // Check if token exists
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: Token missing" });
  }

  // Verify token
  jwt.verify(
    token,
    "dsgsdjhsdjhsdyuweuiasjksajkjkasjksajksdjksduiweuiwejkas",
    (err, decoded) => {
      if (err) {
        return res
          .status(401)
          .json({
            hasError: true,
            errorType: "401",
            message: "Unauthorized: Invalid token",
          });
      }
      // Token is valid, attach decoded payload to request object
      req.user = decoded;
      next();
    }
  );
}

module.exports = verifyToken;
