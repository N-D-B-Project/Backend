import type { UserEntity } from "@/modules/database/entities";
import { Services } from "@/types/constants";
import { Inject, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import type { IUserService } from "../user/interfaces/IUserService";
import type { UserDTO } from "../user/user.dto";
import type { IAuthService } from "./interfaces/IAuthService.interface";
import type { JwtPayload } from "./types";

@Injectable()
export class AuthService implements IAuthService {
	public constructor(
		@Inject(Services.User) private readonly userService: IUserService,
		private readonly jwtService: JwtService,
	) {}

	public async validateUser(details: UserDTO): Promise<UserEntity> {
		const user = await this.userService.get(details.id);
		return user
			? await this.userService.update(details)
			: ((await this.userService.create(details)) as UserEntity);
	}

	public async get(payload: JwtPayload) {
		const user = await this.userService.get(payload.id);
		return user;
	}

	public async login(payload: JwtPayload): Promise<string> {
		const token = await this.jwtService.signAsync({ payload });
		return token;
	}
}
