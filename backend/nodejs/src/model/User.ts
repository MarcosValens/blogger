import {Table, Column, Model} from 'sequelize-typescript';

@Table
export class User extends Model<User> {

    @Column({primaryKey: true, allowNull: false})
    email: string;

    @Column({allowNull: false, unique: true})
    username: string;

    @Column({allowNull: false})
    password: string;

}
