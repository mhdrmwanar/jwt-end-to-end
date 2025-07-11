import 'reflect-metadata';
import express from 'express';
import dotenv from 'dotenv';

// Load environment variables FIRST
dotenv.config();

import connectDB, { AppDataSource } from './config/db';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import paymentRoutes from './routes/paymentRoutes';
import adminRoutes from './routes/adminRoutes';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Client IP middleware
app.use((req, res, next) => {
    req.clientIp = req.headers['x-forwarded-for'] as string || 
                   req.headers['x-real-ip'] as string ||
                   req.connection.remoteAddress ||
                   req.socket.remoteAddress ||
                   req.ip;
    next();
});

// Serve static files (HTML views)
app.use(express.static(path.join(__dirname, 'views')));

// Database connection
connectDB();

// Routes
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/payments', paymentRoutes);
app.use('/admin', adminRoutes);

// Default route - redirect to user login
app.get('/', (req, res) => {
    res.redirect('/login.html');
});

// User login routes
app.get('/user', (req, res) => {
    res.redirect('/login.html');
});

app.get('/login', (req, res) => {
    res.redirect('/login.html');
});

// Admin panel routes
app.get('/admin-panel', (req, res) => {
    res.redirect('/admin.html');
});

app.get('/admin-login', (req, res) => {
    res.redirect('/admin-login.html');
});

app.get('/login.admin', (req, res) => {
    res.redirect('/admin-login.html');
});

app.get('/admin', (req, res) => {
    res.redirect('/admin-login.html');
});

// Debug route for testing admin detection
app.get('/debug', (req, res) => {
    res.redirect('/debug-admin.html');
});

// Health check endpoint
app.get('/health', async (req, res) => {
    try {
        // Check database connection
        const isDbConnected = AppDataSource.isInitialized;
        
        // Basic system info
        const healthData = {
            status: isDbConnected ? 'OK' : 'ERROR',
            timestamp: new Date().toISOString(),
            service: 'Secure Payment Gateway',
            version: '1.0.0',
            environment: process.env.NODE_ENV || 'development',
            database: {
                type: 'SQLite',
                connected: isDbConnected,
                status: isDbConnected ? 'Connected' : 'Disconnected'
            },
            server: {
                port: PORT,
                uptime: process.uptime(),
                memory: {
                    used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024) + ' MB',
                    total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024) + ' MB'
                }
            },
            endpoints: {
                userLogin: '/login.html',
                adminLogin: '/admin-login.html',
                api: {
                    auth: '/auth',
                    users: '/users',
                    payments: '/payments',
                    admin: '/admin'
                }
            }
        };

        res.status(isDbConnected ? 200 : 503).json(healthData);
    } catch (error) {
        res.status(503).json({
            status: 'ERROR',
            timestamp: new Date().toISOString(),
            service: 'Secure Payment Gateway',
            error: 'Health check failed',
            message: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`🚀 Secure Payment Gateway Server is running on http://localhost:${PORT}`);
    console.log(`📱 Login: http://localhost:${PORT}/login.html`);
    console.log(`📊 Health Check: http://localhost:${PORT}/health`);
});