import { Injectable, OnModuleInit } from '@nestjs/common';
import {  StringCodec, connect } from 'nats';

import { GradeService } from '../grade/grade.service';
import { StudentService } from '../student/student.service';

// Сервис, получающий информацию с помощью nats об оценках и студентах

@Injectable()
export class GradeNats implements OnModuleInit {

	constructor(
		private gradeService: GradeService,
		private studentService: StudentService,
	) {}

    async onModuleInit() {
        setImmediate(async () => {
            // Создаем подключение к сервису оценок и студентов
            const client = await connect({ servers: 'nats://192.162.246.63:4222' });
            console.log(`Connected to a nats server version ${client.info.version}`);

            // Подписываемся на получение информации об оценках
            const subscribe = client.subscribe('students.v1.graded');
            for await (const message of subscribe) {
                const gradeRespInfo = JSON.parse(StringCodec().decode(message.data));
                if (gradeRespInfo?.data?.personalCode) {
                    let idStudent = 0;

                    // Проверяем, есть ли в базе информация о студенте 
                    const studentDBInfo = await this.studentService.getStudent(gradeRespInfo.data.personalCode);
                    if (!studentDBInfo) { // Создаем студента
                        // Получаем информацию о студенте от сервиса nats
                        const studentRespInfo = await getStudentInfo({ personalCode: gradeRespInfo.data.personalCode });
                        const student = await this.studentService.createStudent(studentRespInfo.data);
                        idStudent = student.id;
                    } else {
                        idStudent = studentDBInfo.id;
                    }
                    
                    // Сохраняем информацию об оценке в базу
                    await this.gradeService.createGrade({
                        idStudent: idStudent,
                        gradeValue: gradeRespInfo.data.grade,
                        subject: gradeRespInfo.data.subject,
                    });
                }	
            }

            // Получение информации о студенте по его коду
            async function getStudentInfo(data: { personalCode: string }): Promise<any> {
                const studentRespInfo = JSON.parse(StringCodec().decode((await client.request('students.v1.get', JSON.stringify(data))).data));
            
                return studentRespInfo;
            }
        });
    }
}

