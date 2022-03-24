export class DogHeroInternalServices {

    calculateWalkingTime = (startTime:string, endTime:string):string => {

        const currentDate = new Date()

        const currentDateStartTime = new Date(`
            ${currentDate.getFullYear()}, 
            ${currentDate.getMonth()}, 
            ${currentDate.getDate()},
            ${Number(startTime)}
        `)
        
        const currentDateEndTime = new Date(`
            ${currentDate.getFullYear()}, 
            ${currentDate.getMonth()}, 
            ${currentDate.getDate()},
            ${Number(endTime)}
        `)

        //calculate time difference
        const walkingHour = (currentDateEndTime.getHours()) - (currentDateStartTime.getHours())
        const walkingMinute = currentDateEndTime.getMinutes() - currentDateStartTime.getMinutes()
        
        return `${walkingHour}:${walkingMinute}`
    }

    calculateWalkingPrice = (startTime:string, endTime:string, pets:number):number => {

        //calculate time
        const walkingTime = this.calculateWalkingTime(startTime,endTime) 

        //formate calculated time
        const formattedTime = walkingTime.split(':')

        //calculate price
        const calculatePrice = ():number => {
            if(Number(formattedTime[0]) < 1 && Number(formattedTime[0]) >= 30){
                const defaultPrice = 25
                if(pets > 1){
                    const walkingPrice = defaultPrice + (pets * 15)
                    return walkingPrice
                }

                return defaultPrice
            } else {
                const defaultPrice = 35
                if(pets > 1){
                    const walkingPrice = defaultPrice + (pets * 20)
                    return walkingPrice
                }

                return defaultPrice
            }
        }

        return calculatePrice()
    }
}