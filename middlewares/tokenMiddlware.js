const jwt = require('jsonwebtoken');

const tokenVerify = (req, res, next) => {
  try {
    let token = '';

    const authorization = req.get('authorization');
    if (!authorization) {
      console.log(error);
    }
    token = authorization.split(' ')[1];
    let decodedToken = jwt.verify(token, process.env.SECRET);

    if (!decodedToken.id) {
      return res
        .status(401)
        .json({ error: 'Falta token de autenticación o es invalido' });
    }

    next();
  } catch {
    console.log(error);
  }
};
module.exports = { tokenVerify };
