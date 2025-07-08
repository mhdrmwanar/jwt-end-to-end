// Global type definitions for the application

// Extend Express Request interface to include user property
declare global {
    namespace Express {
        interface Request {
            user?: any;
            clientIp?: string;
        }
    }
}

// JWT Payload interface
export interface JWTPayload {
    id: number;
    email: string;
    username?: string;
    iat?: number;
    exp?: number;
}

// User interfaces
export interface IUser {
    id: number;
    username: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateUserRequest {
    username: string;
    email: string;
    password: string;
}

export interface LoginRequest {
    username: string;
    password: string;
}

// Payment interfaces (for future use)
export interface IPayment {
    id: string;
    userId: number;
    amount: number;
    currency: string;
    paymentMethod: string;
    status: 'pending' | 'processing' | 'completed' | 'failed';
    createdAt: Date;
    updatedAt: Date;
}

export interface CreatePaymentRequest {
    amount: number;
    currency: string;
    paymentMethod: string;
    merchantId: string;
    cardNumber: string;
    cardHolderName: string;
    expiryMonth: number;
    expiryYear: number;
    cvv: string;
    description?: string;
}
