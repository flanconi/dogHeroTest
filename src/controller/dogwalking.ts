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

    appointmentDuration = async (req:Request, res:Response) => {
        const id = req.params.id
        try {

            const appointmentDuration = await this.dogHeroBusiness.appointmentDuration(id)

            res.status(201).send({appointmentDuration})
        } catch (e: any) {
            if (e.message) return res.status(400).send(e.message)
            res.status(400).send('Erro ao cadastrar o serviço')
        }
    }

    updateDogWalkingStatus = async (req:Request, res:Response) => {
        const id = req.params.id
        const {status} = req.body

        try {

            await this.dogHeroBusiness.updateDogWalkingStatus(id, status)

            res.status(201).send('Status atualizado com sucesso!')
        } catch (e: any) {
            if (e.message) return res.status(400).send(e.message)
            res.status(400).send('Erro ao cadastrar o serviço')
        }
    }

    endDogWalking = async (req:Request, res:Response) => {
        const id = req.params.id
        const {status} = req.body

        try {

            await this.dogHeroBusiness.updateDogWalkingStatus(id, status)
            const priceToPay = await this.dogHeroBusiness.dogWalkingPrice(id)

            res.status(201).send({message: 'Passeio finalizado com sucesso!', price: `R$${priceToPay},00`})
        } catch (e: any) {
            if (e.message) return res.status(400).send(e.message)
            res.status(400).send('Erro ao cadastrar o serviço')
        }
    }
}