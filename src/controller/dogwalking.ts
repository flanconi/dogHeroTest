import { Request, Response } from "express";
import { DogHeroBusiness } from "../business/dogwalking";
import { dogWalkingDTO } from "../model/dogWalking";

export class DogHeroController {
    constructor(
        private dogHeroBusiness:DogHeroBusiness
    ){}

    insertDogWalkingOnDB = async (req:Request, res:Response) => {
        const {
            data_agendamento,
            latitude,
            longitude,
            quantidade_pets,
            hora_inicial,
            hora_final
        } = req.body

        //input model 
        const input:dogWalkingDTO = {
            data_agendamento,
            latitude,
            longitude,
            quantidade_pets,
            hora_inicial,
            hora_final
        }

        try {

            //adding input req 
            await this.dogHeroBusiness.insertDogWalkingOnDB(input)

            res.status(201).send('Serviço foi adicionado à agenda.')
        } catch (e: any) {
            if (e.message) return res.status(400).send(e.message)
            res.status(400).send('Erro ao cadastrar o serviço')
        }
    }

    filterDogWalkingByDay = async (req:Request, res:Response) => {
        try {

            const appointmentList = await this.dogHeroBusiness.filterDogWalkingByDay()

            res.status(201).send(appointmentList)
        } catch (e: any) {
            if (e.message) return res.status(400).send(e.message)
            res.status(400).send('Erro ao cadastrar o serviço')
        }
    }
}