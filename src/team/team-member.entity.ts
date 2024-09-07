import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, UpdateDateColumn, CreateDateColumn } from 'typeorm';
import { Task } from '../tasks/tasks.entity';
import { User } from 'src/auth/user.entity';

@Entity()
export class TeamMember {
  @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;


    @OneToMany(() => User, user => user.team)
    users: User[];

    @OneToMany(() => Task, task => task.team)
    tasks: Task[];
}
