import axios from "axios";
import { useEffect, useState } from "react";

function SentLinks() {
  const [sentTo, setSentTo] = useState();
  useEffect(() => {
    // eslint-disable-next-line no-undef
    chrome.storage.local
      .get(["authToken"])
      .then((token) => {
        const headers = { authorization: `Bearer ${token.authToken}` };
        axios
          .get(process.env.REACT_APP_SUPABASE_ALL_LINKS, {
            headers,
          })
          .then((res) => {
            console.log(res.data.from.to);
            setSentTo(res.data.from);
          });
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <div className="flex flex-col gap-2 text-white mx-4 overflow-y-scroll h-[370px] mt-[10px]">
      {sentTo &&
        sentTo.map((item, i) => {
          return (
            <div
              className="flex flex-col justify-between text-sm border-[0.5px] border-[#121212] font-thin my-1 p-2 hover:border-[0.5px] hover:border-[#1D1D1D] hover:cursor-pointer duration-200"
              key={i}
            >

              <div className="py-1 text-purple-500 font-medium">{item.to[0]}</div>

              <div className="py-1 text-gray-400 overflow-hidden hover:text-gray-100">
                <a href={item.url} target="_blank" rel="noreferrer">
                  {item.url}
                </a>
              </div>
              <div className="text-green-500 text-xs font-medium ml-auto">date</div>
            </div>
          );
        })}
    </div>
  );
}
export default SentLinks;
