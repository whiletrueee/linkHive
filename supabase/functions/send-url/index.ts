import { serve } from "https://deno.land/std@0.131.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

serve(async (req) => {
        console.log(req.method)
        if (req.method === 'OPTIONS') {
            return new Response(
                'ok',
                {
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Methods": "POST",
                        "Access-Control-Expose-Headers": "Content-Length, X-JSON",
                        "Access-Control-Allow-Headers": "apikey,X-Client-Info, Content-Type, Authorization, Accept, Accept-Language, X-Authorization",
                    }
                }
            );
        }
        else {
            const {url, message = "", email = []} = await req.json();
            const data = {message: `OK`};
            return new Response(
                JSON.stringify(data),
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Methods": "POST",
                        "Access-Control-Expose-Headers": "Content-Length, X-JSON",
                        "Access-Control-Allow-Headers": "apikey,X-Client-Info, Content-Type, Authorization, Accept, Accept-Language, X-Authorization",
                    }
                }
            );
        }
});