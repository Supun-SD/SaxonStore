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
import { useNavigate } from "react-router-dom";

import sampleImage from "../assets/sample.jpg";
import tshirt1 from "../assets/tshirt1.jpg";
import tshirt2 from "../assets/tshirt2.jpg";
import tshirt3 from "../assets/tshirt3.jpg";
import tshirt4 from "../assets/tshirt4.jpg";
import ImageSelector from "../components/ImageSelector";
import ColorSelector from "../components/ColorSelector";
import SizeSelector from "../components/SizeSelector";

function ProductDetails() {
  const product = {
    id: 1,
    name: "Classic T-Shirt",
    description:
      "The Urban Explorer Jacket combines style and functionality, designed for those on the go. Made from a resilient blend of materials, this jacket ensures comfort and durability in any environment. Its modern design features a streamlined look, perfect for both active and casual wear, making it ideal for city life and outdoor adventures alike. Materials: 70% Cotton, 30% Nylon",
    price: 2800.0,
    category: "Men",
    subcategory: "Tops",
    created_at: "2024-10-20T14:30:00Z",
    updated_at: "2024-11-10T08:45:00Z",
    variants: [
      {
        productVariantId: 101,
        color: {
          id: 1,
          name: "Black",
          hex_value: "#000000",
        },
        size: {
          id: 1,
          name: "S",
        },
        quantity: 20,
        sku: "CT-BLK-S-101",
      },
      {
        productVariantId: 102,
        color: {
          id: 1,
          name: "Black",
          hex_value: "#000000",
        },
        size: {
          id: 2,
          name: "M",
        },
        quantity: 30,
        sku: "CT-BLK-M-102",
      },
      {
        productVariantId: 103,
        color: {
          id: 1,
          name: "Black",
          hex_value: "#000000",
        },
        size: {
          id: 3,
          name: "L",
        },
        quantity: 25,
        sku: "CT-BLK-L-103",
      },
      {
        productVariantId: 104,
        color: {
          id: 3,
          name: "White",
          hex_value: "#FFFFFF",
        },
        size: {
          id: 1,
          name: "S",
        },
        quantity: 15,
        sku: "CT-WHT-S-104",
      },
      {
        productVariantId: 105,
        color: {
          id: 3,
          name: "White",
          hex_value: "#FFFFFF",
        },
        size: {
          id: 2,
          name: "M",
        },
        quantity: 20,
        sku: "CT-WHT-M-105",
      },
      {
        productVariantId: 106,
        color: {
          id: 3,
          name: "White",
          hex_value: "#FFFFFF",
        },
        size: {
          id: 4,
          name: "XL",
        },
        quantity: 10,
        sku: "CT-WHT-XL-106",
      },
      {
        productVariantId: 107,
        color: {
          id: 5,
          name: "Brown",
          hex_value: "#8B4513",
        },
        size: {
          id: 3,
          name: "L",
        },
        quantity: 18,
        sku: "CT-BRN-L-107",
      },
      {
        productVariantId: 108,
        color: {
          id: 5,
          name: "Brown",
          hex_value: "#8B4513",
        },
        size: {
          id: 2,
          name: "M",
        },
        quantity: 22,
        sku: "CT-BRN-M-108",
      },
      {
        productVariantId: 109,
        color: {
          id: 6,
          name: "Gray",
          hex_value: "#808080",
        },
        size: {
          id: 1,
          name: "S",
        },
        quantity: 12,
        sku: "CT-GRY-S-109",
      },
      {
        productVariantId: 110,
        color: {
          id: 6,
          name: "Gray",
          hex_value: "#808080",
        },
        size: {
          id: 4,
          name: "XL",
        },
        quantity: 8,
        sku: "CT-GRY-XL-110",
      },
    ],
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const images = [tshirt1, tshirt2, tshirt3, tshirt4];

  const colors = useMemo(() => {
    return product.variants.reduce((acc, variant) => {
      if (!acc.some((color) => color.id === variant.color.id)) {
        acc.push(variant.color);
      }
      return acc;
    }, []);
  }, [product.variants]);

  const availableSizes = useMemo(() => {
    if (!selectedColor) return [];
    return product.variants
      .filter((variant) => variant.color.hex_value === selectedColor.hex_value)
      .map((variant) => variant.size.name);
  }, [product.variants, selectedColor]);

  const selectedProductVariant = useMemo(() => {
    return product.variants.find(
      (variant) =>
        variant.size.name === selectedSize &&
        variant.color.hex_value === selectedColor?.hex_value,
    );
  }, [product.variants, selectedSize, selectedColor]);

  const onColorSelect = (color) => {
    setSelectedColor(color);
    setSelectedSize(null);
  };

  const onSizeSelect = (size) => {
    setSelectedSize(size);
  };

  const onAddToCartClick = () => {
    if (selectedProductVariant) {
      dispatch(
        addProduct({
          productVariantId: selectedProductVariant.productVariantId,
          color: selectedColor.name,
          size: selectedSize,
          productName: product.name,
          price: product.price,
          quantity,
          imgURL: sampleImage,
        }),
      );
      navigate("/cart");
    }
  };

  return (
    <div className="mx-6 mb-20 mt-36 w-full max-w-5xl flex-col md:mx-10 lg:mx-auto">
      <div className="mt-8 grid grid-cols-1 gap-12 md:grid-cols-2">
        <div>
          <ImageSelector images={images} />
        </div>

        <div>
          <div className="font-serif text-3xl">{product.name}</div>
          <div className="font-serif text-2xl">
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
            <div className="mt-10 w-[50%]">
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
