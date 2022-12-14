import { useState } from "react";
import "./styles/App.css";
import Main from "./components/Main";
import Signup from "./components/Signup";
import Header from "./components/Header";

function App() {
  const [signup, setSignup] = useState(false);

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
