import type { IAsyncLocalStorage } from "../als/interfaces/IAsyncLocalStorage";
import type { IAPIUserRepository } from "../repositories/interfaces/IAPIUserRepository";

export interface IDatabaseService {
	AlsRepo(): IAsyncLocalStorage;
	APIUserRepo(): IAPIUserRepository;
}
