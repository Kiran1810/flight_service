function addRowLockOnFlights(flightId){
    return (`SELECT * from Flights WHERE FlightId=${flightId} FOR UPDATE`);

}
module.exports={
    addRowLockOnFlights
}
