import { TasksRepository } from '../repositories/TasksRepository';
import { INewTask } from '../types/types';
import { FoldersService } from './FoldersService';

class TasksService {

  async getAllTasks(userId: string, folderId: string) {
    const tasks = await new TasksRepository().findAllTasks(userId, folderId);
    return tasks;
  }

  async createTask(newTask: INewTask) {
    const {userId, folderId, description, status} = newTask;
    await new FoldersService().validateFolderOwenership(userId, folderId);
    try {
      await new TasksRepository().create({
        userId, folderId, description, status
      });
    }
    catch {
      throw new Error('The system was unable to create the folder');
    }
    return null;
  }

}

export {TasksService};
