const{StatusCodes}= require('http-status-codes');
const {AirplaneRepository}=require('../repositories');
const AppError =require('../utils/errors/app-error');


const airplaneRepository = new AirplaneRepository();
async function createAirplane(data){
    try{
        const airplane= await airplaneRepository.create(data);
        return airplane;
        }
        catch(error){
            
        if(error.name='SequelizeValidationError'){
            let explanation =[];
            error.errors.forEach((err)=>{
              explanation.push(err.message) ;
            }) ;
                  
             throw new AppError('cannot create a new airplane object',StatusCodes.BAD_REQUEST );
        }
        throw new AppError('cannot create a new airplane object',StatusCodes.INTERNAL_SERVER_ERROR );
    
        }}
        async function getAirplanes(){
            try{
                const airplanes =await airplaneRepository.getAll();
           
           return airplanes;
         }
            catch(error){
             throw new AppError('cannot fetch data of all the airplanes',StatusCodes.INTERNAL_SERVER_ERROR);
            }
        }
       
        async function getAirplane(id){
            try{
                const airplane =await airplaneRepository.get(id);
           
           return airplane;
         }
            catch(error){
                if(error.statusCode== StatusCodes.NOT_FOUND)
                {throw new AppError('airplane u requested is not present',error.statusCode)

                }
                throw new AppError('cannot fetch data of all the airplanes',StatusCodes.INTERNAL_SERVER_ERROR);
            }
        }
    
    
    async function destroyAirplane(id){
        try{
            const response =await airplaneRepository.destroy(id);
       
       return response;
     }
        catch(error){
            if(error.statusCode== StatusCodes.NOT_FOUND)
            {throw new AppError('airplane u requested is not present',error.statusCode)
        }
        throw new AppError('cannot fetch data of all the airplanes',StatusCodes.INTERNAL_SERVER_ERROR); 
    
}
    }
   /* async function updateAirplane(id){
        try{
            const response =await airplaneRepository.update(id);
       
       return response;
     }
        catch(error){
            if(error.statusCode== StatusCodes.NOT_FOUND)
            {throw new AppError('cannot be updated ',error.statusCode)
        }
        throw new AppError('cannot update the information in the airplanes',StatusCodes.INTERNAL_SERVER_ERROR); 
    
}
    }*/
        module.exports={
            createAirplane,getAirplanes,getAirplane,destroyAirplane
        }