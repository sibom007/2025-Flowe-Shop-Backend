import { Role } from "@prisma/client"

export type Tlogin = {
    email: string
    password: string
}

export type TToken = {
    id: string
    name: string
    email: string
    role: Role;
    createdAt: Date
    updatedAt: Date
}

export type TChangePassword = {
  oldPassword: string;
  newPassword: string;
};