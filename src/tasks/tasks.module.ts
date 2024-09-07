import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { Task } from './tasks.entity';
import { TeamMember } from '../team/team-member.entity';
import { User } from 'src/auth/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task,TeamMember,User])],
  providers: [TasksService],
  controllers: [TasksController],
})
export class TasksModule {}
