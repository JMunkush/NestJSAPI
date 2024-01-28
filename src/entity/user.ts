import {Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {Role} from "./role";

@Entity({name: "users"})
export class User {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public email: string;

    @Column()
    public password: string;


    @ManyToMany(() => Role, role => role.users, {eager: true})
    @JoinTable({
        name: 'user_roles', // Имя таблицы связи
        joinColumn: { // для текущей id
            name: 'user_id', // Имя столбца для текущей сущности (User)
            referencedColumnName: 'id', // Имя столбца, на который ссылается (в данном случае, 'id' сущности User)
        },
        inverseJoinColumn: { // для для сущности Role
            name: 'role_id', // Имя столбца для сущности Role
            referencedColumnName: 'id', // Имя столбца, на который ссылается (в данном случае, 'id' сущности Role)
        },
    })
    roles: Array<Role>;

}