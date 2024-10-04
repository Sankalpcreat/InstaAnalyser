
import {createClient} from 'redis'

const redisClient=createClient({url:process.env.REDIS_URL!})

redisClient.on('error',(err)=>{
    console.error('Redis Client Error',err)
})

const connectRedis=async()=>{
    if(!redisClient.isOpen){
        await redisClient.connect();
        console.log('Redis Connected')
    }
}

const getCache=async(key:string)=>{
    const data=await redisClient.get(key)
    return data ? JSON.parse(data):null;
}
const setCache=async(key:string,value:any,ttlSecond:3600)=>{
    await redisClient.set(key,JSON.stringify(value),{
        EX:ttlSecond
    })
}
export {connectRedis,getCache,setCache}
export default redisClient