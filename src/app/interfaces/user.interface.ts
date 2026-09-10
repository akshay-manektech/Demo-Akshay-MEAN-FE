import { UserRole } from "../enums/user-role.enum"

export interface UserInterface {
    _id: number
    fullName: string,
    email: string
    password: string,
    role: UserRole,
    isActive: boolean
    isDeleted: boolean,
    createdAt: Date,
    updatedAt: Date
}