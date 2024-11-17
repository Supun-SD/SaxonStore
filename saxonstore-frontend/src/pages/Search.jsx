import { useState } from "react";

import LoadingSekeleton from "../components/LoadingSekeleton";
import { getProductsByName } from "../services/productService";
import { toast } from "../hooks/use-toast";
import ProductCard from "../components/ProductCard";
import Button from "../components/Button";

function Search() {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");

  const onSearchClick = async () => {
    try {
      setIsLoading(true);
      const response = await getProductsByName(searchQuery);
      if (response.data.httpCode === 404) {
        setProducts([]);
        toast({
          description: "No products found",
          className: "border border-red-500 rounded-lg p-4",
        });
      } else {
        setProducts(response.data.data);
      }
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
  return (
    <div className="mx-auto mb-20 mt-36 w-full max-w-7xl flex-col items-center justify-between">
      <div className="flex flex-col gap-4 sm:flex-row">
        <input
          type="text"
          className="min-w-0 flex-[4] border border-gray-400 bg-gray-100 px-4 py-3 text-gray-800 placeholder-gray-500 shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search..."
        />
        <div className="sm:w-80">
          <Button text="Search" onClick={onSearchClick} />
        </div>
      </div>

      {isLoading ? (
        <LoadingSekeleton />
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

export default Search;
