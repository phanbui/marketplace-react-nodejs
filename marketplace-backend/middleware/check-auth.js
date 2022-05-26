const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      throw new Error("No Token!");
    }
    const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // attach user data to request for authorization
    req.userData = { userId: payload.userId, userEmail: payload.userEmail };
    next();
  } catch (err) {
    console.log("Authentication Failed");
    res.json({ error: "Authentication Failed" });
    // const error = new Error("Authentication Failed");
    // return next(error);
  }
};
