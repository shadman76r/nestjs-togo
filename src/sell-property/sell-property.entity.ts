import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SellProperty {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  price: number;

  @Column({ nullable: true })
  location: string;

  @Column({ default: false })
  isSold: boolean;

  @Column({ default: false })
  isApproved: boolean;

  @Column({ nullable: true })
  contact: string;
}
