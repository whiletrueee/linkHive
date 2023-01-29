import { useEffect, useState } from "react";
import axios from "axios";
import { ShareSchema } from "./Validation";

function Share() {
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState("");
  const [url, setUrl] = useState("");
  const [sendto, setSendto] = useState([]);
  const [errorLogs, setErrorLogs] = useState(null);
  const [recent, setRecent] = useState([]);
  const [sending, setSending] = useState(false);

  const handleSendto = async () => {
    console.log(sendto);
    setErrorLogs(null);
    ShareSchema.validate(
      {
        message: message,
        email: sendto,
        url: url,
      },
      { abortEarly: false }
    )
      .then((responseData) => {
        const data = { message, email: [responseData.email], url };
        // eslint-disable-next-line no-undef
        chrome.storage.local.get(["authToken"]).then((token) => {
          setSending(true);
          const headers = { authorization: `Bearer ${token.authToken}` };
          axios
            .post(process.env.REACT_APP_SUPABASE_POSTLINK, data, {
              headers,
            })
            .then((res) => {
              console.log(res);
              if (res.status === 200) {
                setSuccess(res.data.message);
                setMessage("");
                setSendto("");
                setSending(false);
                return true;
              }
            })
            .catch((err) => {
              console.log(err);
              setSending(false);
              setSuccess("Error");
              return false;
            });
        });
      })
      .catch((err) => {
        setSending(false);
        console.log(err.errors);
        setErrorLogs(err.errors);
      });
  };

  useEffect(() => {
    // eslint-disable-next-line no-undef
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
      setUrl(tabs[0].url);
    });
  }, [success]);

  useEffect(() => {
    // eslint-disable-next-line no-undef
    chrome.storage.local
      .get(["authToken"])
      .then((token) => {
        const headers = { authorization: `Bearer ${token.authToken}` };
        axios
          .get(process.env.REACT_APP_SUPABASE_FAV_MAIL, {
            headers,
          })
          .then((res) => {
            console.log(res);
            if (res.data.emails.length < 1) {
              setRecent(undefined);
            } else {
              setRecent(res.data.emails);
            }
          });
      })
      .catch((e) => console.log(e));
  }, [success]);

  return (
    <div className=" overflow-y-scroll">
      <div className="flex flex-col gap-[10px] mt-[20px] px-[20px]">
        <label className="text-yellow-500">Enter message</label>
        <input
          type="text"
          placeholder="Enter message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="duration-200 border border-[#343434] outline-none p-2 w-full bg-[#121212] text-gray-200 placeholder:text-[#4B4B4B]"
        />
        <label className="text-yellow-500">Paste Link to share</label>
        <input
          type="url"
          placeholder="Url to be shared"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="duration-200 border border-[#343434] outline-none p-2 w-full bg-[#121212] text-gray-200 placeholder:text-[#4B4B4B]"
        />
        <label className="text-yellow-500">Send to {sendto}</label>
        <input
          type="email"
          multiple
          placeholder="Enter Mail"
          value={Array.isArray(sendto) ? sendto.join(" ") : sendto}
          onChange={(e) => setSendto(e.target.value.split(" "))}
          className="duration-200 border border-t-[#121212] border-r-[#121212] border-l-[#121212] border-b-[#343434] outline-none p-2 w-full bg-[#121212] text-gray-200 placeholder:text-[#4B4B4B]"
        />
      </div>
      <div className="mx-4 mt-2 flex flex-wrap justify-start gap-1 text-xs ">
        {recent &&
          recent.map((item, i) => {
            return (
              <div
                key={i}
                className="text-white p-2 bg-green-700 hover:cursor-pointer hover:bg-green-600 "
                onClick={() => setSendto(item)}
              >
                {item}
              </div>
            );
          })}
      </div>
      <div className="px-4 mt-5">
        <button
          disabled={sending}
          onClick={() => {
            handleSendto();
          }}
          type="submit"
          className={`bg-purple-800 px-5 py-1 text-white text-sm hover:bg-purple-700 hover:cursor-pointer font-medium`}
        >
          {sending ? "Sending . . . " : "Send"}
        </button>
        <div className="flex flex-col justify-between gap-2 text-red-500 font-thin text-sm mt-2">
          {errorLogs &&
            errorLogs.map((item, i) => {
              return (
                <div className="" key={i}>
                  {item}
                </div>
              );
            })}
        </div>
        <div className="text-green-600">{success}</div>
      </div>
    </div>
  );
}

export default Share;
