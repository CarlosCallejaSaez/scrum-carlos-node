import express from 'express';
import { getAllTasks, syncTasksFromJira, getTaskById, createTask, updateTask, deleteTask, getTasksByStatus, searchTasksByTitle, sortTasksByTitle } from '../controllers/taskController';

const router = express.Router();

router.get('/', getAllTasks);
router.get('/:id', getTaskById);
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);
router.get('/status/:status', getTasksByStatus);
router.post('/sync-from-jira', syncTasksFromJira);
router.get('/search', searchTasksByTitle); 
router.get('/sort', sortTasksByTitle);  

export default router;
