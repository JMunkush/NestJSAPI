import {Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./user";


@Entity({name: "roles"})
export class Role {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany(() => User, user => user.roles, {lazy: true})
    @JoinTable({
        name: 'user_roles', // Имя таблицы связи
        joinColumn: { // для текущей id
            name: 'role_id', // Имя столбца для текущей сущности (User)
            referencedColumnName: 'id', // Имя столбца, на который ссылается (в данном случае, 'id' сущности User)
        },
        inverseJoinColumn: { // для для сущности Role
            name: 'user_id', // Имя столбца для сущности Role
            referencedColumnName: 'id', // Имя столбца, на который ссылается (в данном случае, 'id' сущности Role)
        },
    })
    users: Array<User>;

}