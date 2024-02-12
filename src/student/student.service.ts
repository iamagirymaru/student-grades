import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as _ from 'lodash';

import { CreateStudentDto } from './dto/create-student.dto';
import { Student } from './student.model';
import { GradeService } from '../grade/grade.service';
import { GetStudentDto } from './dto/get-student.dto';

export interface StudentI {
    personalCode: string,
    name: string,
    lastName: string,
}

interface StudentSubjectStaticticI {
    subject: string,
    maxGrade: number,
    minGrade: number,
    avgGrade: number,
    totalGrades: number,
}

export interface StudentPerformanceI {
    student: StudentI,
    statistic: StudentSubjectStaticticI[],
}

@Injectable()
export class StudentService {

    constructor(
        @InjectModel(Student) private studentRepository: typeof Student,
        
        private gradeService: GradeService,
    ) {}

    /** Создание студента */
    async createStudent(dto: CreateStudentDto): Promise<GetStudentDto> {
        const student = await this.studentRepository.create(dto);
        return student;
    }

    /** Получение списка всех студентов */
    async getAllStudents(): Promise<GetStudentDto[]> {
        const aStudent = await this.studentRepository.findAll({ raw: true });
        return aStudent;
    }

    /** Получение студента по его коду */
    async getStudent(personalCode: string): Promise<GetStudentDto> {
        const student = await this.studentRepository.findOne({
            where: { personalCode },
            raw: true,
        });

        return student;
    }

    /** Получение успеваемость студента по его коду */
    async getStudentPerformance(personalCode: string): Promise<StudentPerformanceI> {
        let studentPerformance: StudentPerformanceI = null

        const student = await this.getStudent(personalCode);

        if (student) {
            const aGrade = await this.gradeService.getGradesByStudentId(student.id);

            studentPerformance = {
                student: {
                    personalCode: student.personalCode,
                    name: student.name,
                    lastName: student.lastName,
                },
                statistic: [],
            }

            // Собираем статистику по оценкам
            const ixGradeStudent = _.groupBy(aGrade, 'subject');
            for (const subject of Object.keys(ixGradeStudent)) {
                const aGrade = ixGradeStudent[subject];
                const aiGrade = aGrade.map(grade => grade.gradeValue);

                studentPerformance.statistic.push({
                    subject: subject,
                    maxGrade: Math.max(...aiGrade),
                    minGrade: Math.min(...aiGrade),
                    avgGrade: Number((aiGrade.reduce((a, b) => a + b, 0) / aiGrade.length).toFixed(2)),
                    totalGrades: aGrade.length,
                })
            }
        } else {
            console.log(`Студент с personalCode: ${personalCode} не найден`)
        }
        
        return studentPerformance;
    }
}
