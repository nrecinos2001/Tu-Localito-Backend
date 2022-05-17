import { Column, Entity, ObjectID } from "typeorm";

@Entity()
export class User { 
  @Column()
  id: ObjectID;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  lastName: string;

  @Column()
  birthDate: Date;
}
