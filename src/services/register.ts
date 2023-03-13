/* eslint-disable linebreak-style */
import { prisma } from "@/lib/prisma";
import { PrismaUserRepository } from "@/repositories/prisma-users-repository";
import { hash } from "bcryptjs";

interface ResisterServicesRequest {
  name: string,
  email: string
  password: string
}

export async function registerServices({
    name,
    email,
    password
}:ResisterServicesRequest) {
    const password_hash = await hash(password,6);

    const isEmailExists = await prisma.user.findUnique({
        where: {
            email
        }
    });

    if(isEmailExists) {
        throw new Error("E-mail already exists");
    }

    const prismaUserRepository = new PrismaUserRepository();

    await prismaUserRepository.create({
        name,
        email,
        password_hash
    });
}