import mongoose from 'mongoose'

const connectMongo=async()=>{
    if(mongoose.connection.readyState>=1){//best practices to connect only if nedded
        return ;
    }
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("Mongodb Connected");
    } catch (error) {
        console.error('Mongodb connection error',error)
    }
}

export default connectMongo