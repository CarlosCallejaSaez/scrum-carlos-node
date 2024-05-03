import { Request, Response } from 'express';
import Task from '../models/taskModel';
import { getIssuesFromJira } from '../services/jiraService';

export const getAllTasks = async (req: Request, res: Response): Promise<void> => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error:any) {
    res.status(500).json({ message: error.message });
  }
};

export const syncTasksFromJira = async (req: Request, res: Response): Promise<void> => {
  try {
    const jiraIssues = await getIssuesFromJira();
    const tasks = await Task.create(jiraIssues.map((issue: any) => ({
      title: issue.fields.summary,
      description: issue.fields.description,
      status: issue.fields.status.name.toLowerCase()
    })));
    res.status(201).json(tasks);
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