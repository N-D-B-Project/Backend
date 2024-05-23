import { Module } from "@nestjs/common";
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from "./modules/auth/auth.module";
import { config } from "./modules/config";
import { DatabaseModule } from "./modules/database/database.module";
import { DiscordModule } from "./modules/discord/discord.module";
import { UserModule } from "./modules/user/user.module";

@Module({
	imports: [ConfigModule.forRoot({
    load: [config],
    isGlobal: true 
  }), DatabaseModule, AuthModule, DatabaseModule, UserModule, DiscordModule],
})
export class AppModule {}
