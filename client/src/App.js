import { useState } from "react";
import "./styles/App.css";
import Main from "./components/Main";
import Signup from "./components/Signup";
import Header from "./components/Header";

function App() {
  const [signup, setSignup] = useState(false);
  // eslint-disable-next-line no-undef
  chrome.storage.local.get(["data"]).then((result) => {
    if (!result) return;
    if (+new Date() / 1000 < result.data.session.expires_at) {
      setSignup(true);
    }
  });
  return (
    <div className="w-[400px] overflow-hidden bg-black h-[500px] font-roboto">
      <Header signup={signup} setSignup={setSignup} />
      <div className="">
        {signup ? <Main /> : <Signup setSignup={setSignup} />}
      </div>
    </div>
  );
}

export default App;
