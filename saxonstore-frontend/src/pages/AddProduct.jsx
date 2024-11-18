import React from "react";

const AddProduct = () => {
  return (
    <div className="p-6 md:p-10">
      {/* Navbar Space */}
      
      <div className="p-20 md:p-25"></div>
      
     

      {/* Main Content */}
      <div className="lg:flex lg:space-x-8 lg:mt-20 pt-20">
        <div className="lg:w-2/3 space-y-6">
          {/* Heading */}
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Add Product</h2>

          {/* Title and Price */}
          <div className="space-y-2">
            <label className="block text-gray-700">Title</label>
            <input
              type="text"
              className="w-full border rounded-md p-2 focus:outline-none"
              placeholder="Enter product title"
            />
          </div>

          <div className="space-y-2 mt-4">
            <label className="block text-gray-700">Price (LKR)</label>
            <input
              type="text"
              className="w-full border rounded-md p-2 focus:outline-none"
              placeholder="Enter product price"
            />
          </div>

          {/* Category and Sub-category */}
          <div className="flex space-x-4 mt-4">
            <div className="w-1/2">
              <label className="block text-gray-700">Category</label>
              <select className="w-full border rounded-md p-2 focus:outline-none">
                <option>Men's wear</option>
                <option>Women's wear</option>
              </select>
            </div>
            <div className="w-1/2">
              <label className="block text-gray-700">Sub category</label>
              <select className="w-full border rounded-md p-2 focus:outline-none">
                <option>Tops</option>
                <option>Bottoms</option>
                <option>Shoes</option>
                <option>Accessories</option>
              </select>
            </div>
          </div>

          {/* Available Colors */}
          <div className="mt-4">
            <label className="block text-gray-700">Available Colors</label>
            <select className="w-full border rounded-md p-2 mb-2 focus:outline-none">
              <option>Brown</option>
              <option>Black</option>
              <option>White</option>
            </select>
            <div className="flex space-x-2 mt-2">
              <button className="p-2 bg-black text-white w-20">Black</button>
              <button className="p-2 bg-white border border-gray-400 w-20">White</button>
              <button className="p-2 bg-[#A0522D] text-white w-20">Brown</button>
            </div>
          </div>

          {/* Available Sizes */}
          <div className="mt-4">
            <label className="block text-gray-700">Available Sizes</label>
            <div className="flex space-x-2 mt-2">
              <button className="p-2 rounded-md border">XS</button>
              <button className="p-2 rounded-md border bg-black text-white">S</button>
              <button className="p-2 rounded-md border bg-black text-white">M</button>
              <button className="p-2 rounded-md border bg-black text-white">L</button>
              <button className="p-2 rounded-md border">XL</button>
              <button className="p-2 rounded-md border">XXL</button>
            </div>
          </div>

          {/* Description */}
          <div className="mt-4">
            <label className="block text-gray-700">Description</label>
            <textarea
              className="w-full border rounded-md p-2 focus:outline-none"
              rows="4"
              placeholder="Enter product description"
            ></textarea>
          </div>

          {/* Image Upload */}
          <div className="mt-4">
            <label className="block text-gray-700">Add Images</label>
            <div className="flex space-x-4 mt-2">
              <div className="w-24 h-24 border flex items-center justify-center">
                <span>Image 1</span>
              </div>
              <div className="w-24 h-24 border flex items-center justify-center">
                <span>Image 2</span>
              </div>
              <div className="w-24 h-24 border flex items-center justify-center">
                <span>Image 3</span>
              </div>
            </div>
            <button className="mt-4 p-2 bg-gray-200 border rounded-md">
              Add Images
            </button>
          </div>
        </div>

      {/* Available Quantities */}
<div className="lg:w-1/3 space-y-4 mt-6 lg:mt-0 w-11/12 mx-auto">
  <label className="block text-gray-700">Available Quantities</label>
  {["Black", "White", "Brown"].map((color) => (
    <div key={color} className="bg-gray-100 p-4 rounded-md space-y-2 w-full">
      <h3 className="font-semibold">{color}</h3>
      <div className="flex space-x-4">
        {["S", "M", "L"].map((size) => (
          <div key={size} className="flex items-center space-x-2 w-1/3">
            <span className="w-6">{size}</span>
            <input
              type="number"
              defaultValue={5}
              className="w-full border rounded-md p-1 text-center"
            />
          </div>
        ))}
      </div>
    </div>
  ))}

  {/* Submit Button */}
  <button className="w-full p-4 mt-6 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400">
    Add Product
  </button>
</div>


      </div>
    </div>
  );
};

export default AddProduct;
