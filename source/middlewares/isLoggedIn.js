import jwt from 'jsonwebtoken';

const isAdmin = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.userSecretKey);
    req.userData = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      status: 401,
      error: 'Auth failed',
    });
  }
};

export default isAdmin;
