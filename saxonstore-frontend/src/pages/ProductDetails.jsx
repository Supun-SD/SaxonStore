import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useMemo, useState } from "react";
import Button from "../components/Button";
import { useDispatch } from "react-redux";
import { addProduct } from "../features/cartSlice";
import { useLocation, useNavigate } from "react-router-dom";

import ImageSelector from "../components/ImageSelector";
import ColorSelector from "../components/ColorSelector";
import SizeSelector from "../components/SizeSelector";

function ProductDetails() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { product } = location.state;

  const primaryImage = product.productImages.find(
    (image) => image.isPrimary,
  ).imageUrl;

  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const colors = useMemo(() => {
    return product.productVariants
      .map((variant) => variant.color)
      .filter(
        (value, index, self) =>
          self.findIndex((t) => t.colorId === value.colorId) === index,
      );
  }, [product.productVariants]);

  useMemo(() => {
    if (colors.length > 0 && !selectedColor) {
      setSelectedColor(colors[0]);
    }
  }, [colors, selectedColor]);

  const availableSizes = useMemo(() => {
    if (!selectedColor) return [];
    return product.productVariants
      .filter((variant) => variant.color.hexValue === selectedColor.hexValue)
      .map((variant) => variant.size.name);
  }, [product.productVariants, selectedColor]);

  const selectedProductVariant = useMemo(() => {
    return product.productVariants.find(
      (variant) =>
        variant.size.name === selectedSize &&
        variant.color.hexValue === selectedColor?.hexValue,
    );
  }, [product.productVariants, selectedSize, selectedColor]);

  const onColorSelect = (color) => {
    setSelectedColor(color);
    setSelectedSize(null);
  };

  const onSizeSelect = (size) => {
    setSelectedSize(size);
  };

  const onAddToCartClick = () => {
    if (selectedProductVariant) {
      const cartProduct = {
        productId: product.productId,
        productVariantId: selectedProductVariant.productVariantId,
        color: selectedColor.name,
        size: selectedSize,
        productName: product.name,
        price: product.price,
        quantity,
        imgURL: primaryImage,
      };

      dispatch(addProduct(cartProduct));
      navigate("/cart");
    }
  };

  return (
    <div className="mx-6 mb-20 mt-36 w-full max-w-5xl flex-col md:mx-10 lg:mx-auto">
      <div className="mt-8 grid grid-cols-1 gap-12 md:grid-cols-2">
        <div>
          <ImageSelector images={product.productImages} />
        </div>

        <div>
          <div className="font-serif text-3xl" data-testid="product-title" >{product.name}</div>
          <div className="font-serif text-2xl " data-testid="product-price">
            LKR {product.price.toFixed(2)}
          </div>

          <ColorSelector
            colors={colors}
            selectedColor={selectedColor}
            onColorSelect={onColorSelect}
          />

          {selectedColor && (
            <SizeSelector
              availableSizes={availableSizes}
              selectedSize={selectedSize}
              onSizeSelect={onSizeSelect}
            />
          )}

          <div className="flex-center mt-6 gap-4">
            <div>Quantity</div>
            <select
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-16 rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-1 focus:ring-gray-400"
            >
              {[1, 2, 3, 4, 5].map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>

          {selectedProductVariant && (
            <div className="mt-10 w-[50%]" data-testid="add-to-cart-button">
              <Button
                text="ADD TO CART"
                onClick={() => {
                  onAddToCartClick();
                }}
              />
            </div>
          )}

          <Accordion type="single" collapsible className="mt-6">
            <AccordionItem value="item-1">
              <AccordionTrigger>Details</AccordionTrigger>
              <AccordionContent>{product.description}</AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
