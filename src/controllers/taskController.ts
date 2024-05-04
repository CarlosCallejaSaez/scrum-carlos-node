import { Request, Response } from 'express';
import Task from '../models/taskModel';

export const getAllTasks = async (req: Request, res: Response): Promise<void> => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    try {
      const tasks = await Task.find()
        .skip((page - 1) * limit)
        .limit(limit);
      const totalCount = await Task.countDocuments();
      res.status(200).json({
        tasks,
        totalPages: Math.ceil(totalCount / limit),
        currentPage: page
      });
    } catch (error:any) {
      res.status(500).json({ message: error.message });
    }
  };
  


export const getTaskById = async (req: Request, res: Response): Promise<void> => {
    const taskId = req.params.id;
    try {
      const task = await Task.findById(taskId);
      if (!task) {
        res.status(404).json({ message: 'Task not found' });
        return;
      }
      res.status(200).json(task);
    } catch (error:any) {
      res.status(500).json({ message: error.message });
    }
  };
  
  export const createTask = async (req: Request, res: Response): Promise<void> => {
    const { title, description, status } = req.body;
    try {
      const newTask = await Task.create({ title, description, status });
      res.status(201).json(newTask);
    } catch (error:any) {
      res.status(400).json({ message: error.message });
    }
  };
  
  export const updateTask = async (req: Request, res: Response): Promise<void> => {
    const taskId = req.params.id;
    const { title, description, status } = req.body;
    try {
      const updatedTask = await Task.findByIdAndUpdate(taskId, { title, description, status }, { new: true });
      if (!updatedTask) {
        res.status(404).json({ message: 'Task not found' });
        return;
      }
      res.status(200).json(updatedTask);
    } catch (error:any) {
      res.status(400).json({ message: error.message });
    }
  };
  
  export const deleteTask = async (req: Request, res: Response): Promise<void> => {
    const taskId = req.params.id;
    try {
      const deletedTask = await Task.findByIdAndDelete(taskId);
      if (!deletedTask) {
        res.status(404).json({ message: 'Task not found' });
        return;
      }
      res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error:any) {
      res.status(500).json({ message: error.message });
    }
  };
  
  export const getTasksByStatus = async (req: Request, res: Response): Promise<void> => {
    const status = req.params.status;
    try {
      const tasks = await Task.find({ status });
      res.status(200).json(tasks);
    } catch (error:any) {
      res.status(500).json({ message: error.message });
    }
  };

  export const searchTasksByTitle = async (req: Request, res: Response): Promise<void> => {
    const searchQuery = req.query.q as string;
    try {
      const tasks = await Task.find({ title: { $regex: searchQuery, $options: 'i' } });
      res.status(200).json(tasks);
    } catch (error:any) {
      res.status(500).json({ message: error.message });
    }
  };
  
  export const assignTask = async (req: Request, res: Response): Promise<void> => {
    const taskId = req.params.id;
    const { userId } = req.body;
    try {
      const updatedTask = await Task.findByIdAndUpdate(taskId, { assignedTo: userId }, { new: true });
      if (!updatedTask) {
        res.status(404).json({ message: 'Task not found' });
        return;
      }
      res.status(200).json(updatedTask);
    } catch (error:any) {
      res.status(400).json({ message: error.message });
    }
  };
  
  export const updateTaskStatus = async (req: Request, res: Response): Promise<void> => {
    const taskId = req.params.id;
    const { status } = req.body;
    try {
      const updatedTask = await Task.findByIdAndUpdate(taskId, { status }, { new: true });
      if (!updatedTask) {
        res.status(404).json({ message: 'Task not found' });
        return;
      }
      res.status(200).json(updatedTask);
    } catch (error:any) {
      res.status(400).json({ message: error.message });
    }
  };