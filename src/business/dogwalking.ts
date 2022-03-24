import { DogHeroDatabase } from "../database/dogHeroDatabase";
import { dogWalking, dogWalkingDTO } from "../model/dogWalking";
import { DogHeroInternalServices } from "../services/dogHeroInternalServices";
import { IdGenerator } from "../services/idGenerator";

export class DogHeroBusiness {
    constructor(
        private idGenerator:IdGenerator,
        private dogHeroInternalServices:DogHeroInternalServices,
        private dogHeroDatabase:DogHeroDatabase
    ){}

    insertDogWalkingOnDB = async (input:dogWalkingDTO):Promise<void> => {
        const { 
            data_agendamento,
            latitude,
            longitude,
            quantidade_pets,
            hora_inicial,
            hora_final
        } = input

        //validate input
        if(!data_agendamento || !latitude || !longitude || !quantidade_pets || !hora_inicial || !hora_final){
            throw new Error('Preencha todos os campos.')
        }
        
        //generate id 
        const id:string = this.idGenerator.generateID()

        //calculate time difference
        const dogWalkingTime = this.dogHeroInternalServices.calculateWalkingTime(hora_inicial, hora_final)
       
        //calculate price
        const dogWalkingPrice = this.dogHeroInternalServices.calculateWalkingPrice(hora_inicial, hora_final, quantidade_pets)

        //input model bank 
        const newDogWalkingInserted:dogWalking = {
            id:id,
            data_agendamento:data_agendamento,
            preco:dogWalkingPrice,
            duracao:dogWalkingTime,
            latitude:latitude,
            longitude:longitude,
            quantidade_pets:quantidade_pets,
            hora_inicial:hora_inicial,
            hora_final:hora_final
        }

        //insert database
        await this.dogHeroDatabase.insertDogWalking(newDogWalkingInserted)
    }
}