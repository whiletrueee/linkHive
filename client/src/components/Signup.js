import { useState } from "react";
import ShareButton from "./ShareButton";
import { createClient } from "@supabase/supabase-js";
import LoadingMessage from "./LoadingMessage";

function SignIn(props) {
  const supabase = createClient(
    "https://qgmucqaljwipbdatwznn.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFnbXVjcWFsandpcGJkYXR3em5uIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTk1NDM2MDYsImV4cCI6MTk3NTExOTYwNn0.RIBHHg5wOIFBjBMCmPNbLD2DP6YkLJvG9kLaB5UWDqA"
  );
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [messageDisplay, setMessageDisplay] = useState('');

  const submitFunc = () => {
    supabase.auth
      .signUp({
        email: email,
        password: password,
      })
      .then((e) => {
        const { data, error } = e;
        if (error) {
          if (error.message === "User already registered") {
            setMessageDisplay(LoadingMessage[Math.floor(Math.random() * LoadingMessage.length)])
            console.log(error.message);
            supabase.auth
              .signInWithPassword({
                email: email,
                password: password,
              })
              .then((signInData) => {
                if (signInData.error) {
                  console.log(signInData.error);
                  return;
                }
                console.log(signInData);
                // eslint-disable-next-line no-undef
                chrome.storage.local.set(
                  {
                    authToken: signInData.data.session.access_token,
                    data: { user: signInData.data.user },
                  },
                  function () {}
                );
                props.setSignup(true);
              });
          }
        } else {
          // eslint-disable-next-line no-undef
          chrome.storage.local.set(
            { authToken: data.session.access_token, data: { user: data.user } },
            function () {}
          );
          props.setSignup(true);
        }
      });
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center text-purple-500 font-bold text-lg mt-5">
        <div className="mb-[10px] h-20 w-20 rounded-full">
          <img
            src={`https://avatars.dicebear.com/api/bottts/${email}.svg`}
            alt="display"
          />
        </div>
        Sign Up
      </div>

      <div className="mt-5 px-4 flex flex-col gap-3">
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="outline-none p-2 w-full bg-gray-600 text-gray-200 placeholder:text-gray-200 rounded-lg"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="outline-none p-2 w-full bg-gray-600 text-gray-200 placeholder:text-gray-200 rounded-lg"
        />
      </div>
      <div className="px-4 mt-5" onClick={submitFunc}>
        <ShareButton label="Sign In" />
      </div>
      {messageDisplay}
      <div className="text-gray-400 px-4 text-xs font-bold mt-[20px]">
        Don't have an account ? No worries ! Just Sign In and we'll manage the
        rest.
      </div>
    </>
  );
}

export default SignIn;
