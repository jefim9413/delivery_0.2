import { Router } from "express";
import { CreateClientController } from "./modules/cliets/useCases/createClient/CreateClientController";

const routes = Router();
const createClientController = new CreateClientController();
routes.post("/client", createClientController.handle);

export { routes };
