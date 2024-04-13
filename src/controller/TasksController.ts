import { Request, Response } from 'express';
import { TasksService } from '../services/TaskService';

class TasksController {

  async showTask(request: Request, response: Response) {
    try {
      const { userId } = request;
      const { folderId, taskId } = request.params;
      const tasks = await new TasksService().getTaskDetails(userId, folderId, taskId);
      return response.json(tasks);
    } catch (err) {
      return response.json({error: (err as Error).message});
    }
  }

  async createNewTask(request: Request, response: Response) {
    try {
      const { userId } = request;
      const { folderId, description, status } = request.body;
      const task = await new TasksService().createTask({userId, folderId, description, status});
      return response.status(204).json(task);
    } catch (err) {
      return response.json({error: (err as Error).message});
    }
  }

  async updateTask(request: Request, response: Response) {
    try {
      const { userId } = request;
      const { folderId, taskId } = request.params;
      const { description, status } = request.body;
      const task = await new TasksService().updateTaskInfos(userId, folderId, taskId, description, status);
      return response.status(204).json(task);
    } catch (err) {
      return response.json({error: (err as Error).message});
    }
  }

  async deleteTask(request: Request, response: Response) {
    try {
      const { userId } = request;
      const { folderId, taskId } = request.params;
      const task = await new TasksService().deleteTask(userId, folderId, taskId);
      return response.status(204).json(task);
    } catch (err) {
      return response.json({error: (err as Error).message});
    }
  }

}

export {TasksController};
