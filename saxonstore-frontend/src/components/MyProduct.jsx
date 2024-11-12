import { Eye, Trash2 } from "lucide-react";
import ConfirmationDialog from "./ConfirmationDialog";
import PopUpModel from "./PopUpModel";
import UpdateProduct from "./UpdateProduct";
import ViewProduct from "./ViewProduct";

function MyProduct({ product, key }) {
  return (
    <div
      key={key}
      className="rounded-lg border border-gray-200 p-4 transition-shadow hover:shadow-lg"
    >
      <div className="mb-4 h-40 rounded-md bg-gray-200"></div>
      <h2 className="text-lg font-semibold">{product.name}</h2>
      <p className="text-gray-500">{product.id}</p>
      <div className="mt-4 flex flex-col space-y-2 md:flex-row md:justify-between md:space-x-2 md:space-y-0">
        <PopUpModel
          title="Update Product"
          button={
            <button className="w-full border border-black px-8 py-2 text-black transition duration-300 hover:bg-black hover:text-white">
              UPDATE
            </button>
          }
        >
          <UpdateProduct product={product} />
        </PopUpModel>
        <PopUpModel
          button={
            <button className="rounded-none border border-gray-400 px-4 py-2.5 text-black">
              <Eye size={20} />
            </button>
          }
        >
          <ViewProduct product={product} />
        </PopUpModel>

        <ConfirmationDialog message="Are you sure want to delete this product from your store ?">
          <button className="rounded-none bg-black px-4 py-2 text-white">
            <Trash2 size={18} />
          </button>
        </ConfirmationDialog>
      </div>
    </div>
  );
}

export default MyProduct;
