import mongoose from "mongoose";

export const dbConnection= async() => {

    try {
        
       await mongoose.connect(process.env.DB_CNN, { dbName: process.env.MONGO_DBNAME})

       console.log('Db Online');
       

    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de inicializar DB')
        
    }
}