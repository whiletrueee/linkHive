function ShareButton(props) {
  return (
      <button className={`bg-purple-800 px-5 py-1 text-white rounded-full hover:bg-purple-700 hover:cursor-pointer ${props.extraClass}`}>
        {props.label}
      </button>
  );
}

export default ShareButton;
