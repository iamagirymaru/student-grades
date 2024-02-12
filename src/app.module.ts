import { Module } from '@nestjs/common'
import { SequelizeModule } from "@nestjs/sequelize";
import { ConfigModule } from '@nestjs/config';

import { StudentModule } from './student/student.module';
import { Student } from './student/student.model';
import { GradeModule } from './grade/grade.module';
import { Grade } from './grade/grade.model';
import { GradeNatsModule } from './grade-nats/grade-nats.module';

@Module({
    controllers: [],
    providers: [],
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env',
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            models: [Student, Grade],
            autoLoadModels: true,
        }),
        StudentModule,
        GradeModule,
        GradeNatsModule,
    ]
})
export class AppModule {}