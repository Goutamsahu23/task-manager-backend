import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Task } from './tasks.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TeamMember } from '../team/team-member.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,

    @InjectRepository(TeamMember)
    private teamMemberRepository: Repository<TeamMember>,
    @InjectRepository(User)
    private userRepository:Repository<User>
  ) {}

 
  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { description, dueDate, assigneeId, teamId } = createTaskDto;
  
    let assignee = null;
    let team = null;
  
    // If teamId is provided, validate the team
    if (teamId) {
      team = await this.teamMemberRepository.findOne({
        where: { id: teamId },
        relations: ['users'], // Fetch the users in the team
      });
  
      if (!team) {
        throw new NotFoundException(`Team with ID ${teamId} not found`);
      }
    }
  
    // If assigneeId is provided, validate if the assignee belongs to the team
    if (assigneeId) {
      assignee = await this.userRepository.findOne({ where: { id: assigneeId } });
  
      if (!assignee) {
        throw new NotFoundException(`User with ID ${assigneeId} not found`);
      }
  
      if (team && !team.users.some(user => user.id === assigneeId)) {
        throw new BadRequestException(`User with ID ${assigneeId} does not belong to team with ID ${teamId}`);
      }
    }
  
    // Create and save the task
    const task = this.taskRepository.create({
      description,
      dueDate,
      assignee, // Assignee is optional
      team, // Team is optional
    });
  
    return this.taskRepository.save(task);
  }
  

  async findAllTasks(): Promise<Task[]> {
    return this.taskRepository.find(
      {
      relations: ['assignee', 'assignee.team'],
    });
  }

  async assignTask(taskId: number, assigneeId: number, teamId: number): Promise<Task> {

    const task = await this.taskRepository.findOne({ where: { id: taskId }, relations: ['team'] });
    if (!task) {
      throw new NotFoundException('Task not found');
    }
  
    // Find the team by teamId
    const team = await this.teamMemberRepository.findOne({
      where: { id: teamId },
      relations: ['users'], 
    });
    if (!team) {
      throw new NotFoundException(`Team with ID ${teamId} not found`);
    }
  
    const assignee = await this.userRepository.findOne({
      where: { id: assigneeId },
    });
    if (!assignee) {
      throw new NotFoundException('Assignee not found');
    }
  
    // Check if the assignee belongs to the team
    const isUserInTeam = team.users.some(user => user.id === assigneeId);
    if (!isUserInTeam) {
      throw new BadRequestException(`User with ID ${assigneeId} does not belong to team with ID ${teamId}`);
    }
  
    // Assign the task to the assignee and team
    task.assignee = assignee;
    task.team = team;
  
    return this.taskRepository.save(task);
  }
  

  async updateTask(
    taskId: number,
    updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    const result = await this.taskRepository.update(taskId, updateTaskDto);

    // Check if the update operation affected any rows
    if (result.affected === 0) {
      throw new NotFoundException('Task not found');
    }

    return this.taskRepository.findOne({
      where: { id: taskId },
      relations: ['assignee', 'team'], 
    });
  }
}
