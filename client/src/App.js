import { useEffect, useState } from "react";
import "./styles/App.css";
import Main from "./components/Main";
import Signup from "./components/Signup";
import Header from "./components/Header";

function App() {
  const [signup, setSignup] = useState(false);
  
  useEffect(() => {
    // eslint-disable-next-line no-undef
    chrome.storage.local.get(["data"]).then((result) => {
      if (!result) return;
      if (+new Date() / 1000 < result.data.session.expires_at) {
        setSignup(true);
      }
    });
  });

  const onLogout = () => {
    // eslint-disable-next-line no-undef
    chrome.storage.local.clear();
    setSignup(false);
  };

  return (
    <div className="w-[480px] overflow-y-scroll bg-[#121212] h-[600px] font-roboto relative">
      <Header signup={signup} setSignup={setSignup} />
      <div className="">
        {signup ? <Main /> : <Signup setSignup={setSignup} />}
      </div>
      {signup ? (
        <div
          className="text-white bg-[#121212] p-2 absolute bottom-3 right-3 text-base hover:cursor-pointer hover:text-red-500"
          onClick={onLogout}
        >
          Logout
        </div>
      ) : null}
    </div>
  );
}

export default App;
