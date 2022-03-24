import { DogHeroBusiness } from "../business/dogwalking";
import { DogHeroController } from "../controller/dogwalking";
import { DogHeroDatabase } from "../database/dogHeroDatabase";
import { DogHeroInternalServices } from "../services/dogHeroInternalServices";
import { IdGenerator } from "../services/idGenerator";

export const dogHeroController = new DogHeroController(
    new DogHeroBusiness(
        new IdGenerator(),
        new DogHeroInternalServices(),
        new DogHeroDatabase()
    )
)