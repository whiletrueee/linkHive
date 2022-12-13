
import { serve } from "https://deno.land/std@0.131.0/http/server.ts"

serve(async (req) => {
  const { email = [], url, message = "" } = await req.json()
  console.log(email, url, message);
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: { 
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey',
      } })
  }
  return new Response(
    JSON.stringify({message: 'message sent'}),
    { headers: { "Content-Type": "application/json" } },
  )
})
