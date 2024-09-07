import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamMember } from './team-member.entity';
import { TeamService } from './team.service';
import { TeamController } from './team.controller';
import { User } from 'src/auth/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TeamMember,User])],
  providers: [TeamService],
  controllers: [TeamController],
})
export class TeamModule {}
