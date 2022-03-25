import { app } from "./app";
import { dogHeroController } from "./router/dogHeroRouter";
import { DogHeroInternalServices } from "./services/dogHeroInternalServices";

app.post('/create', dogHeroController.insertDogWalkingOnDB)
app.get('/index', dogHeroController.filterDogWalkingByDay)
