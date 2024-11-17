import { useEffect, useRef, useState } from "react";

const categories = [
  {
    name: "Men's Wear",
    subcategories: ["Tops", "Bottoms", "Footwear", "Accessories"],
  },
  {
    name: "Women's Wear",
    subcategories: ["Tops", "Bottoms", "Footwear", "Accessories"],
  },
];

function CategoriesDropDown({ selectedCategory, onCategorySelect }) {
  const [isMenOpen, setIsMenOpen] = useState(false);
  const [isWomenOpen, setIsWomenOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
        setIsMenOpen(false);
        setIsWomenOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className="relative w-full md:w-auto" ref={dropdownRef}>
      <button
        className="flex w-full items-center justify-between rounded-none border border-gray-300 bg-gray-100 p-3 text-left md:w-56"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        {selectedCategory}
        <i className="fas fa-chevron-down ml-2 text-gray-500"></i>
      </button>

      {isDropdownOpen && (
        <div className="absolute left-0 mt-2 w-full rounded-md border border-gray-300 bg-white shadow-lg md:w-56">
          <button
            className="flex w-full items-center justify-between px-4 py-2 text-left hover:bg-gray-100"
            onClick={() => {
              onCategorySelect("All Products");
              setIsDropdownOpen(false);
            }}
          >
            All Products
          </button>
          {categories.map((category, index) => (
            <div key={index}>
              <button
                className="flex w-full items-center justify-between px-4 py-2 text-left hover:bg-gray-100"
                onClick={() => {
                  if (category.name === "Men's Wear") setIsMenOpen(!isMenOpen);
                  else if (category.name === "Women's Wear")
                    setIsWomenOpen(!isWomenOpen);
                }}
              >
                {category.name}
                <i className="fas fa-chevron-right ml-4 text-gray-500"></i>
              </button>
              {(category.name === "Men's Wear" && isMenOpen) ||
              (category.name === "Women's Wear" && isWomenOpen) ? (
                <div className="pl-6">
                  {category.subcategories.map((subcategory, subIndex) => (
                    <button
                      key={subIndex}
                      className="block w-full px-4 py-2 text-left"
                      onClick={() => {
                        onCategorySelect({
                          category: category.name.split("'")[0],
                          subcategory,
                        });
                        setIsDropdownOpen(false);
                      }}
                    >
                      {subcategory}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CategoriesDropDown;
