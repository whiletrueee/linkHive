import { useState } from "react";
import ShareButton from "./ShareButton";

function Signup(props) {
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  console.log();
  return (
    <>
      <div className="flex flex-col items-center justify-center text-purple-500 font-bold text-lg mt-5">
        <div className="mb-[10px] h-20 w-20 rounded-full bg-green-700"></div>
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
          placeholder="Name"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="outline-none p-2 w-full bg-gray-600 text-gray-200 placeholder:text-gray-200 rounded-lg"
        />
      </div>
      <div className="px-4 mt-5" onClick={() => console.log(email, password)}>
        <ShareButton label="Sign In" />
      </div>
    </>
  );
}

export default Signup;
