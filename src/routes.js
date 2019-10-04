import { Router } from "express";
import Repos from "./repos";
import validate from "./validate";
const routes = Router();
routes.get("/repos", Repos.all);
routes.put("/repos", validate, Repos.remove);
export default routes;
