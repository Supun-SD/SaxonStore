import { Eye, ListPlus, ListX } from "lucide-react";
import ConfirmationDialog from "./ConfirmationDialog";
import PopUpModel from "./PopUpModel";
import UpdateProduct from "./UpdateProduct";
import ViewProduct from "./ViewProduct";
import { showToast } from "../lib/toast";
import { useState } from "react";
import { updateProduct } from "../services/productService";

function MyProduct({ product }) {
  const [isListed, setIsListed] = useState(product.isListed);
  const primaryImage = product.productImages.find(
    (image) => image.isPrimary,
  ).imageUrl;

  const updateListing = async (isListed) => {
    try {
      await updateProduct(product.productId, {
        isListed: isListed,
      });
      showToast({
        type: "success",
        description: `Product ${isListed ? "unlisted" : "listed"} successfully`,
      });
      setIsListed(isListed);
    } catch (error) {
      showToast({
        type: "error",
        description: `There was an error ${isListed ? "unlisting" : "listing"} the product`,
      });
      console.error("Error making PUT request:", error);
    }
  };

  return (
    <div
      className={`rounded-lg border ${isListed ? "border-gray-200" : "border-red-400 bg-red-50"} p-4 transition-shadow hover:shadow-lg`}
    >
      <div className="mb-3 h-40 w-full overflow-hidden">
        <img
          src={primaryImage}
          alt="product image"
          className="h-full w-full object-cover"
        />
      </div>
      <h2 className="text-lg font-semibold">{product.name}</h2>
      <p className="text-gray-500">{product.productId}</p>
      <div className="mt-4 flex flex-col space-y-2 md:flex-row md:justify-between md:space-x-2 md:space-y-0">
        <PopUpModel
          button={
            <div className="w-full border border-black px-8 py-2 text-black transition duration-300 hover:bg-black hover:text-white">
              UPDATE
            </div>
          }
        >
          <UpdateProduct product={product} />
        </PopUpModel>
        <PopUpModel
          button={
            <div className="rounded-none border border-gray-400 px-4 py-2.5 text-black">
              <Eye size={20} />
            </div>
          }
        >
          <ViewProduct product={product} />
        </PopUpModel>

        <ConfirmationDialog
          title={
            isListed
              ? "Are you sure you want to unlist this item?"
              : "Are you sure you want to relist this item?"
          }
          message={
            isListed
              ? "This action will remove it from your available products, and it will no longer be visible to customers. You can relist the item at any time."
              : "This action will make the item visible to customers again and available for purchase"
          }
          action={() => updateListing(isListed ? false : true)}
        >
          {isListed ? (
            <button className="rounded-none bg-black px-4 py-2 text-white">
              <ListX size={18} />
            </button>
          ) : (
            <button className="rounded-none bg-black px-4 py-2 text-white">
              <ListPlus size={18} />
            </button>
          )}
        </ConfirmationDialog>
      </div>
    </div>
  );
}

export default MyProduct;
