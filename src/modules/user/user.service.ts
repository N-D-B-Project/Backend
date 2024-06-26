import type { UserEntity } from "@/modules/database/entities";
import type { IAPIUserRepository } from "@/modules/database/repositories/interfaces/IAPIUserRepository";
import { Repositories } from "@/modules/database/types/constants";
import { Inject, Injectable } from "@nestjs/common";
import type { IUserService } from "./interfaces/IUserService";
import type { UserDTO } from "./user.dto";

@Injectable()
export class UserService implements IUserService {
	public constructor(@Inject(Repositories.APIUser) private readonly apiUserRepo: IAPIUserRepository) {}

	public async get(userId: string): Promise<UserEntity> {
		return await this.apiUserRepo.get(userId);
	}

	public async create(details: UserDTO): Promise<UserEntity> {
		const user = await this.get(details.id);
		if (!user) {
			await this.apiUserRepo.create(details);
		}
		return user ? user : await this.get(details.id);
	}

	public async update(details: UserDTO): Promise<UserEntity> {
		return await this.apiUserRepo.update(details);
	}
}
