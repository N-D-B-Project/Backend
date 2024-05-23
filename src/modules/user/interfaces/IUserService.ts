import type { UserEntity } from "@/modules/database/entities";
import type { UserDTO } from "../user.dto";

export interface IUserService {
	create(details: UserDTO): Promise<void | UserEntity>;
	get(userId: string): Promise<UserEntity>;
	update(details: UserDTO): Promise<UserEntity>;
}
