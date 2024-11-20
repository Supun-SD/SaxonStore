import { useEffect, useState } from "react";
import CategoriesDropDown from "../components/CategoriesDropDown";
import MyProduct from "../components/MyProduct";
import { useNavigate } from "react-router-dom";
import { getAllProducts } from "../services/productService";
import { showToast } from "../lib/toast";
import LoadingSekeleton from "../components/LoadingSekeleton";

function ProductManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await getAllProducts();
        if (response.data.httpCode === 404) {
          setProducts([]);
        } else {
          setProducts(response.data.data);
          setFilteredProducts(response.data.data);
        }
      } catch (error) {
        console.error("Error getting products:", error);
        showToast({
          type: "error",
          description: "There was a problem getting products",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const filteredProducts = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.id.toString().includes(searchQuery),
    );

    setFilteredProducts(filteredProducts);
  }, [searchQuery, products]);

  const navigate = useNavigate();

  function onCategorySelect(selected) {
    if (selected == "All Products") {
      setSelectedCategory(selected);
      setFilteredProducts(products);
      return;
    }
    setSelectedCategory(`${selected.category}'s ${selected.subcategory}`);

    const filteredProducts = products.filter((product) => {
      return (
        product.category === selected.category &&
        product.subcategory === selected.subcategory
      );
    });

    setFilteredProducts(filteredProducts);
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

      {isLoading ? (
        <LoadingSekeleton />
      ) : (
        <div className="mt-10 grid w-full gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <MyProduct product={product} key={product.productId} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductManagement;
