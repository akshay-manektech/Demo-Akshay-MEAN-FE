import { UserRole } from "../enums/user-role.enum";

export interface UserNote {
    _id: string,
    title: string,
    content: string,
    user: string,
    isArchived: boolean,
    isDeleted: boolean,
    createdAt: Date,
    updatedAt: Date,
}