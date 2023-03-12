/* eslint-disable linebreak-style */
import { prisma } from "@/lib/prisma";
import { FastifyRequest, FastifyReply } from "fastify";
import { hash } from "bcryptjs";
import { z } from "zod";
import { registerServices } from "@/services/register";


export async function RegisterController(request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6)
    });

    const { name, email, password} = registerBodySchema.parse(request.body);

    try {
        await registerServices({
            name,
            email,
            password
        });
    } catch (error) {
        return reply.status(409).send();
    }
    return reply.status(201).send();
}