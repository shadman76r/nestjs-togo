import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Property } from './property.entity';

@Entity()
export class Bid {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal', { nullable: false })
  amount: number;

  @Column({ nullable: false })
  bidder: string; // Username of the bidder

  @ManyToOne(() => Property, (property) => property.id, { nullable: false, onDelete: 'CASCADE' })
  property: Property;
}
