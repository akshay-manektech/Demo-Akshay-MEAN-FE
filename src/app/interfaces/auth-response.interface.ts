import { UserRole } from "../enums/user-role.enum";

export interface AuthResponse {
    _id: string,
    fullName: string,
    email: string,
    password: string,
    role: UserRole,
    isActive: string,
    isDeleted: string,
    createdAt: string,
    updatedAt: string,
    token: string
}