import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';

import { Student } from '../student/student.model';

interface GradeCreationAttrs {
    idStudent: number;
    gradeValue: number;
    subject: string;
}

@Table({ tableName: 'grade' })
export class Grade extends Model<Grade, GradeCreationAttrs> {
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ForeignKey(() => Student)
    @Column({ type: DataType.SMALLINT, allowNull: false })
    idStudent: number;

    @Column({ type: DataType.SMALLINT, allowNull: false })
    gradeValue: number;

    @Column({ type: DataType.STRING, allowNull: false })
    subject: string;

    @BelongsTo(() => Student)
    student: Student;
}