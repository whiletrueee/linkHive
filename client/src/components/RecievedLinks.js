import axios from "axios";
import { useEffect, useState } from "react";
import { formatTime } from "../utils/formatTime";

function RecvLinks() {
  const [recvFrom, setRecvFrom] = useState();
  const [fetching, setfetching] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line no-undef
    chrome.storage.local
      .get(["authToken"])
      .then((token) => {
        const headers = { authorization: `Bearer ${token.authToken}` };
        setfetching(true);
        axios
          .get(process.env.REACT_APP_SUPABASE_ALL_LINKS, {
            headers,
          })
          .then((res) => {
            console.log(res.data.to);
            setRecvFrom(res.data.to);
            setfetching(false);
          });
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <div className="flex flex-col gap-2 text-white mx-4 overflow-y-scroll h-[350px] mt-[10px]">
      {fetching && (
        <>
          <div className="flex flex-col justify-between my-1 p-2 border-[0.5px] border-[#1D1D1D] hover:cursor-pointer duration-200 gap-2 opacity-60">
            <div className="py-1 bg-pink-500 font-medium h-[1.2rem] w-[10rem] animate-pulse"></div>
            <div className="py-1 bg-gray-400 overflow-hidden hover:text-gray-100 h-[1.3rem] w-[20rem] animate-pulse"></div>
            <div className="bg-green-500 text-xs font-medium ml-auto h-[1rem] w-[2rem] animate-pulse"></div>
          </div>
          <div className="flex flex-col justify-between my-1 p-2 border-[0.5px] border-[#1D1D1D] hover:cursor-pointer duration-200 gap-2 opacity-60">
            <div className="py-1 bg-pink-500 font-medium h-[1.2rem] w-[10rem] animate-pulse"></div>
            <div className="py-1 bg-gray-400 overflow-hidden hover:text-gray-100 h-[1.3rem] w-[20rem] animate-pulse"></div>
            <div className="bg-green-500 text-xs font-medium ml-auto h-[1rem] w-[2rem] animate-pulse"></div>
          </div>
          <div className="flex flex-col justify-between my-1 p-2 border-[0.5px] border-[#1D1D1D] hover:cursor-pointer duration-200 gap-2 opacity-60">
            <div className="py-1 bg-pink-500 font-medium h-[1.2rem] w-[10rem] animate-pulse"></div>
            <div className="py-1 bg-gray-400 overflow-hidden hover:text-gray-100 h-[1.3rem] w-[20rem] animate-pulse"></div>
            <div className="bg-green-500 text-xs font-medium ml-auto h-[1rem] w-[2rem] animate-pulse"></div>
          </div>
          <div className="flex flex-col justify-between my-1 p-2 border-[0.5px] border-[#1D1D1D] hover:cursor-pointer duration-200 gap-2 opacity-60">
            <div className="py-1 bg-pink-500 font-medium h-[1.2rem] w-[10rem] animate-pulse"></div>
            <div className="py-1 bg-gray-400 overflow-hidden hover:text-gray-100 h-[1.3rem] w-[20rem] animate-pulse"></div>
            <div className="bg-green-500 text-xs font-medium ml-auto h-[1rem] w-[2rem] animate-pulse"></div>
          </div>
          <div className="flex flex-col justify-between my-1 p-2 border-[0.5px] border-[#1D1D1D] hover:cursor-pointer duration-200 gap-2 opacity-60">
            <div className="py-1 bg-pink-500 font-medium h-[1.2rem] w-[10rem] animate-pulse"></div>
            <div className="py-1 bg-gray-400 overflow-hidden hover:text-gray-100 h-[1.3rem] w-[20rem] animate-pulse"></div>
            <div className="bg-green-500 text-xs font-medium ml-auto h-[1rem] w-[2rem] animate-pulse"></div>
          </div>
          <div className="flex flex-col justify-between my-1 p-2 border-[0.5px] border-[#1D1D1D] hover:cursor-pointer duration-200 gap-2 opacity-60">
            <div className="py-1 bg-pink-500 font-medium h-[1.2rem] w-[10rem] animate-pulse"></div>
            <div className="py-1 bg-gray-400 overflow-hidden hover:text-gray-100 h-[1.3rem] w-[20rem] animate-pulse"></div>
            <div className="bg-green-500 text-xs font-medium ml-auto h-[1rem] w-[2rem] animate-pulse"></div>
          </div>
          <div className="flex flex-col justify-between my-1 p-2 border-[0.5px] border-[#1D1D1D] hover:cursor-pointer duration-200 gap-2 opacity-60">
            <div className="py-1 bg-pink-500 font-medium h-[1.2rem] w-[10rem] animate-pulse"></div>
            <div className="py-1 bg-gray-400 overflow-hidden hover:text-gray-100 h-[1.3rem] w-[20rem] animate-pulse"></div>
            <div className="bg-green-500 text-xs font-medium ml-auto h-[1rem] w-[2rem] animate-pulse"></div>
          </div>
        </>
      )}
      {recvFrom &&
        recvFrom.reverse().map((item, i) => {
          const timeRelative = formatTime(item.created_at);
          return (
            <div
              className="flex flex-col justify-between text-sm border-[0.5px] border-[#121212] font-thin my-1 p-2 hover:border-[0.5px] hover:border-[#1D1D1D] hover:cursor-pointer duration-200"
              key={i}
            >
              <div className="py-1 text-pink-500 font-medium">{item.from}</div>

              <div className="py-1 text-gray-400 overflow-hidden hover:text-gray-100">
                <a href={item.url} target="_blank" rel="noreferrer">
                  {item.url}
                </a>
              </div>
              <div className="text-green-500 text-xs font-medium ml-auto">
                {timeRelative ?? ""}
              </div>
            </div>
          );
        })}
    </div>
  );
}
export default RecvLinks;
