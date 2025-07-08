import { Request, Response } from 'express';
import { AppDataSource } from '../config/db';
import { User } from '../models/userModel';
import { Payment, PaymentStatus } from '../models/paymentModel';
import { Transaction } from '../models/transactionModel';

class AdminController {
    
    // Get all users
    async getUsers(req: Request, res: Response): Promise<void> {
        try {
            const userRepository = AppDataSource.getRepository(User);
            const users = await userRepository.find({
                order: { createdAt: 'DESC' }
            });
            
            // Remove password from response
            const safeUsers = users.map(user => {
                const { password, ...safeUser } = user;
                return safeUser;
            });
            
            res.json({ users: safeUsers });
        } catch (error) {
            console.error('Error fetching users:', error);
            res.status(500).json({ error: 'Failed to fetch users' });
        }
    }

    // Get all payments
    async getPayments(req: Request, res: Response): Promise<void> {
        try {
            const paymentRepository = AppDataSource.getRepository(Payment);
            const payments = await paymentRepository.find({
                order: { createdAt: 'DESC' }
            });
            
            res.json({ payments });
        } catch (error) {
            console.error('Error fetching payments:', error);
            res.status(500).json({ error: 'Failed to fetch payments' });
        }
    }

    // Get all transactions
    async getTransactions(req: Request, res: Response): Promise<void> {
        try {
            const transactionRepository = AppDataSource.getRepository(Transaction);
            const transactions = await transactionRepository.find({
                order: { createdAt: 'DESC' }
            });
            
            res.json({ transactions });
        } catch (error) {
            console.error('Error fetching transactions:', error);
            res.status(500).json({ error: 'Failed to fetch transactions' });
        }
    }

    // Delete single user
    async deleteUser(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const userRepository = AppDataSource.getRepository(User);
            
            const user = await userRepository.findOne({ where: { id: parseInt(id) } });
            if (!user) {
                res.status(404).json({ error: 'User not found' });
                return;
            }
            
            await userRepository.remove(user);
            res.json({ message: `User ${user.username} deleted successfully` });
        } catch (error) {
            console.error('Error deleting user:', error);
            res.status(500).json({ error: 'Failed to delete user' });
        }
    }

    // Delete single payment
    async deletePayment(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const paymentRepository = AppDataSource.getRepository(Payment);
            
            const payment = await paymentRepository.findOne({ where: { id } });
            if (!payment) {
                res.status(404).json({ error: 'Payment not found' });
                return;
            }
            
            await paymentRepository.remove(payment);
            res.json({ message: `Payment ${payment.id} deleted successfully` });
        } catch (error) {
            console.error('Error deleting payment:', error);
            res.status(500).json({ error: 'Failed to delete payment' });
        }
    }

    // Delete single transaction
    async deleteTransaction(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const transactionRepository = AppDataSource.getRepository(Transaction);
            
            const transaction = await transactionRepository.findOne({ where: { id } });
            if (!transaction) {
                res.status(404).json({ error: 'Transaction not found' });
                return;
            }
            
            await transactionRepository.remove(transaction);
            res.json({ message: `Transaction ${transaction.id} deleted successfully` });
        } catch (error) {
            console.error('Error deleting transaction:', error);
            res.status(500).json({ error: 'Failed to delete transaction' });
        }
    }

    // Clear all users
    async clearUsers(req: Request, res: Response): Promise<void> {
        try {
            const userRepository = AppDataSource.getRepository(User);
            await userRepository.clear();
            res.json({ message: 'All users cleared successfully' });
        } catch (error) {
            console.error('Error clearing users:', error);
            res.status(500).json({ error: 'Failed to clear users' });
        }
    }

    // Clear all payments
    async clearPayments(req: Request, res: Response): Promise<void> {
        try {
            const paymentRepository = AppDataSource.getRepository(Payment);
            await paymentRepository.clear();
            res.json({ message: 'All payments cleared successfully' });
        } catch (error) {
            console.error('Error clearing payments:', error);
            res.status(500).json({ error: 'Failed to clear payments' });
        }
    }

    // Clear all transactions
    async clearTransactions(req: Request, res: Response): Promise<void> {
        try {
            const transactionRepository = AppDataSource.getRepository(Transaction);
            await transactionRepository.clear();
            res.json({ message: 'All transactions cleared successfully' });
        } catch (error) {
            console.error('Error clearing transactions:', error);
            res.status(500).json({ error: 'Failed to clear transactions' });
        }
    }

    // Database statistics
    async getStats(req: Request, res: Response): Promise<void> {
        try {
            const userRepository = AppDataSource.getRepository(User);
            const paymentRepository = AppDataSource.getRepository(Payment);
            const transactionRepository = AppDataSource.getRepository(Transaction);

            const userCount = await userRepository.count();
            const paymentCount = await paymentRepository.count();
            const transactionCount = await transactionRepository.count();

            const completedPayments = await paymentRepository.count({ 
                where: { status: PaymentStatus.COMPLETED } 
            });
            const pendingPayments = await paymentRepository.count({ 
                where: { status: PaymentStatus.PENDING } 
            });

            res.json({
                stats: {
                    users: userCount,
                    payments: paymentCount,
                    transactions: transactionCount,
                    completedPayments,
                    pendingPayments
                }
            });
        } catch (error) {
            console.error('Error fetching stats:', error);
            res.status(500).json({ error: 'Failed to fetch statistics' });
        }
    }

    // Drop specific table
    async dropTable(req: Request, res: Response): Promise<void> {
        try {
            const { tableName } = req.params;
            
            // Validate table name for security
            const allowedTables = ['users', 'payments', 'transactions'];
            if (!allowedTables.includes(tableName)) {
                res.status(400).json({ error: 'Invalid table name' });
                return;
            }

            // Drop table using raw query
            await AppDataSource.query(`DROP TABLE IF EXISTS ${tableName}`);
            res.json({ message: `Table ${tableName} dropped successfully` });
        } catch (error) {
            console.error(`Error dropping table:`, error);
            res.status(500).json({ error: 'Failed to drop table' });
        }
    }

    // Drop all tables
    async dropAllTables(req: Request, res: Response): Promise<void> {
        try {
            // Drop tables in correct order (to handle foreign key constraints)
            await AppDataSource.query(`DROP TABLE IF EXISTS transactions`);
            await AppDataSource.query(`DROP TABLE IF EXISTS payments`);
            await AppDataSource.query(`DROP TABLE IF EXISTS users`);
            
            res.json({ message: 'All tables dropped successfully' });
        } catch (error) {
            console.error('Error dropping all tables:', error);
            res.status(500).json({ error: 'Failed to drop all tables' });
        }
    }

    // Recreate database schema
    async recreateSchema(req: Request, res: Response): Promise<void> {
        try {
            // Drop all tables first
            await AppDataSource.query(`DROP TABLE IF EXISTS transactions`);
            await AppDataSource.query(`DROP TABLE IF EXISTS payments`);
            await AppDataSource.query(`DROP TABLE IF EXISTS users`);
            
            // Recreate schema
            await AppDataSource.synchronize(true);
            
            res.json({ message: 'Database schema recreated successfully' });
        } catch (error) {
            console.error('Error recreating schema:', error);
            res.status(500).json({ error: 'Failed to recreate database schema' });
        }
    }

}

export default new AdminController();
