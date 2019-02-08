import jwt from 'jsonwebtoken';

const checkUser = (req, res, next, secretKey) => {
  const auth = req.headers.authorization;
  if (auth === undefined) {
    return res.status(401).json({
      status: 401,
      error: 'token is required for authentication',
    });
  }
  const token = auth.split(' ')[1];
  try {
    const decoded = jwt.verify(token, secretKey);
    req.userData = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      status: 401,
      error: 'Authentication failed',
    });
  }
};

export const isAdmin = (req, res, next) => {
  checkUser(req, res, next, process.env.adminSecretKey);
};

export const isLoggedIn = (req, res, next) => {
  checkUser(req, res, next, process.env.userSecretKey);
};
