import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TeamMember } from './team-member.entity';
import { CreateTeamMemberDto } from './dto/create-team-member.dto';
import { User } from '../auth/user.entity';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(TeamMember)
    private teamMemberRepository: Repository<TeamMember>,
    
    @InjectRepository(User)
    private userRepository: Repository<User>,  
  ) {}

  async createTeamMember(createTeamMemberDto: CreateTeamMemberDto): Promise<TeamMember> {
    const { name, members } = createTeamMemberDto;


    const users = await this.userRepository.findByIds(members);

    // Create new team member
    const teamMember = this.teamMemberRepository.create({
      name,
      users,  
    });

    return this.teamMemberRepository.save(teamMember);
  }

  async findAllTeamMembers(): Promise<TeamMember[]> {
    return this.teamMemberRepository.find({ relations: ['users'] });
  }
}
