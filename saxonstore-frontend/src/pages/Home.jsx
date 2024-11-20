import { useEffect, useState } from "react";
import CategoryBanner from "../components/CategoryBanner";
import SlideShow from "../components/SlideShow";
import { Skeleton } from "@/components/ui/skeleton";
import { getNewArrivals } from "../services/productService";
import ProductCard from "../components/ProductCard";
import { showToast } from "../lib/toast";

function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [newArrivals, setNewArrivals] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const savedNewArrivals = sessionStorage.getItem("newArrivals");

        if (savedNewArrivals) {
          setNewArrivals(JSON.parse(savedNewArrivals));
        } else {
          const response = await getNewArrivals();
          if (response.data.httpCode === 404) {
            setNewArrivals([]);
          } else {
            setNewArrivals(response.data.data);
            sessionStorage.setItem(
              "newArrivals",
              JSON.stringify(response.data.data),
            );
          }
        }
      } catch (error) {
        console.error("Error getting products:", error);
        showToast({
          type: "error",
          description: "There was an issue getting products",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <div className="mt-20">
        <SlideShow />
      </div>
      <div className="container mx-auto mb-20 mt-8 w-full max-w-7xl flex-col items-center justify-between">
        <div className="font-serif text-xl font-bold">NEW ARRIVALS</div>

        {isLoading ? (
          <div className="mt-10 grid grid-cols-2 gap-6 gap-y-10 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="flex flex-col space-y-3">
                <Skeleton className="h-52 w-full rounded-lg" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-2 gap-6 gap-y-10 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {newArrivals.slice(0, 5).map((product) => (
              <ProductCard product={product} key={product.productId} />
            ))}
          </div>
        )}

        <CategoryBanner />
      </div>
    </div>
  );
}

export default Home;
