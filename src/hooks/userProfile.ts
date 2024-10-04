import { useState } from "react";

interface Profile {
    username: string;
    full_name: string;
    profile_picture: string;
    followers: number;
    following: number;
    media_count: number;
    engagementRate: number;
    topHashtags: string[];
    mostLikedPost: string;
    mostCommentedPost: string;
    lastAnalyzed: Date;
  }
  interface UseProfileResult{
    profile:Profile |null;
    loading:boolean;
    error:string |null;
    fetchProfile:(username:string)=>Promise<void>;
  }
  

const useProfile=(): UseProfileResult=>{
    const [profile, setProfile] = useState<Profile |null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string|null>(null);

    const fetchProfile=async (username:string)=>{
        setLoading(true);
        setError(null);
        setProfile(null);

        try {
            const response = await fetch(`/api/analyze?username=${username}`);

            if(!response){
                throw new Error('Failed to fetch profile');

            }
            const data=await response.json();
            setProfile(data);
        } catch (err) {
            setError(err instanceof Error ? err.message:"Unknown error occurred");
        } finally{
            setLoading(false)
        }
    }
    return {profile,loading,error,fetchProfile}
}
export default useProfile