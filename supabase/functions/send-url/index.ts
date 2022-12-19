import { serve } from "https://deno.land/std@0.131.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Status } from "https://deno.land/std/http/http_status.ts";
import Mailgun from "https://deno.land/x/mailgun@v1.1.0/index.ts";

const mailgun = new Mailgun({
  key: Deno.env.get("MAILGUN_KEY"),
  domain: 'alt-mail.shawshankkumar.me'
});
console.log(Deno.env.get("MAILGUN_KEY"))
serve(async (req) => {
  if (req.method === "GET") {
    return new Response("GET is not valid.", { status: 400 });
  }
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST",
        "Access-Control-Expose-Headers": "Content-Length, X-JSON",
        "Access-Control-Allow-Headers":
          "apikey,X-Client-Info, Content-Type, Authorization, Accept, Accept-Language, X-Authorization",
      },
    });
  } else {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      {
        global: {
          headers: { Authorization: req.headers.get("Authorization")! },
        },
      }
    );
    const {
      data: { user },
    } = await supabaseClient.auth.getUser();
    const { url, message = "", email = [] } = await req.json();
    if (!url || email.length === 0) {
      return new Response("url, email and message mandatory.", { status: 421 });
    }
    await supabaseClient
      .from("links")
      .insert({ from: user.email, to: email, message, url });
      console.log("email", email)
    email.forEach(element => {
      mailgun
      .send({
        from: `${user.email}`,
        to: element,
        subject: "You have recieved a new link!",
        text: `${message ?? ''}: ${url}`,
      })
      .then((msg) => console.log(msg)) // logs response data
      .catch((err) => console.log(err));
    });
    return new Response(JSON.stringify({ message: "Successfully sent!" }), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST",
        "Access-Control-Expose-Headers": "Content-Length, X-JSON",
        "Access-Control-Allow-Headers":
          "apikey,X-Client-Info, Content-Type, Authorization, Accept, Accept-Language, X-Authorization",
      },
    });
  }
});
