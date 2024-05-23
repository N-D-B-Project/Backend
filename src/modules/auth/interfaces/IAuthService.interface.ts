import type { UserEntity } from "@/modules/database/entities";
import type { UserDTO } from "../../user/user.dto";
import type { JwtPayload } from "../types";

export interface IAuthService {
	validateUser(details: UserDTO): Promise<UserEntity>;
	get(payload: JwtPayload): Promise<UserEntity>;
	login(payload: JwtPayload): Promise<string>;
}
