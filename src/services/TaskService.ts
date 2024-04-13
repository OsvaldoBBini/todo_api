import { TasksRepository } from '../repositories/TasksRepository';
import { INewTask } from '../types/types';
import { FoldersService } from './FoldersService';

class TasksService {

  async getTaskDetails(userId: string, folderId: string, taskId: string) {
    await new FoldersService().validateFolderOwenership(userId, folderId);
    try {
      const task = await new TasksRepository().findTaskDetails(userId, folderId, taskId);
      return task;
    }
    catch {
      throw new Error('The system was unable load task\'s detail');
    }
  }

  async createTask(newTask: INewTask) {
    const {userId, folderId, description, status} = newTask;
    await new FoldersService().validateFolderOwenership(userId, folderId);
    try {
      await new TasksRepository().create({
        userId, folderId, description, status
      });
      return null;
    }
    catch {
      throw new Error('The system was unable create the task');
    }
  }

  async updateTaskInfos(userId: string, folderId: string, taskId: string, description: string, status: boolean) {
    await new FoldersService().validateFolderOwenership(userId, folderId);
    const updateInfos = {description, status};
    try {
      await new TasksRepository().update(userId, folderId, taskId, updateInfos);
      return null;
    } catch {
      throw new Error('The system was unable to upload task\'s data');
    }
  }

  async deleteTask(userId: string, folderId: string, taskId: string){
    await new FoldersService().validateFolderOwenership(userId, folderId);
    try {
      await new TasksRepository().delete(userId, folderId, taskId);
      return null;
    } catch {
      throw new Error('The system was unable to delete the task');
    }
  }

}

export {TasksService};
