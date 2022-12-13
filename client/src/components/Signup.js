import { useState } from "react";
import ShareButton from "./ShareButton";
import { createClient } from '@supabase/supabase-js'

function SignIn(props) {
  const supabase = createClient('https://qgmucqaljwipbdatwznn.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFnbXVjcWFsandpcGJkYXR3em5uIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTk1NDM2MDYsImV4cCI6MTk3NTExOTYwNn0.RIBHHg5wOIFBjBMCmPNbLD2DP6YkLJvG9kLaB5UWDqA')
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const submitFunc = () => {
    supabase.auth.signUp({
      email: email,
      password: password,
    }).then((data, error)=>{
      console.log(data,error)
    })
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center text-purple-500 font-bold text-lg mt-5">
        <div className="mb-[10px] h-20 w-20 rounded-full">
          <img src={`https://avatars.dicebear.com/api/bottts/${email}.svg`} alt="display" />
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
      <div className="text-gray-400 px-4 text-xs font-bold mt-[20px]">
        Didn't have an account ? No worries ! Just Sign In
      </div>
    </>
  );
}

export default SignIn;
