import { useEffect, useState } from "react";
import axios from "axios";
import ShareButton from "./ShareButton";
import People from "./People";

function Share() {
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState("");
  const [url, setUrl] = useState("");
  const [sendto, setSendto] = useState("");

  const handleSendto = async () => {
    // eslint-disable-next-line no-undef
    const { authToken } = await chrome.storage.local.get(["authToken"]);
    // eslint-disable-next-line no-undef
    const headers = { authorization: `Bearer ${authToken}` };
    const data = { url, email: [sendto], message };
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

  useEffect(() => {
    // eslint-disable-next-line no-undef
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
      setUrl(tabs[0].url);
    });
  }, []);

  return (
    <>
      <div className="flex flex-col gap-[10px] mt-[20px] px-[20px]">
        <label className="text-pink-500">Enter message</label>
        <input
          type="text"
          placeholder="Enter message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="duration-200 border border-[#343434] outline-none p-2 w-full bg-[#121212] text-gray-200 placeholder:text-[#4B4B4B]"
        />
        <label className="text-pink-500">Paste Link to share</label>
        <input
          type="url"
          placeholder="Url to be shared"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="duration-200 border border-[#343434] outline-none p-2 w-full bg-[#121212] text-gray-200 placeholder:text-[#4B4B4B]"
        />
        <label className="text-pink-500">Send to</label>
        <input
          placeholder="Enter Mail"
          value={sendto}
          onChange={(e) => setSendto(e.target.value)}
          className="duration-200 border border-t-[#121212] border-r-[#121212] border-l-[#121212] border-b-[#343434] outline-none p-2 w-full bg-[#121212] text-gray-200 placeholder:text-[#4B4B4B]"
        />
      </div>

      <div
        className="px-4 mt-5"
        onClick={() => {
          handleSendto();
        }}
      >
        <button
          className={`bg-purple-800 px-5 py-1 text-white text-sm hover:bg-purple-700 hover:cursor-pointer font-medium`}
        >
          Send
        </button>
        <div className="text-green-600">{success}</div>
      </div>
    </>
  );
}

export default Share;
