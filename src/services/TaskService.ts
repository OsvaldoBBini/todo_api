import { TasksRepository } from '../repositories/TasksRepository';
import { INewTask } from '../types/types';
import { FoldersService } from './FoldersService';

class TasksService {

  async getTaskDetails(userId: string, folderId: string, taskId: string) {
    await new FoldersService().validateFolderOwenership(userId, folderId);
    const task = await new TasksRepository().findTaskDetails(userId, folderId, taskId);
    return task;
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

  async updateTaskInfos(userId: string, folderId: string, taskId: string, description: string, status: boolean) {
    await new FoldersService().validateFolderOwenership(userId, folderId);
    const updateInfos = {description, status};
    try {
      await new TasksRepository().update(userId, folderId, taskId, updateInfos);
    } catch {
      throw new Error('The system was unable to upload task\'s data');
    }
    return null;
  }

}

export {TasksService};
