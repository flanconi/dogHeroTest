import { app } from "./app";
import { dogHeroController } from "./router/dogHeroRouter";


app.get('/index', dogHeroController.filterDogWalkingByDay)
app.get('/show/:id', dogHeroController.appointmentDuration)

app.post('/create', dogHeroController.insertDogWalkingOnDB)
app.post('/start_walk/:id', dogHeroController.updateDogWalkingStatus)
app.post('/end_walk/:id', dogHeroController.endDogWalking)