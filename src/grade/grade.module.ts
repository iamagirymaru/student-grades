import { Module, forwardRef } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { GradeService } from './grade.service';
import { GradeController } from './grade.controller';
import { Grade } from './grade.model';
import { Student } from '../student/student.model';
import { StudentModule } from '../student/student.module';

@Module({
    providers: [GradeService],
    controllers: [GradeController],
	imports: [
		SequelizeModule.forFeature([Student, Grade]),
		forwardRef(() => StudentModule),
	],
	exports: [
		GradeService,
	]
})
export class GradeModule {}
