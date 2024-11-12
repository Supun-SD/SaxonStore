import { Eye, Trash2 } from "lucide-react";

function MyProduct({ product, key, handleDeleteClick }) {
  return (
    <div
      key={key}
      className="rounded-lg border border-gray-200 p-4 transition-shadow hover:shadow-lg"
    >
      <div className="mb-4 h-40 rounded-md bg-gray-200"></div>
      <h2 className="text-lg font-semibold">{product.name}</h2>
      <p className="text-gray-500">{product.id}</p>
      <div className="mt-4 flex flex-col space-y-2 md:flex-row md:justify-between md:space-x-2 md:space-y-0">
        <button className="w-full border border-black px-8 py-2 text-black transition duration-300 hover:bg-black hover:text-white">
          UPDATE
        </button>
        <button className="rounded-none border border-gray-400 px-4 py-2 text-black">
          <Eye size={20} />
        </button>
        <button
          onClick={() => handleDeleteClick(product.name)}
          className="rounded-none bg-black px-4 py-2 text-white"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}

export default MyProduct;
