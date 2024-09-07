import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';
  import { TeamMember } from '../team/team-member.entity';
import { User } from 'src/auth/user.entity';
  
  @Entity()
  export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text' })
    description: string;

    @Column({ type: 'date', nullable: true })
    dueDate: Date;

    @Column({ type: 'varchar', length: 50, default: 'Pending' })
    status: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    // A task is assigned to one user (assignee)
    @ManyToOne(() => User, user => user.tasks)
    assignee: User;

    @ManyToOne(() => TeamMember, team => team.tasks)
    team: TeamMember;
  }
  