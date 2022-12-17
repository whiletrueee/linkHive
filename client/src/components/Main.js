import Share from "./Share";

function Main() {
  return (
    <>
    <div className="flex text-white items-center justify-center">
      <div className="flex border-r-2 border-gray-500">Send Link</div>
      <div className="flex border-r-2 border-gray-500">Recieved Links</div>
      <div className="flex">Sent Links</div>
    </div>
      <Share />
    </>
  );
}

export default Main;
