import prismaClient from '../prisma';
import { INewTask } from '../types/types';

class TasksRepository {

  async findAllTasks(userId: string, folderId: string) {
    const tasks = await prismaClient.tasks.findMany({
      where: {userId, folderId},
      select: {
        id: true,
        description: true,
        status: true
      }
    });
    return tasks;
  }

  async create(newTask: INewTask) {
    const task = await prismaClient.tasks.create({data: newTask});
    return task;
  }

}

export {TasksRepository};
