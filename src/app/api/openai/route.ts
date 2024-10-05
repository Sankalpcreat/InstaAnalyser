import { NextResponse } from "next/server";
import { getOpenAiSuggestions } from "@/utils/openAiHelper";
import {InstagramProfile} from '../../types/profile'


export async function POST(req:Request){
    const {profileData}:{profileData:InstagramProfile}=await req.json();
    if(!profileData){
        return NextResponse.json({error:'Profile data is required'},{status:400})
    }

 const suggestion=  await getOpenAiSuggestions(profileData);

 if(!suggestion){
    return NextResponse.json({error:'Failed to get open ai suggestion'},{status:500});
 }
 return NextResponse.json({suggestion})
}

