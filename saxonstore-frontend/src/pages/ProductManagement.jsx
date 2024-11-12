import { useState, useEffect, useRef } from "react";
import MyProduct from "../components/MyProduct";

const ProductManagement = () => {
  const [isMenOpen, setIsMenOpen] = useState(false);
  const [isWomenOpen, setIsWomenOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

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

  const products = [
    { name: "Vivid Vision Trousers", id: "MT31551" },
    { name: "Stylish Comfort Shirt", id: "MT31552" },
    { name: "Classic Fit Jeans", id: "MT31553" },
    { name: "Premium Hoodie", id: "MT31554" },
    { name: "Sporty Jacket", id: "MT31555" },
    { name: "Formal Blazer", id: "MT31556" },
    { name: "Summer Shorts", id: "MT31557" },
    { name: "Casual Sweatpants", id: "MT31558" },
  ];

  // Close the dropdown when clicking outside of it
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
    <div className="mx-6 mb-20 mt-32 w-full max-w-7xl flex-col lg:mx-auto">
      {/* Heading */}
      <h1 className="mb-6 text-start font-serif text-3xl font-bold">
        My Products
      </h1>

      {/* Search and Filter */}
      <div className="mb-8 flex w-full flex-col items-center md:flex-row md:space-x-4 md:space-y-0">
        <input
          type="text"
          placeholder="Search for product by name or product number"
          className="w-full flex-grow rounded-none border border-gray-300 bg-gray-100 p-3 md:w-1/3"
        />

        <div className="relative w-full md:w-auto" ref={dropdownRef}>
          <button
            className="flex w-full items-center justify-between rounded-none border border-gray-300 bg-gray-100 p-3 text-left md:w-56"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            All Products
            <i className="fas fa-chevron-down ml-2 text-gray-500"></i>
          </button>

          {isDropdownOpen && (
            <div className="absolute left-0 mt-2 w-full rounded-md border border-gray-300 bg-white shadow-lg md:w-56">
              {categories.map((category, index) => (
                <div key={index}>
                  <button
                    className="flex w-full items-center justify-between px-4 py-2 text-left hover:bg-gray-100"
                    onClick={() => {
                      if (category.name === "Men's Wear")
                        setIsMenOpen(!isMenOpen);
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

        <button className="h-full border border-black px-8 py-3 text-black transition duration-300 hover:bg-black hover:text-white">
          ADD PRODUCT
        </button>
      </div>

      {/* Product List */}
      <div className="grid w-full gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
        {products.map((product, index) => (
          <MyProduct product={product} key={index} />
        ))}
      </div>
    </div>
  );
};

export default ProductManagement;
