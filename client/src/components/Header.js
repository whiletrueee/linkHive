import { useState } from "react";

function Header(props) {
  const [userName, setUsername] = useState("username");
  const [mail, setMail] = useState("mail");

  // eslint-disable-next-line no-undef
  // eslint-disable-next-line no-undef
  chrome.storage.local
    .get(["data"])
    .then((user) => {
      setMail(user.data.user.email);
      setUsername(user.data.user.email.split("@")[0]);
    })
    .catch((e) => console.log(e));

  return (
    <div className="flex justify-between w-[440px] bg-[#121212] border-b-2 border-gray-700 p-2 text-white font-medium text-base items-center">
      Link Hive
      {props.signup ? (
        <div className="font-medium text-xs flex gap-1 items-center">
          <div className="">{userName}</div>
          <div className="">
            <img
              src={`https://avatars.dicebear.com/api/bottts/${mail}.svg`}
              alt="display"
              width={25}
              height={25}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Header;
