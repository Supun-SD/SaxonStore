const ProgressBar = ({ status, payStatus }) => {
  const steps = [payStatus, "SHIPPED", "DELIVERED"];
  const currentIndex = steps.indexOf(status);

  return (
    <div className="mb-10 flex w-full items-center justify-center">
      {steps.map((step, index) => (
        <div key={index} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={`flex h-6 w-6 items-center justify-center rounded-full border-2 ${
                index <= currentIndex
                  ? "border-black bg-black text-white"
                  : "border-gray-300 bg-white text-gray-500"
              }`}
            >
              {index <= currentIndex && (
                <span className="text-xs font-bold">✓</span>
              )}
            </div>
            <span
              className={`absolute top-16 mt-2 text-sm ${
                index <= currentIndex
                  ? "font-semibold text-black"
                  : "text-gray-500"
              }`}
            >
              {step.charAt(0).toUpperCase() + step.slice(1).toLowerCase()}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div
              className={`h-1 w-56 ${
                index < currentIndex ? "bg-black" : "bg-gray-300"
              }`}
            ></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProgressBar;
