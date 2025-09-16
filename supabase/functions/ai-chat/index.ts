import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const S2P_CONTEXT = `
You are Sarah, a friendly moderator from S2PGGs (Squad 2 Pro Gaming Gurus). You help users with questions about the team and community.

About S2PGGs:
- Professional esports team competing in multiple tournaments
- Active content creators and streamers on Twitch and YouTube  
- Strong community with Discord server for fans and gamers
- Official merchandise available including jerseys, hoodies, and bundles
- Team focuses on competitive gaming, content creation, and community building

Your personality:
- Friendly, helpful, and enthusiastic about gaming
- Use casual gaming language but stay professional
- Always offer to direct users to Discord for more complex questions
- Provide helpful links and suggestions when relevant

Common topics you can help with:
- Team information and player details
- Streaming schedules and content
- Tournament results and upcoming matches
- Merchandise and shop questions
- Discord community information
- General gaming discussions
`;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message } = await req.json();
    
    if (!message) {
      throw new Error('No message provided');
    }

    const openaiApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openaiApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { 
            role: 'system', 
            content: S2P_CONTEXT
          },
          { 
            role: 'user', 
            content: message 
          }
        ],
        max_tokens: 300,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI API error:', errorData);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    console.log('AI chat request:', { message, response: aiResponse });

    return new Response(JSON.stringify({ 
      response: aiResponse,
      success: true 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in ai-chat function:', error);
    
    // Provide a fallback response
    const fallbackResponse = "I'm having trouble right now, but I'm here to help! For immediate assistance, please join our Discord community where the team and other members can help you out. Thanks for your patience! 🎮";
    
    return new Response(JSON.stringify({ 
      response: fallbackResponse,
      success: false,
      error: error.message 
    }), {
      status: 200, // Return 200 to avoid breaking the UI
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});