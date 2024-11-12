import React, { useState, useEffect, useRef } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

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

  const handleDeleteClick = (productName) => {
    const confirmed = window.confirm(`Are you sure you want to delete ${productName}? This action cannot be undone, and all inventory data for this item will be permanently removed.`);
    if (confirmed) {
      alert(`${productName} has been deleted.`);
    }
  };

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
    <div className="flex flex-col h-screen justify-center items-center pt-16">
      <div className="pt-32 p-6 md:p-10 lg:p-12 space-y-8 w-full max-w-7xl">
        {/* Heading */}
        <h1 className="text-3xl font-bold mb-4 text-center md:text-left">My Products</h1>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 w-full">
          <input
            type="text"
            placeholder="Search for product by name or product number"
            className="flex-grow p-3 border border-gray-300 w-full md:w-1/3 bg-gray-100 rounded-none"
          />

          <div className="relative w-full md:w-auto" ref={dropdownRef}>
            <button
              className="p-3 border border-gray-300 w-full md:w-56 bg-gray-100 text-left rounded-none flex justify-between items-center"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              All Products
              <i className="fas fa-chevron-down ml-2 text-gray-500"></i>
            </button>

            {isDropdownOpen && (
              <div className="absolute left-0 mt-2 w-full md:w-56 bg-white border border-gray-300 rounded-md shadow-lg">
                {categories.map((category, index) => (
                  <div key={index}>
                    <button
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 flex justify-between items-center"
                      onClick={() => {
                        if (category.name === "Men's Wear") setIsMenOpen(!isMenOpen);
                        else if (category.name === "Women's Wear") setIsWomenOpen(!isWomenOpen);
                      }}
                    >
                      {category.name}
                      <i className="fas fa-chevron-right ml-4 text-gray-500"></i>
                    </button>
                    {(category.name === "Men's Wear" && isMenOpen) ||
                    (category.name === "Women's Wear" && isWomenOpen) ? (
                      <div className="pl-6">
                        {category.subcategories.map((subcategory, subIndex) => (
                          <button key={subIndex} className="block w-full text-left px-4 py-2">
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

          <button className="border border-black text-black px-6 py-3 w-full md:w-auto rounded-none">
            ADD PRODUCT
          </button>
        </div>

        {/* Product List */}
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 w-full">
          {products.map((product, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
              <div className="bg-gray-200 h-40 mb-4 rounded-md"></div>
              <h2 className="text-lg font-semibold">{product.name}</h2>
              <p className="text-gray-500">{product.id}</p>
              <div className="mt-4 flex flex-col md:flex-row md:justify-between space-y-2 md:space-y-0 md:space-x-2">
                <button className="text-black border border-gray-400 px-4 py-2 rounded-none">
                  UPDATE
                </button>
                <button className="text-black border border-gray-400 px-4 py-2 rounded-none">
                  <i className="fas fa-eye"></i>
                </button>
                <button
                  onClick={() => handleDeleteClick(product.name)}
                  className="bg-black text-white px-4 py-2 rounded-none"
                >
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductManagement;
