import type RepositoryInterface from "../../../shared/repository.interface";
import type Server from "../entity/server.entity";

export default interface ServerRepositoryInterface extends RepositoryInterface<Server> {
	findWithParam(param: { name?: string; id?: string; slug?: string }): Promise<Server>;
}
