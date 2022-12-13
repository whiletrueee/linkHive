import "./App.css";
import Header from "./Header";
import People from "./People";
import Share from "./Share";
import ShareButton from "./ShareButton";
function App() {
  return (
    <div className="w-[400px] overflow-hidden bg-black">
      <Header />
      <Share />
      <div className="m-[20px] flex gap-4 flex-wrap">
        <People />
        <People />
        <People />
        <People />
        <People />
      </div>
      <ShareButton />
    </div>
  );
}

export default App;
