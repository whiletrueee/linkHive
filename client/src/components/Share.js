import { useState } from "react";
import axios from "axios";
import ShareButton from "./ShareButton";
import People from "./People";

function Share() {
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState('');
  const [url, setUrl] = useState('');
  const [sendto, setSendto] = useState('');

  const handleSendto = async () => {
    const data = {url,email:[sendto],message}
    console.log("handle submit");
    try {
      const res = await axios.post("https://qgmucqaljwipbdatwznn.functions.supabase.co/send-url", data);
      console.log(res);
      if (res.status === 200) {
        setSuccess(res.data.message);
        return true;
      }
    } catch (err) {
      console.log(err);
      setSuccess('Error');
      return false;
    }
  };

  return (
    <>
      <div className="flex flex-col gap-[20px] mt-[20px] px-[20px]">
        <input
          placeholder="Enter message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="outline-none p-2 w-full bg-gray-600 text-gray-200 placeholder:text-gray-200 rounded-lg"
        />
        <input
          placeholder="Url to be shared"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="outline-none p-2 w-full bg-gray-600 text-gray-200 placeholder:text-gray-200 rounded-lg"
        />
        <input
          placeholder="send to :"
          value={sendto}
          onChange={(e) => setSendto(e.target.value)}
          className="outline-none p-2 w-full bg-green-600 text-black placeholder:text-black rounded-lg"
        />
      </div>
      <div className="m-[20px] flex gap-4 flex-wrap">
        <People />
        <People />
      </div>
      <div className="px-4" onClick={()=>{handleSendto()}}>
        <ShareButton label="Send" /><div className="text-green-600">{success}</div>
      </div>
    </>
  );
}

export default Share;
