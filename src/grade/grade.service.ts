import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as _ from 'lodash';

import { Grade } from './grade.model';
import { CreateGradeDto } from './dto/create-grade.dto';
import { StudentI } from '../student/student.service';
import { GetGradeDto } from './dto/get-grade.dto';
import { GetGradeStudentDto } from './dto/get-grade-student.dto';

export interface StudentGradeI {
    date: string,
    subject: string,
    grade: number,
    student: StudentI
};

@Injectable()
export class GradeService {
    constructor(
        @InjectModel(Grade) private gradeRepository: typeof Grade,
    ) {}

    /** Создание оценки */
    async createGrade(dto: CreateGradeDto): Promise<GetGradeDto> {
        const grade = await this.gradeRepository.create(dto);
        return grade;
    }

    /** Получение списка оценок по id студента */
    async getGradesByStudentId(idStudent: number): Promise<GetGradeDto[]> {
        const aGrade = await this.gradeRepository.findAll({
            where: { idStudent },
            raw: true,
        });

        return aGrade;
    }
    
    /** Получение списка всех оценок */
    async getAllGrades(): Promise<GetGradeStudentDto[]> {
        const aGrade = await this.gradeRepository.findAll({
            order: [
                ['createdAt', 'ASC'],
            ],
            include: { all: true },
            raw: true,
        });

        return aGrade;
    }

    /** Получение списка оценок с информацией о студентах с пагинацией */
    async getGradesInfoWithPagination(page: number, limit: number): Promise<StudentGradeI[]> {
        const aStudentGrade: StudentGradeI[] = [];

        const aGrade = await this.getAllGrades();
           
        const aGradePagination = aGrade.slice((page - 1) * limit, page * limit);

        for (const gradeInfo of aGradePagination) {
            aStudentGrade.push({
                date: gradeInfo.createdAt,
                subject: gradeInfo.subject,
                grade: gradeInfo.gradeValue,
                student: {
                    personalCode: gradeInfo['student.personalCode'],
                    name: gradeInfo['student.name'],
                    lastName: gradeInfo['student.lastName'],
                }
            });
        }

        return aStudentGrade;
    }
}
