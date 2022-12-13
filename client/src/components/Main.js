import People from "./People";
import Share from "./Share";
import ShareButton from "./ShareButton";

function Main() {
  return (
    <>
      <Share />
      <div className="m-[20px] flex gap-4 flex-wrap">
        <People />
        <People />
        <People />
        <People />
        <People />
      </div>
      <div className="px-4">
        <ShareButton label="Send" />
      </div>
    </>
  );
}

export default Main;
