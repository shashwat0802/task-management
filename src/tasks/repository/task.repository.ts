import { EntityRepository, Repository } from 'typeorm';
import { CreateTaskDto } from '../dto/create-task.dto';
import { FilterTaskDto } from '../dto/filter-task.dto';
import { Task } from '../entity/tasks.entity';
import { TaskStatus } from '../task-status.enum';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async getTasks(filterTaskDto: FilterTaskDto): Promise<Task[]> {
    const { search, status } = filterTaskDto;
    const query = this.createQueryBuilder('task');
    if (search) {
      query.andWhere(
        'LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search)',
        { search },
      );
    }
    if (status) {
      query.andWhere('title.status = :status', { status });
    }

    const tasks = query.getMany();
    return tasks;
  }

  async createTask(createTaskDto: CreateTaskDto) {
    const { title, description } = createTaskDto;
    const task = this.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });

    await this.save(task);
    return task;
  }
}
