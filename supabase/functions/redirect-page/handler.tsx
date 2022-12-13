import React from 'https://esm.sh/react@18.2.0'
import { ImageResponse } from 'https://deno.land/x/og_edge@0.0.4/mod.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
export default async function handler(req: Request) {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: { 
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey',
          } })
      }
  return new ImageResponse (
    <div
      style={{
        backgroundImage:
          "linear-gradient(to right, #3F5EF9, #9F53B2, #EF456A)",
      }}
      tw="h-full w-full flex items-start justify-start"
    >
      <div tw="flex items-start justify-start h-full">
        <div tw="flex flex-col justify-between w-full h-full p-20">
          <h1 tw="text-[60px] text-white font-bold text-left">{"Successfully signed up!"}</h1>
          <h1 tw="text-[25px] text-white font-bold text-left font-sans">{"Fun Fact: Sending or saving a link with instant URL takes less time than reading this (We know because we calculated it, pfft nerds)."}</h1>

        </div>
      </div>
    </div>
);
}