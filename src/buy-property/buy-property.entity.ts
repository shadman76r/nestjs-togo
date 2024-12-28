import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BuyProperty {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column('decimal', { nullable: false })
  price: number;

  @Column({ nullable: false })
  location: string;

  @Column({ default: false })
  isSold: boolean;

  @Column({ nullable: true })
  buyer: string;
}
