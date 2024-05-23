import { Inject, Injectable } from "@nestjs/common";
import type { IAsyncLocalStorage } from "./als/interfaces/IAsyncLocalStorage";
import type { IDatabaseService } from "./interfaces/IDatabaseService";
import type { IAPIUserRepository } from "./repositories/interfaces/IAPIUserRepository";
import { Repositories } from "./types/constants";

@Injectable()
export class DatabaseService implements IDatabaseService {
	public constructor(
		@Inject(Repositories.ALS) private readonly als: IAsyncLocalStorage,
		@Inject(Repositories.APIUser) private readonly apiUser: IAPIUserRepository,
	) {}

	public AlsRepo(): IAsyncLocalStorage {
		return this.als;
	}

	public APIUserRepo(): IAPIUserRepository {
		return this.apiUser;
	}
}
