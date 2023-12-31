const CrudRepository=require('./crud-repositry');
const { Sequelize} = require('sequelize')
const db =require('../models')
const {addRowLockOnFlights}=require('./queries');
const{Flight,Airplane,Airport}=require('../models');

class FlightRepository extends CrudRepository{
    constructor(){
        super(Flight);
    }
async getAllFlights(filter//,sort
){
    const response =await Flight.findAll({
        where:filter,
        //order:sort
        include:
        [{
            model: Airplane,
            required:true,
            as: 'airplaneDetail'
        }, 
        {
         model: Airport,
         required:true ,
        as: 'departureAirport',
         on:{
           col1:Sequelize.where(Sequelize.col('Flight.departureAirportId'), '=' , Sequelize.col('departureAirport.code')) 
         },
        },
        {
         model: Airport,
         required: true ,
        as: 'arrivalAirport',
         on:{
           col1:Sequelize.where(Sequelize.col('Flight.arrivalAirportId'), '=' , Sequelize.col('arrivalAirport.code')) 
         }  ,
        }]
    });
    return response;
}
 

 async updateRemainingSeats(flightId,seats,dec=true){
    const transaction = await db.sequelize.transaction();
try{
   await db.sequelize.query(addRowLockOnFlights(flightId))
   const flight=await Flight.findByPk(flightId)
   if(+dec){
   await flight.decrement('totalSeats',{by:seats},{transaction:transaction});
   
 }
    else{
        await flight.increment('totalSeats',{by:seats},{transaction:transaction});
}

await transaction.commit();
return flight;
 }
 catch(error){
    await transaction.rollback();
    throw error;
 }
}
}


module.exports = FlightRepository;