
import { serve } from 'https://deno.land/std@0.140.0/http/server.ts'


import handler from './handler.tsx'

console.log(`Function "opengraph" up and running!`)

serve(handler)