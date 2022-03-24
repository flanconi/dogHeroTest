import { app } from "./app";
import { dogHeroController } from "./router/dogHeroRouter";

app.post('/create', dogHeroController.insertDogWalkingOnDB)