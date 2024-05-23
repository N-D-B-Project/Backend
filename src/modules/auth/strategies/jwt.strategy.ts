import type { Config } from "@/modules/config/types";
import type { UserEntity } from "@/modules/database/entities";
import { Cookies, Services } from "@/types/constants";
import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import type { FastifyRequest } from "fastify";
import { ExtractJwt, Strategy } from "passport-jwt";
import type { IAuthService } from "../interfaces/IAuthService.interface";
import type { JwtPayload } from "../types";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "JWT") {
	constructor(
		@Inject(Services.Auth) private readonly authService: IAuthService,
		private readonly config: ConfigService,
	) {
		super({
			jwtFromRequest: ExtractJwt.fromExtractors([
				(request: FastifyRequest) => {
					const data = request?.cookies[Cookies.JWT];
					return data;
				},
			]),
			ignoreExpiration: false,
			secretOrKey: config.getOrThrow<Config["API"]>("API").JwtSecret,
		});
	}

	async validate(payload: JwtPayload): Promise<UserEntity> {
		const user = await this.authService.get(payload);
		if (!user) {
			throw new UnauthorizedException();
		}
		return user;
	}
}
