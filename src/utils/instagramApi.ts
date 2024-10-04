
import axios from 'axios';

export const fetchInstagramProfile = async (username: string) => {
  try {
    const response = await axios.get(`https://api.instagram.com/v1/users/${username}`, {
      headers: {
        Authorization: `Bearer ${process.env.INSTAGRAM_API_KEY}`,
      },
    });

    return response.data; 
  } catch (error) {
    console.error('Error fetching Instagram profile:', error);
    return null;
  }
};
