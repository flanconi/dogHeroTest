import { dogWalking } from "../model/dogWalking";
import { BaseDatabase } from "./baseDatabase";

export class DogHeroDatabase extends BaseDatabase {
    private dogWalking = 'dog_walking'

    insertDogWalking = async (input:dogWalking) => {
        try {

            await BaseDatabase.connection(this.dogWalking)
            .insert({input})

        } catch (e:any) {
            throw new Error(e.sqlMessage || e.message)
        }
    }
}