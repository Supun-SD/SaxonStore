function SelectInput({ title, options, value, handleChange }) {
  return (
    <div className="relative z-10">
      <label className="text-md absolute -top-4 left-3 bg-white px-3 text-gray-600">
        {title}
      </label>
      <select
        className="w-full rounded-lg border border-gray-300 px-6 py-4 focus:outline-1 focus:outline-gray-400"
        name={title}
        id={title}
        value={value}
        onChange={(e) => handleChange(e.target.value)}
      >
        {options.map((o) => {
          return (
            <option key={o.value} value={o.value}>
              {o.name}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default SelectInput;
