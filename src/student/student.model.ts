import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';

import { Grade } from '../grade/grade.model';

interface StudentCreationAttrs {
    personalCode: string;
    name: string;
    lastName: string;
}

@Table({ tableName: 'student' })
export class Student extends Model<Student, StudentCreationAttrs> {
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    personalCode: string;

    @Column({ type: DataType.STRING })
    name: string;

    @Column({ type: DataType.STRING })
    lastName: string;

    @HasMany(() => Grade)
    grade: Grade[];
}