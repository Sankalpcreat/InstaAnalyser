import { NextResponse } from "next/server";
import connectMongo from "@/utils/mongoDb";
import redisClient,{getCache,setCache} from "@/utils/redis";
import Profile from "@/models/ProfileModel";
import { fetchInstagramProfile } from "@/utils/instagramApi";

export async function GET(req:Request){
    const {searchParams}=new URL(req.url);
    const username=searchParams.get('username');

    if(!username){
        return NextResponse.json({error:"Username is required"},{status:400})
    }
    await connectMongo()

  const cacheProfile= await getCache(username);
  if(cacheProfile){
    return NextResponse.json(cacheProfile);
  }

 const profileData= await fetchInstagramProfile(username)
 if(!profileData){
    return NextResponse.json({error:'Profile not found'},{status:404})
 }

 const updatedProfile=await Profile.findOneAndUpdate(
    {username},
    profileData,
    {upsert:true,new:true}
 );
 await setCache(username,updatedProfile);
 return NextResponse.json(updatedProfile)
}