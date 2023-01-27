import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { SignInSchema } from "./Validation";

function SignIn(props) {
  const supabase = createClient(
    process.env.REACT_APP_SUPABASE_URL,
    process.env.REACT_APP_SUPABASE_KEY
  );
  const [fetching, setfetching] = useState(false);
  // -------------------------------------------------
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  // ---------------------------------------------------------------
  const [emailError, setEmailError] = useState("no error");
  const [mailValidation, setMailValidation] = useState(false);
  // ---------------------------------------------------------------
  const [passwordError, setPasswordError] = useState("no error");
  const [passwordValidation, setpasswordValidation] = useState(false);
  // ----------------------------------------------------------------------
  const [loginError, setLoginError] = useState(false);
  const [loginErrorMessage, setLoginErrorMessage] = useState("no error");

  const submitFunc = () => {
    SignInSchema.validate(
      {
        email: email,
        password: password,
      },
      { abortEarly: false }
    )
      .then((responseData) => {
        setfetching(true);
        supabase.auth.signUp(responseData).then((e) => {
          const { data, error } = e;
          if (error) {
            if (error.message === "User already registered") {
              console.log(error.message);
              supabase.auth
                .signInWithPassword(responseData)
                .then((signInData) => {
                  if (signInData.error) {
                    console.log(signInData.error);
                    setLoginErrorMessage(signInData.error.message);
                    setLoginError(true);
                    setfetching(false);
                    return;
                  }
                  console.log(signInData);
                  // eslint-disable-next-line no-undef
                  chrome.storage.local.set(
                    {
                      authToken: signInData.data.session.access_token,
                      data: signInData.data,
                    },
                    function () {}
                  );
                  setfetching(false);
                  props.setSignup(true);
                });
            }
          } else {
            console.log(data);
            // eslint-disable-next-line no-undef
            chrome.storage.local.set(
              {
                authToken: data.session.access_token,
                data: data,
              },
              function () {}
            );
            props.setSignup(true);
            setfetching(false);
          }
        });
      })
      .catch((err) => {
        console.log(err.errors);
        if (err.errors.length === 2) {
          setEmailError(err.errors[0]);
          setPasswordError(err.errors[1]);
          setMailValidation(true);
          setpasswordValidation(true);
        } else if (err.errors.length === 1) {
          if (err.errors[0][0] === "M") {
            setPasswordError(err.errors[0]);
            setpasswordValidation(true);
          } else {
            setEmailError(err.errors[0]);
            setMailValidation(true);
          }
        } else {
          setLoginError(true);
          setfetching(false);
          setLoginErrorMessage("Enter valid credentials");
        }
      });
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center text-purple-500 font-bold text-lg mt-2">
        <div className="mb-[10px] h-20 w-20 rounded-full">
          <img
            src={`https://avatars.dicebear.com/api/bottts/${email}.svg`}
            alt="display"
          />
        </div>
        Sign In
        {loginError ? (
          <div className="text-red-600 text-sm mt-2">{loginErrorMessage}</div>
        ) : (
          <div className="text-[#121212] text-sm mt-2">{loginErrorMessage}</div>
        )}
      </div>

      <div className="mt-2 px-4 flex flex-col gap-2">
        {mailValidation ? (
          <label className="text-red-600 text-sm">{emailError}</label>
        ) : (
          <label className="text-[#121212] text-sm">{emailError}</label>
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setMailValidation(false);
            setLoginError(false);
          }}
          className={` duration-200 border ${
            loginError ? "border-red-600" : "border-[#343434]"
          } outline-none p-2 w-full bg-[#121212] text-gray-200 placeholder:text-[#4B4B4B]`}
        />
        {passwordValidation ? (
          <label className="text-red-600 text-sm">{passwordError}</label>
        ) : (
          <label className="text-[#121212] text-sm">{passwordError}</label>
        )}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setpasswordValidation(false);
            setLoginError(false);
          }}
          className={`duration-200 border ${
            loginError ? "border-red-600" : "border-[#343434]"
          }  outline-none p-2 w-full bg-[#121212] text-gray-200 placeholder:text-[#4B4B4B]`}
        />
      </div>
      {fetching ? (
        <div className="px-4 mt-6">
          <div
            className={`bg-purple-800 px-5 py-1 text-white w-fit text-sm font-medium animate-pulse`}
          >
            Fetching
          </div>
        </div>
      ) : (
        <div className="px-4 mt-6">
          <button
            onClick={submitFunc}
            type="submit"
            className={`bg-purple-800 px-5 py-1 text-white text-sm hover:bg-purple-700 hover:cursor-pointer font-medium`}
          >
            Sign In
          </button>
        </div>
      )}

      <div className="text-gray-300 px-4 text-xs font-bold mt-[20px]">
        Don't have an account ? No worries ! Just Sign In and we'll manage the
        rest.
      </div>
    </>
  );
}

export default SignIn;
