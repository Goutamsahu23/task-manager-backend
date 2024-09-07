import {
    Controller,
    Get,
    Post,
    Patch,
    Param,
    Body,
    UseGuards,
  } from '@nestjs/common';
  import { TasksService } from './tasks.service';
  import { CreateTaskDto } from './dto/create-task.dto';
  import { JwtAuthGuard } from '../auth/auth.guard';
  import { UpdateTaskDto } from './dto/update-task.dto';
  
  @UseGuards(JwtAuthGuard)
  @Controller('tasks')
  export class TasksController {
    constructor(private tasksService: TasksService) {}
  
    @Post()
    create(@Body() createTaskDto: CreateTaskDto) {
      return this.tasksService.createTask(createTaskDto);
    }
  
    @Get()
    findAll() {
      return this.tasksService.findAllTasks();
    }
  
    @Patch('/:id/assign')
    assignTask(
      @Param('id') taskId: number,
      @Body('assigneeId') assigneeId: number,
      @Body('teamId') teamId: number,
    ) {
      return this.tasksService.assignTask(taskId, assigneeId,teamId);
    }
  
    @Patch('/:id')
    updateTask(
      @Param('id') taskId: number,
      @Body() updateTaskDto: UpdateTaskDto,
    ) {
      return this.tasksService.updateTask(taskId, updateTaskDto);
    }
  }
  