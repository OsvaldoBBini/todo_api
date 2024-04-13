import prismaClient from '../prisma';
import { INewTask, IUpdateTaskInfo } from '../types/types';

class TasksRepository {

  async findTaskDetails(userId: string, folderId: string, taskId: string) {
    const tasks = await prismaClient.tasks.findMany({
      where: {userId, id: taskId, folderId},
      select: {
        id: true,
        description: true,
        status: true,
        subTasks: true
      }
    });
    return tasks;
  }

  async create(newTask: INewTask) {
    const task = await prismaClient.tasks.create({data: newTask});
    return task;
  }

  async update(userId: string, folderId: string, taskId: string, updateTaskInfo: IUpdateTaskInfo) {
    await prismaClient.tasks.update({where: {userId, folderId, id: taskId}, data: updateTaskInfo});
    return null;
  }

  async delete(userId: string, folderId: string, taskId: string) {
    await prismaClient.tasks.delete({where:{userId, folderId, id: taskId}});
    return null;
  }

}

export {TasksRepository};
