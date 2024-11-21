function ViewProduct({ product }) {
  const colors = [...new Set(product.productVariants.map((v) => v.color.name))];

  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

  const stock = colors.map((color) => {
    const row = {};
    sizes.forEach((size) => {
      const variant = product.productVariants.find(
        (v) => v.color.name === color && v.size.name === size,
      );
      row[size] = variant ? variant.quantity : 0;
    });
    return { color, ...row };
  });

  return (
    <div className="px-5">
      <div className="font-serif text-2xl">{product.name}</div>
      <div className="mt-2 text-xl">LKR {product.price.toFixed(2)}</div>
      <div className="my-4 flex gap-2">
        {product.productImages.map((image, index) => (
          <div className="h-24 w-24 overflow-hidden" key={index}>
            <img
              src={image}
              alt={`Product image ${index + 1}`}
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </div>
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
                  <td key={size} className="border border-gray-300 px-4 py-2">
                    {row[size]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ViewProduct;
