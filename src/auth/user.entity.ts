import { Entity, Column, PrimaryGeneratedColumn, OneToMany, UpdateDateColumn, CreateDateColumn, ManyToOne } from 'typeorm';
import { TeamMember } from '../team/team-member.entity';  // Correct import
import { Task } from 'src/tasks/tasks.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ type: 'varchar', length: 255, unique: true })
    username: string;

    @Column({ type: 'varchar', length: 255 })
    password: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;


    @ManyToOne(() => TeamMember, team => team.users)
    team: TeamMember;


    @OneToMany(() => Task, task => task.assignee)
    tasks: Task[];
}
