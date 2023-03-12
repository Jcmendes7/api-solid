/* eslint-disable linebreak-style */
import { FastifyInstance } from "fastify";
import { RegisterController } from "../controllers/register-controller";

export async function appRoute(app: FastifyInstance) {
    app.post("/", RegisterController);
}