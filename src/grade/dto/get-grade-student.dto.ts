export class GetGradeStudentDto {
    readonly id?: number;
    readonly idStudent: number;
    readonly gradeValue: number;
    readonly subject: string;
    readonly createdAt?: string;
    readonly updatedAt?: string;
    
    readonly 'student.id'?: number;
    readonly 'student.personalCode'?: string;
    readonly 'student.name'?: string;
    readonly 'student.lastName'?: string;
    readonly 'student.createdAt'?: string;
    readonly 'student.updatedAt'?: string;
}