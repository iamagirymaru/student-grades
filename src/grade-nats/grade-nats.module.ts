import { Module } from '@nestjs/common';

import { GradeNats } from './grade-nats.service';
import { GradeModule } from '../grade/grade.module';
import { StudentModule } from '../student/student.module';

@Module({
    providers: [GradeNats],
    imports: [
        GradeModule,
        StudentModule,
    ]
})
export class GradeNatsModule {}
