import {Table, Column, Model} from 'sequelize-typescript';

@Table({tableName: "user"})
export class User extends Model<User> {

    @Column({primaryKey: true, allowNull: false})
    email: string;

    @Column({allowNull: true, unique: true})
    username: string;

    @Column({allowNull: true})
    password: string;

    @Column
    surname: string;

    @Column({allowNull: false})
    name: string;
}

