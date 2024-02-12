import { Module, forwardRef } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { Student } from './student.model';
import { Grade } from '../grade/grade.model';
import { GradeModule } from '../grade/grade.module';

@Module({
  	providers: [StudentService],
  	controllers: [StudentController],
	imports: [
		SequelizeModule.forFeature([Student, Grade]),
		forwardRef(() => GradeModule),
	],
	exports: [
		StudentService,
	]
})
export class StudentModule {}
