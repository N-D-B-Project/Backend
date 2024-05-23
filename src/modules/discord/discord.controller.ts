import { AuthUser } from "@/common/decorators/AuthUser.decorator";
import { JwtAuthGuard } from "@/common/guards/Jwt.guard";
import type { UserEntity } from "@/modules/database/entities";
import { Routes, Services } from "@/types/constants";
import { Controller, Get, Inject, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import type { IDiscordService } from "./interfaces/IDiscordService.interface";

@ApiTags(Routes.Discord)
@Controller(Routes.Discord)
export class DiscordController {
	public constructor(@Inject(Services.Discord) private readonly discordService: IDiscordService) {}

	@Get("botGuilds")
	public async getBotGuilds() {
		return await this.discordService.getBotGuilds();
	}

	@Get("userGuilds")
	@UseGuards(JwtAuthGuard)
	public async getUserGuilds(@AuthUser() user: UserEntity) {
		return await this.discordService.getUserGuilds(user.APIUser.accessToken);
	}

	@Get("mutualGuilds")
	@UseGuards(JwtAuthGuard)
	public async geMutualGuilds(@AuthUser() user: UserEntity) {
		return await this.discordService.getMutualGuilds(user.APIUser.accessToken);
	}
}
