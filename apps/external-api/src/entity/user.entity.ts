import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm'

@Entity('user')
@Unique(['email'])
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'varchar',
    length: 320,
  })
  email: string
}
