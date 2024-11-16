import forHim from "../assets/forHim.png";
import forHer from "../assets/forHer.png";
import { useNavigate } from "react-router-dom";

function CategoryBanner() {
  const navigate = useNavigate();

  const onForHerClick = () => {
    navigate("/products?type=women&subtype=tops");
  };

  const onForHimClick = () => {
    navigate("/products?type=men&subtype=tops");
  };

  return (
    <div className="container mx-auto mb-20 mt-16 flex flex-col items-center justify-between">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2">
        <div className="group relative">
          <img
            src={forHim}
            alt="For Her"
            className="h-auto w-full object-cover"
          />
          <div className="absolute inset-0 flex flex-col justify-between bg-black bg-opacity-30 p-6 transition duration-300 group-hover:bg-opacity-50">
            <div className="flex justify-end">
              <h2 className="font-serif text-7xl font-bold text-white">
                For <br /> Him
              </h2>
            </div>
            <div className="flex justify-start">
              <button
                className="mt-auto rounded-full bg-white px-4 py-2 text-black hover:bg-gray-200"
                onClick={onForHimClick}
              >
                Shop Now
              </button>
            </div>
          </div>
        </div>
        <div className="group relative">
          <img
            src={forHer}
            alt="For Her"
            className="h-auto w-full object-cover"
          />
          <div className="absolute inset-0 flex flex-col justify-between bg-black bg-opacity-30 p-6 transition duration-300 group-hover:bg-opacity-50">
            <div className="flex justify-end">
              <h2 className="font-serif text-7xl font-bold text-white">
                For <br />
                Her
              </h2>
            </div>
            <div className="flex justify-start">
              <button
                className="mt-auto rounded-full bg-white px-4 py-2 text-black hover:bg-gray-200"
                onClick={onForHerClick}
              >
                Shop Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryBanner;
