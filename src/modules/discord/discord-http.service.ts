import type { Config } from "@/modules/config/types";
import { DiscordAPIUrl } from "@/types/constants";
import { resolveAxiosObservable } from "@/utils/ResolveAxiosObservable";
import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import type { AxiosResponse } from "axios";
import type { PartialChannelData } from "discord.js";
import type { GuildDTO } from "../guild/guild.dto";
import type { IDiscordHttpService } from "./interfaces/IDiscordHttpService.interface";

@Injectable()
export class DiscordHttpService implements IDiscordHttpService {
	public constructor(
		private readonly httpService: HttpService,
		private readonly config: ConfigService,
	) {}

	public async fetchBotGuilds(): Promise<AxiosResponse<GuildDTO[], unknown>> {
		return await resolveAxiosObservable<AxiosResponse<GuildDTO[], unknown>>(
			this.httpService.get(`${DiscordAPIUrl}/users/@me/guilds`, {
				headers: {
					Authorization: `Bot ${
						this.config.getOrThrow<Config["Discord"]>("Discord").Token
					}`,
				},
			}),
		);
	}

	public async fetchUserGuilds(
		accessToken: string,
	): Promise<AxiosResponse<GuildDTO[], unknown>> {
		return await resolveAxiosObservable<AxiosResponse<GuildDTO[], unknown>>(
			this.httpService.get(`${DiscordAPIUrl}/users/@me/guilds`, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			}),
		);
	}
	public async fetchGuildChannels(
		guildId: string,
	): Promise<AxiosResponse<PartialChannelData, unknown>> {
		return await resolveAxiosObservable<
			AxiosResponse<PartialChannelData, unknown>
		>(
			this.httpService.get(`${DiscordAPIUrl}/guilds/${guildId}/channels`, {
				headers: {
					Authorization: `Bot ${
						this.config.getOrThrow<Config["Discord"]>("Discord").Token
					}`,
				},
			}),
		);
	}
}
