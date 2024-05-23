import { APIVersion } from "discord-api-types/v10"

export enum Services {
  Prisma = "PRISMA_SERVICE",
  Auth = "AUTH_SERVICE",
  User = "USER_SERVICE",
  Database = "DATABASE_SERVICE",
	Discord = "DISCORD_SERVICE",
  Discord_HTTP = "DISCORD_HTTP_SERVICE",
}

export enum Routes {
  Auth = "auth",
  Discord = "discord"
}

export enum Cookies {
  JWT = "N-D-B_JWT_TOKEN"
}

export const DiscordAPIUrl = `https://discord.com/api/v${APIVersion}`;

export const isInProduction = false;