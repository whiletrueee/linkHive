import { useState } from "react";
import axios from "axios";
import ShareButton from "./ShareButton";
import People from "./People";

function Share() {
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState("");
  const [url, setUrl] = useState(window.location.toString());
  const [sendto, setSendto] = useState("");

  const handleSendto = async () => {
    // eslint-disable-next-line no-undef
    const { authToken } = await chrome.storage.local.get(["authToken"]);
    // eslint-disable-next-line no-undef
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
      setUrl(tabs[0].url);
    });
    
    const headers = { authorization: `Bearer ${authToken}` };
    const data = { url, email: [sendto], message };
    console.log(data, headers);
    console.log("handle submit");
    try {
      const res = await axios.post(
        "https://qgmucqaljwipbdatwznn.functions.supabase.co/send-url",
        data,
        { headers }
      );
      console.log(res);
      if (res.status === 200) {
        setSuccess(res.data.message);
        return true;
      }
    } catch (err) {
      console.log(err);
      setSuccess("Error");
      return false;
    }
  };

  return (
    <>
      <div className="flex flex-col gap-[10px] mt-[20px] px-[20px]">
        <label className="text-pink-500">Enter message</label>
        <input
          type="text"
          placeholder="Enter message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="outline-none p-2 w-full bg-gray-600 text-gray-200 placeholder:text-gray-200 rounded-lg"
        />
        <label className="text-pink-500">Paste Link to share</label>
        <input
          type="url"
          placeholder="Url to be shared"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="outline-none p-2 w-full bg-gray-600 text-gray-200 placeholder:text-gray-200 rounded-lg"
        />
        <label className="text-pink-500">Send to</label>
        <input
          placeholder="Enter Mail"
          value={sendto}
          onChange={(e) => setSendto(e.target.value)}
          className="outline-none p-2 w-full bg-yellow-600 text-black placeholder:text-black rounded-lg"
        />
      </div>
      <div className="m-[20px] flex gap-4 flex-wrap">
        <People />
        <People />
      </div>
      <div
        className="px-4"
        onClick={() => {
          handleSendto();
        }}
      >
        <ShareButton label="Send" />
        <div className="text-green-600">{success}</div>
      </div>
    </>
  );
}

export default Share;
