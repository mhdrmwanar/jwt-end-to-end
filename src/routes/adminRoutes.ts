import { Router } from 'express';
import adminController from '../controllers/adminController';

const router = Router();

// Get data
router.get('/users', adminController.getUsers);
router.get('/payments', adminController.getPayments);
router.get('/transactions', adminController.getTransactions);
router.get('/stats', adminController.getStats);

// Delete single items
router.delete('/users/:id', adminController.deleteUser);
router.delete('/payments/:id', adminController.deletePayment);
router.delete('/transactions/:id', adminController.deleteTransaction);

// Clear all data
router.delete('/users/clear', adminController.clearUsers);
router.delete('/payments/clear', adminController.clearPayments);
router.delete('/transactions/clear', adminController.clearTransactions);

// Drop tables
router.delete('/drop-table/:tableName', adminController.dropTable);
router.delete('/drop-all-tables', adminController.dropAllTables);
router.post('/recreate-schema', adminController.recreateSchema);

export default router;
