import { useState } from "react";
import RecvLinks from "./RecievedLinks";
import SentLink from "./SentLinks";
import Share from "./Share";

function Main() {
  const [recvLink, setRecvLink] = useState(false);
  const [sendLink, setSendLink] = useState(true);
  const [sentLink, setSentLink] = useState(false);

  return (
    <>
      <div className="text-sm text-white flex justify-evenly items-center w-full hover:cursor-pointer mr-2 mt-4">
        <div
          className={`${
            sendLink ? `text-yellow-500 border-[#343434]` : null
          } p-2 hover:text-yellow-500 border-2 border-[#121212] hover:border-[#343434] flex items-center justify-center duration-200`}
          onClick={() => {
            setSendLink(true);
            setRecvLink(false);
            setSentLink(false);
          }}
        >
          Send Link
        </div>
        <div
          className={`p-2 ${
            recvLink ? `text-pink-500` : null
          } hover:text-pink-500 border-2 border-[#121212] hover:border-[#343434] flex items-center justify-center duration-200`}
          onClick={() => {
            setSendLink(false);
            setRecvLink(true);
            setSentLink(false);
          }}
        >
          Recieved Links
        </div>
        <div
          className={`${
            sentLink ? `text-purple-500 border-[#343434]` : null
          } p-2 hover:text-purple-500 border-2 border-[#121212] hover:border-[#343434] flex items-center justify-center duration-200`}
          onClick={() => {
            setSendLink(false);
            setRecvLink(false);
            setSentLink(true);
          }}
        >
          Sent Links
        </div>
      </div>
      {sendLink ? (
        <Share />
      ) : recvLink ? (
        <RecvLinks />
      ) : sentLink ? (
        <SentLink />
      ) : null}
    </>
  );
}

export default Main;
