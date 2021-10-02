const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  let token = "";

  const authorization = req.get("authorization");

  if (authorization && authorization.toLowerCase().startsWith("bearer")) {
    token = authorization.substring(7);
  }

  let decodedToken = {};

  try {
    decodedToken = jwt.verify(token, process.env.SECRET);
  } catch {}

  if (!token || !decodedToken.id) {
    return res
      .status(401)
      .json({ error: "Falta token de autenticación o es invalido" });
  }

  next();
};
