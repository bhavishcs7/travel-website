import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';

const JWT_SECRET = process.env.JWT_SECRET || 'content_hunter_jwt_secret_key_2026';

export const protectAdmin = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'Unauthorized: Access token missing.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const admin = await Admin.findById(decoded.id).select('-password');

    if (!admin || admin.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Forbidden: Admin access required.' });
    }

    req.admin = admin;
    next();
  } catch (error) {
    console.error('JWT verification error:', error.message);
    return res.status(401).json({ success: false, message: 'Unauthorized: Invalid or expired token.' });
  }
};
