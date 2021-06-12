const mongoose = require('mongoose');



const dbConnection = async() => {

    try{

        await mongoose.connect( process.env.MONGODB_CNN,
            {
                useNewUrlParser: true,
                useCreateIndex: true,
                useUnifiedTopology: true,
                useFindAndModify: false,
            },
        );
 
        
        console.log('DataBase Online');


    } catch (error) {
        console.log(error);
        throw new Error('Error al iniciar DataBase');
    }
}




module.exports = {
    dbConnection
}