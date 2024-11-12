import { useEffect, useState } from "react";
import CategoriesDropDown from "../components/CategoriesDropDown";
import MyProduct from "../components/MyProduct";
import { useNavigate } from "react-router-dom";
import testProducts from "../data/products";

function ProductManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [products, setProducts] = useState(testProducts);

  useEffect(() => {
    const filteredProducts = testProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.id.toString().includes(searchQuery),
    );

    setProducts(filteredProducts);
  }, [searchQuery]);

  const navigate = useNavigate();

  function onCategorySelect(selected) {
    if (selected == "All Products") {
      setSelectedCategory(selected);
      setProducts(testProducts);
      return;
    }
    setSelectedCategory(`${selected.category}'s ${selected.subcategory}`);

    const filteredProducts = testProducts.filter((product) => {
      return (
        product.category === selected.category &&
        product.subcategory === selected.subcategory
      );
    });

    setProducts(filteredProducts);
  }

  return (
    <div className="mx-auto mb-20 mt-36 w-full max-w-7xl flex-col items-center justify-between">
      <div className="font-serif text-3xl">My Products</div>

      <div className="mt-8 flex w-full flex-wrap gap-6">
        <input
          type="text"
          placeholder="Search for product by name or product number"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full flex-grow rounded-none border border-gray-300 bg-gray-100 p-3 md:w-1/3"
        />
        <div>
          <CategoriesDropDown
            selectedCategory={selectedCategory}
            onCategorySelect={onCategorySelect}
          />
        </div>

        <button
          className="h-full border border-black px-8 py-3 text-black transition duration-300 hover:bg-black hover:text-white"
          onClick={() => navigate("/admin/add-product")}
        >
          ADD PRODUCT
        </button>
      </div>

      <div className="mt-10 grid w-full gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
        {products.map((product, index) => (
          <MyProduct product={product} key={index} />
        ))}
      </div>
    </div>
  );
}

export default ProductManagement;
