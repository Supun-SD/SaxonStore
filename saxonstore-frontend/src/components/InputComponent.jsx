const InputComponent = ({
  title,
  value,
  setValue,
  required = true,
  className,
  height,
}) => {
  return (
    <div className={`relative ${className} z-10`}>
      <label className="text-md absolute -top-3 left-3 bg-white px-3 text-gray-600">
        {title}
        {required && <span> *</span>}
      </label>
      <input
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        type="text"
        className={`h-[${height}] w-full rounded-lg border border-gray-300 px-6 py-4 focus:outline-1 focus:outline-gray-400`}
        placeholder=""
      />
    </div>
  );
};

export default InputComponent;
