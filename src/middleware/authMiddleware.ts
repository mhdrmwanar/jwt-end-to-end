import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Extend Request interface to include user property
declare global {
    namespace Express {
        interface Request {
            user?: any;
            clientIp?: string;
        }
    }
}

const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.header('Authorization');
    console.log('Auth header:', authHeader);
    
    const token = authHeader?.split(' ')[1];
    console.log('Token:', token);
    
    if (!token) {
        console.log('No token provided');
        return res.status(401).json({ error: 'No token provided' });
    }

    const secret = process.env.JWT_SECRET || 'your_secret_key';
    console.log('Middleware JWT_SECRET:', secret);

    jwt.verify(token, secret, (err: any, user: any) => {
        if (err) {
            console.log('Token verification error:', err);
            
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ 
                    error: 'Token expired', 
                    message: 'Session has expired. Please login again.',
                    code: 'TOKEN_EXPIRED'
                });
            }
            
            if (err.name === 'JsonWebTokenError') {
                return res.status(403).json({ 
                    error: 'Invalid token', 
                    message: 'Token is malformed or invalid.',
                    code: 'TOKEN_INVALID'
                });
            }
            
            return res.status(403).json({ 
                error: 'Token verification failed', 
                message: 'Unable to verify token.',
                code: 'TOKEN_VERIFICATION_FAILED'
            });
        }
        console.log('Token verified, user:', user);
        req.user = user;
        next();
    });
};

export default authenticateJWT;