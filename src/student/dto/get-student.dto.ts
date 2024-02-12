export class GetStudentDto {
    readonly id?: number;
    readonly personalCode: string;
    readonly name: string;
    readonly lastName: string;
    readonly createdAt?: string;
    readonly updatedAt?: string;
}