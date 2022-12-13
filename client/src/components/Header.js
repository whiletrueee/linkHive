function Header(props) {
  return (
    <div className="flex justify-between w-[400px] bg-black border-b-2 border-gray-700 p-2 text-white font-bold text-lg items-center">
      Instant Share
      {props.signup ? (
        <div
          className="font-medium text-base hover:cursor-pointer hover:text-red-500"
          onClick={() => props.setSignup(false)}
        >
          Logout
        </div>
      ):null}
    </div>
  );
}

export default Header;
