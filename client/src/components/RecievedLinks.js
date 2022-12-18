import axios from "axios";
import { useEffect, useState } from "react";

function RecvLinks() {
  const [recvFrom, setRecvFrom] = useState();
  useEffect(() => {
    // eslint-disable-next-line no-undef
    chrome.storage.local
      .get(["authToken"])
      .then((token) => {
        const headers = { authorization: `Bearer ${token.authToken}` };
        axios
          .get("https://qgmucqaljwipbdatwznn.functions.supabase.co/all-links", {
            headers,
          })
          .then((res) => {
            console.log(res.data.to);
            setRecvFrom(res.data.to);
          });
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <div className="text-white mt-[20px] mx-5">
      <table className="text-xs w-full text-center gap-4">
        <tr className="bg-gray-300 text-black text-sm">
          <th>Received From</th>
          <th>URL</th>
        </tr>
        {recvFrom &&
          recvFrom.map((item, i) => {
            return (
              <tr key={i}>
                <td>{item.from}</td>
                <td>
                  <a href={item.url} target="_blank" rel="noreferrer">
                    {item.url}
                  </a>
                </td>
              </tr>
            );
          })}
      </table>
    </div>
  );
}
export default RecvLinks;
