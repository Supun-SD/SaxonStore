const SizeSelector = ({ availableSizes, selectedSize, onSizeSelect }) => {
  return (
    <>
      <div className="my-5">
        {selectedSize ? "Size: " + selectedSize : "Select the Size"}
      </div>

      <div className="flex gap-3">
        {availableSizes.map((s) => (
          <div
            key={s}
            className={`w-10 cursor-pointer rounded-md border px-2 py-1 text-center ${s === selectedSize ? "bg-black text-white" : "bg-white"}`}
            onClick={() => onSizeSelect(s)}
          >
            {s}
          </div>
        ))}
      </div>
    </>
  );
};

export default SizeSelector;
