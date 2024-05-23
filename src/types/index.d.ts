import { UserEntity } from "@/modules/database";
import "fastify";

declare module "fastify" {
  export interface FastifyRequest {
    user: UserEntity
  }
}