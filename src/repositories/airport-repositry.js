const CrudRepository=require('./crud-repositry');
const{Airport}=require('../models');

class AirportRepository extends CrudRepository{
    constructor(){
        super(Airport);
    }
}
module.exports =AirportRepository;