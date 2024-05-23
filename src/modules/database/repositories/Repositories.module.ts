
import { Global, Module, type Provider } from "@nestjs/common";
import { Repositories } from "../types/constants";
import { APIUserRepository } from "./APIUser.repository";

const provider: Provider<APIUserRepository> = {
		provide: Repositories.APIUser,
		useClass: APIUserRepository,
	};

@Global()
@Module({
	providers: [provider],
	exports: [provider],
})
export class RepositoriesModule {}
