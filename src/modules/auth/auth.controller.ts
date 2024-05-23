import { AuthUser } from "@/common/decorators/AuthUser.decorator";
import { DiscordAuthGuard } from "@/common/guards/Discord.guard";
import { JwtAuthGuard } from "@/common/guards/Jwt.guard";
import type { Config } from "@/modules/config/types";
import type { UserEntity } from "@/modules/database/entities";
import { Cookies, Routes, Services, isInProduction } from "@/types/constants";
import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Redirect,
  Req,
  Res,
  UseGuards,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ApiTags } from "@nestjs/swagger";
import type { FastifyReply, FastifyRequest } from "fastify";
import type { IAuthService } from "./interfaces/IAuthService.interface";

@ApiTags(Routes.Auth)
@Controller(Routes.Auth)
export class AuthController {
	public constructor(
		@Inject(Services.Auth) private readonly authService: IAuthService,
		private readonly configService: ConfigService,
	) {}

	@Get("login")
	@UseGuards(DiscordAuthGuard)
	public login(): void {}

	@Get("redirect")
	@HttpCode(HttpStatus.CREATED)
	@UseGuards(DiscordAuthGuard)
	@Redirect(
		isInProduction
			? "http://localhost:4401/@me"
			: "http://localhost:4400/auth/status",
	)
	public async redirect(
		@Req() req: FastifyRequest,
		@Res() res: FastifyReply,
	): Promise<void> {
		const jwt = await this.authService.login(req.user);
		res.cookie(Cookies.JWT, jwt, {
			httpOnly: true,
			maxAge: this.configService.getOrThrow<Config["API"]>("API").MaxAge,
			path: "/",
		});
	}

	@Get("status")
	@UseGuards(JwtAuthGuard)
	public status(@AuthUser() user: UserEntity): UserEntity {
		return user;
	}
}
