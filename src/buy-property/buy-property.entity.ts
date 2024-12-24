import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BuyProperty {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  location: string;

  @Column()
  contact: string;

  @Column({ nullable: true })
  filePath: string;

  @Column()
  purchaseDate: Date; // Date when the property was bought
}
