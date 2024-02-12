import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { StudentPerformanceI, StudentService } from './student.service';

@Controller('student')
export class StudentController {

    constructor(private studentService: StudentService) {}

    /** Получение успеваемость студента по его коду */
    @Get('/statistic/:personalCode')
    getStudentPerformance(@Param('personalCode') personalCode: string): Promise<StudentPerformanceI> {
        return this.studentService.getStudentPerformance(personalCode);
    }
}
