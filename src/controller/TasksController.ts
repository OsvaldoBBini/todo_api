import { Request, Response } from 'express';
import { TasksService } from '../services/TaskService';

class TasksController {

  async listAllTasksByFolderId(request: Request, response: Response) {
    try {
      const { userId } = request;
      const { folderId } = request.params;
      const tasks = await new TasksService().getAllTasks(userId, folderId);
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

}

export {TasksController};
