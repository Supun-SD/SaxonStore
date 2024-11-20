import { useNavigate } from "react-router-dom";

function ProductCard({ product }) {
  const navigate = useNavigate();

  const primaryImage = product.productImages.find(
    (image) => image.isPrimary,
  ).imageUrl;

  const handleClick = () => {
    navigate(`/products/${product.productId}`, { state: { product } });
  };

  return (
    <div
      className="flex cursor-pointer justify-center rounded"
      onClick={handleClick}
    >
      <div className="w-full flex-col">
        <div className="w-full overflow-hidden">
          <img
            src={primaryImage}
            alt="product image"
            className="h-auto w-full object-cover transition-transform duration-300 ease-in-out hover:scale-110"
          />
        </div>
        <div className="mt-3 text-lg">{product.name}</div>
        <div className="mt-1">LKR {product.price.toFixed(2)}</div>
      </div>
    </div>
  );
}

export default ProductCard;
