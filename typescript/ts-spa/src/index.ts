import { Router } from "./routing";
import {Repository} from "./repository";
import { services } from "./domains/domains";
const repository = Repository.getInstance();
// event emitter to be loaded
const routerInstance = new Router(services); // load the router
