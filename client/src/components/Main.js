import { useState } from "react";
import RecvLinks from "./RecievedLinks";
import Share from "./Share";

function Main() {
  const [recvLink, setRecvLink] = useState(false);

  return (
    <>
      <div className="text-sm text-white grid grid-flow-col grid-cols-3 w-full hover:cursor-pointer">
        <div className="p-1 hover:bg-yellow-500 hover:text-black hover:font-bold flex items-center justify-center">
          Send Link
        </div>
        <div
          className="p-1 hover:bg-yellow-500 hover:text-black hover:font-bold flex items-center justify-center"
          onClick={() => setRecvLink(true)}
        >
          Recieved Links
        </div>
        <div className="p-1 hover:bg-yellow-500 hover:text-black hover:font-bold flex items-center justify-center">
          SentLinks
        </div>
      </div>
      {recvLink ? <RecvLinks /> : <Share />}
    </>
  );
}

export default Main;
