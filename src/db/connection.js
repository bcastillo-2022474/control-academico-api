import mongoose from 'mongoose';

export const dbConnection = async () => {
    try{
        console.log(process.env.MONGODB_CNN)
        await mongoose.connect(process.env.MONGODB_CNN, {});
        console.log('Base de datos conectada');
    }catch(e){
        throw new Error('Error al conectar la base de datos ', e)
    }
}
