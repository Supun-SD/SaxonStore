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
      <div className="w-full flex-col" >
        <div className="h-64 w-full overflow-hidden"
             data-testid={`product-card-${product.productId}`}>
          <img
            src={primaryImage}
            alt="product image"
            className="h-full w-full object-cover transition-transform duration-300 ease-in-out hover:scale-110"
          />
        </div>

        <div className="mt-3 text-lg">{product.name}</div>
        <div className="mt-1">LKR {product.price.toFixed(2)}</div>
      </div>
    </div>
  );
}

export default ProductCard;
