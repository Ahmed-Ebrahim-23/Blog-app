import mongoose from 'mongoose';

const dbConnection = async () => {
    try{
        const MongoURI: string = process.env.MONGO_URI || '';
        await mongoose.connect(MongoURI);
        console.log('Database connected successfully');
    } catch (err){
        console.log("Database connection Failed!");
        console.error(err);
    }
};

export default dbConnection;