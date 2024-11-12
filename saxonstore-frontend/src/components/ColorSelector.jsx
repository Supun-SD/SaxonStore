const ColorSelector = ({ colors, selectedColor, onColorSelect }) => {
  return (
    <>
      <div className="my-5">
        {selectedColor ? "Color: " + selectedColor.name : "Select the color"}
      </div>

      <div className="flex gap-3">
        {colors.map((c) => (
          <div
            key={c.hex_value}
            className={`cursor-pointer rounded-full border p-1 ${
              selectedColor && selectedColor.hex_value === c.hex_value
                ? "border-black"
                : "border-transparent"
            }`}
            onClick={() => onColorSelect(c)}
          >
            <div
              className="h-5 w-5 rounded-full"
              style={{ backgroundColor: c.hex_value }}
            ></div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ColorSelector;
