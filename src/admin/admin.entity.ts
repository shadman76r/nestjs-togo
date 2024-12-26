import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Admin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string; // Admin's unique email address (NOT NULL)

  @Column()
  password: string; // Admin's password (NOT NULL)

  @Column({ default: false })
  isVerified: boolean; // Tracks whether the admin is verified
}
