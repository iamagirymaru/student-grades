import { Controller, Get, Param } from '@nestjs/common';

import { GradeService, StudentGradeI } from './grade.service';

@Controller('grade')
export class GradeController {
    constructor(private gradeService: GradeService) {}

    /** Получение списка оценок с информацией о студентах с пагинацией */
    @Get('/log/:page/:limit')
    getGradesInfoWithPagination(@Param('page') page: number, @Param('limit') limit: number): Promise<StudentGradeI[]> {
        return this.gradeService.getGradesInfoWithPagination(page, limit);
    }
}
