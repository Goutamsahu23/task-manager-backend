import { Controller, Post, Get, Body, UseGuards } from '@nestjs/common';
import { TeamService } from './team.service';
import { CreateTeamMemberDto } from './dto/create-team-member.dto';
import { JwtAuthGuard } from '../auth/auth.guard';  // Ensure this guard exists

@UseGuards(JwtAuthGuard)  // Protect routes with JWT
@Controller('team')
export class TeamController {
  constructor(private teamService: TeamService) {}

  @Post()
  async createTeamMember(@Body() createTeamMemberDto: CreateTeamMemberDto) {
    return this.teamService.createTeamMember(createTeamMemberDto);
  }

  @Get()
  async findAllTeamMembers() {
    return this.teamService.findAllTeamMembers();
  }
}
