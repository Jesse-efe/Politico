import jwt from 'jsonwebtoken';

const checkUser = (req, res, next, secretKey) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, secretKey);
    req.userData = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      status: 401,
      error: 'Auth failed',
    });
  }
};

export const isAdmin = (req, res, next) => {
  checkUser(req, res, next, process.env.adminSecretKey);
};

export const isLoggedIn = (req, res, next) => {
  checkUser(req, res, next, process.env.userSecretKey);
};
