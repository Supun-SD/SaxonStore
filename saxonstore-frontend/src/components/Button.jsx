const Button = ({ text, onClick }) => {
  return (
    <button
      className="w-full border border-black px-8 py-4 text-black transition duration-300 hover:bg-black hover:text-white"
      onClick={onClick}
    >
      {text}

    </button>
  );
};

export default Button;
