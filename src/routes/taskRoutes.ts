import express from 'express';
import { getAllTasks, getTaskById, createTask, updateTask, deleteTask, getTasksByStatus, searchTasksByTitle, assignTask, updateTaskStatus } from '../controllers/taskController';

const router = express.Router();

router.get('/', getAllTasks);
router.get('/:id', getTaskById);
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);
router.get('/status/:status', getTasksByStatus);
router.get('/search', searchTasksByTitle); 
router.put('/:id/assign', assignTask); 
router.put('/:id/update-status', updateTaskStatus);


export default router;
