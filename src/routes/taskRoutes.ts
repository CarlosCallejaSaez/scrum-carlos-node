import express from 'express';
import { getAllTasks, syncTasksFromJira, getTaskById, createTask, updateTask, deleteTask, getTasksByStatus } from '../controllers/taskController';

const router = express.Router();

router.get('/', getAllTasks);
router.get('/:id', getTaskById);
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);
router.get('/status/:status', getTasksByStatus);
router.post('/sync-from-jira', syncTasksFromJira); 

export default router;
