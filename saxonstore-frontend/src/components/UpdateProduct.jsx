import { useState } from "react";
import InputComponent from "./InputComponent";
import Button from "./Button";
import { updateProduct } from "../services/productService";
import { toast } from "../hooks/use-toast";
import { SyncLoader } from "react-spinners";

function UpdateProduct({ product }) {
  const colors = [...new Set(product.productVariants.map((v) => v.color.name))];
  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

  const initialStock = colors.map((color) => {
    const row = {};
    sizes.forEach((size) => {
      const variant = product.productVariants.find(
        (v) => v.color.name === color && v.size.name === size,
      );
      row[size] = variant ? variant.quantity : 0;
    });
    return { color, ...row };
  });

  const [price, setPrice] = useState(product.price);
  const [stock, setStock] = useState(initialStock);
  const [isLoading, setIsLoading] = useState(false);

  const handleStockChange = (color, size, value) => {
    setStock((prevStock) =>
      prevStock.map((row) =>
        row.color === color ? { ...row, [size]: Number(value) } : row,
      ),
    );
  };

  const onUpdateClick = async () => {
    setIsLoading(true);

    try {
      // Build the productVariants array from stock
      const productVariants = [];
      stock.forEach((row) => {
        sizes.forEach((size) => {
          const variant = product.productVariants.find(
            (v) => v.color.name === row.color && v.size.name === size,
          );
          if (variant) {
            productVariants.push({
              productVariantId: variant.productVariantId,
              quantity: row[size],
            });
          }
        });
      });

      const payload = {
        price,
        productVariants,
      };

      await updateProduct(product.productId, payload);

      toast({
        description: `Product updated successfully`,
        className: "border border-green-500 rounded-lg p-4",
      });
    } catch (error) {
      toast({
        description: `There was an error updating the product`,
        className: "border border-red-500 rounded-lg p-4",
      });
      console.error("Error making PUT request:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="px-5">
      <div className="font-serif text-2xl">{product.name}</div>
      <InputComponent
        className="mt-6"
        title="Price"
        required={false}
        value={price}
        setValue={setPrice}
      />
      <div className="my-10 overflow-x-auto">
        <table className="w-full table-auto border-collapse border border-gray-300 text-center">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Color</th>
              {sizes.map((size) => (
                <th key={size} className="border border-gray-300 px-4 py-2">
                  {size}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {stock.map((row, index) => (
              <tr key={index}>
                <td className="border border-gray-300 px-4 py-2">
                  {row.color}
                </td>
                {sizes.map((size) => (
                  <td key={size} className="border border-gray-300 px-2 py-2">
                    <input
                      type="number"
                      value={row[size]}
                      onChange={(e) =>
                        handleStockChange(row.color, size, e.target.value)
                      }
                      className="w-full border px-2 py-1 text-center"
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex w-full flex-col justify-end">
        <div className="ml-auto mt-6 w-60">
          {isLoading ? (
            <SyncLoader size={10} className="my-4" />
          ) : (
            <Button text="UPDATE" onClick={onUpdateClick} />
          )}
        </div>
      </div>
    </div>
  );
}

export default UpdateProduct;
