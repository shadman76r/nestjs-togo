import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Property {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column('decimal', { nullable: false })
  basePrice: number;

  @Column({ nullable: false })
  location: string;

  @Column({ default: true })
  isAvailableForBidding: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ nullable: true })
  biddingEndsAt: Date;

  @Column({ nullable: false })
  owner: string; // Owner of the property
}
