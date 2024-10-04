// src/utils/openAiHelper.ts
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export const getOpenAiSuggestions = async (profileData: any) => {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4', // You can also use 'gpt-3.5-turbo'
      messages: [
        {
          role: 'system',
          content: 'You are an Instagram marketing assistant. Provide suggestions based on the profile data provided.',
        },
        {
          role: 'user',
          content: `Here is the Instagram profile data: ${JSON.stringify(profileData)}. What are your suggestions to improve engagement?`,
        },
      ],
      max_tokens: 50, // Limit response length
    });

    return response.data.choices[0].message.content;  // Return the AI-generated suggestions
  } catch (error) {
    console.error('Error fetching OpenAI suggestions:', error);
    return null;
  }
};
