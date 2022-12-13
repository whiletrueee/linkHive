import { useState } from "react";

function Share() {
  const [message, setMessage] = useState();
  const [url, setUrl] = useState();

  return (
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
    </div>
  );
}

export default Share;
