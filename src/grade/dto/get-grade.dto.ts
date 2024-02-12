export class GetGradeDto {
    readonly id?: number;
    readonly idStudent: number;
    readonly gradeValue: number;
    readonly subject: string;
    readonly createdAt?: string;
    readonly updatedAt?: string;
}