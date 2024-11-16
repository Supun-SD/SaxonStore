import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import LoadingSekeleton from "../components/LoadingSekeleton";
import { getProductsByCategory } from "../services/productService";
import { toast } from "../hooks/use-toast";
import ProductCard from "../components/ProductCard";

function Products() {
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get("type");
  const subType = queryParams.get("subtype");

  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await getProductsByCategory(type, subType);
        response.data.httpCode === 404
          ? setProducts([])
          : setProducts(response.data.data);
      } catch (error) {
        console.error("Error getting products:", error);
        toast({
          description: "There was a problem getting products",
          className: "border border-red-500 rounded-lg p-4",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [type, subType]);

  return (
    <div className="mx-auto mb-20 mt-36 w-full max-w-7xl flex-col items-center justify-between">
      <div className="font-serif text-3xl">
        {type.charAt(0).toUpperCase() + type.slice(1)}&#39;s{" "}
        {subType.charAt(0).toUpperCase() + subType.slice(1)}
      </div>

      {isLoading ? (
        <LoadingSekeleton />
      ) : products.length === 0 ? (
        <div className="mx-auto mt-36 w-full max-w-7xl flex-col items-center justify-center text-center text-lg">
          <p className="text-xl font-semibold text-gray-600">
            No products available for this category
          </p>
          <p className="mt-2 text-sm text-gray-400">
            Please try again later or adjust your filters.
          </p>
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-2 gap-6 gap-y-10 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {products.map((product) => (
            <ProductCard product={product} key={product.productId} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Products;
