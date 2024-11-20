import { useEffect, useState } from "react";
import { SyncLoader } from "react-spinners";
import { useSelector } from "react-redux";
import { getAllSizes } from "../services/sizeService";
import { getAllColors } from "../services/colorService";
import InputComponent from "../components/InputComponent";
import Button from "../components/Button";
import { Plus } from "lucide-react";
import { createProduct } from "../services/productService";
import { useNavigate } from "react-router-dom";
import SelectInput from "../components/SelectInput";
import { showToast } from "../lib/toast";

function AddProduct() {
  const [isColorsLoading, setIsColorsLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const token = useSelector((state) => state.user.token);

  const navigate = useNavigate();

  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);

  const [title, setTitle] = useState(null);
  const [price, setPrice] = useState(null);
  const [category, setCategory] = useState("Men");
  const [subcategory, setSubcategory] = useState("Tops");
  const [selectedColor, setSelectedColor] = useState(null);
  const [availableColors, setAvailableColors] = useState([]);
  const [availableSizes, setAvailableSizes] = useState([]);
  const [description, setDescription] = useState(null);
  const [productVariants, setProductVariants] = useState([]);

  useEffect(() => {
    const fetchColorsAndSizes = async () => {
      const controller = new AbortController();
      try {
        setIsColorsLoading(true);
        const colorsResponse = await getAllColors(token, {
          signal: controller.signal,
        });
        const sizesResponse = await getAllSizes(token, {
          signal: controller.signal,
        });
        setColors(colorsResponse.data.data || []);
        setSizes(sizesResponse.data.data || []);
        setSelectedColor(colorsResponse.data.data?.[0] || null);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Error getting colors and sizes:", error);
          showToast({
            type: "error",
            description: "There was a problem getting colors and sizes",
          });
        }
      } finally {
        setIsColorsLoading(false);
      }
  
      return () => controller.abort();
    };
  
    fetchColorsAndSizes();
  }, [token]);
  
  const onAddColorClick = () => {
    if (
      !availableColors.some((color) => color.colorId === selectedColor.colorId)
    ) {
      setAvailableColors([...availableColors, selectedColor]);
      showToast({
        type: "success",
        description: `${selectedColor.name} added to available colors.`,
      });
    } else {
      showToast({
        type: "error",
        description: `${selectedColor.name} is already in available colors.`,
      });
    }
  };

  const handleDeleteColor = (colorId) => {
    setAvailableColors((prevColors) =>
      prevColors.filter((color) => color.colorId !== colorId),
    );
  };

  useEffect(() => {
    if (availableColors.length && availableSizes.length) {
      const variants = [];

      availableColors.forEach((color) => {
        availableSizes.forEach((size) => {
          variants.push({
            quantity: 0,
            sku: `${(title?.toUpperCase() || "PRODUCT").replace(/\s+/g, "")}-${(color?.name?.toUpperCase() || "DEFAULT_COLOR").replace(/\s+/g, "")}-${(size?.name?.toUpperCase() || "DEFAULT_SIZE").replace(/\s+/g, "")}`,
            color: { colorId: color.colorId },
            size: { sizeId: size.sizeId },
          });
        });
      });

      setProductVariants((prevVariants) => {
        const isDifferent =
          JSON.stringify(prevVariants) !== JSON.stringify(variants);
        return isDifferent ? variants : prevVariants;
      });
    } else {
      setProductVariants([]);
    }
  }, [availableColors, availableSizes, title, category]);

  const updateVariantQuantity = (sku, quantity) => {
    setProductVariants((prevVariants) =>
      prevVariants.map((variant) =>
        variant.sku === sku ? { ...variant, quantity } : variant,
      ),
    );
  };

  const handleAddProduct = async () => {
    if (title === null || price === null) {
      showToast({
        type: "error",
        description: "Required fields cannot be empty",
      });
      return;
    }

    if (productVariants.length === 0) {
      showToast({
        type: "error",
        description: "Please select colors and sizes",
      });
      return;
    }

    if (!Number.isInteger(parseFloat(price))) {
      showToast({
        type: "error",
        description: "Enter a valid price",
      });
      return;
    }
    setIsLoading(true);

    const product = {
      name: title,
      description,
      price,
      category,
      subcategory,
      isListed: true,
      productVariants,
      productImages: [
        {
          imageUrl: "https://sampleurl.com",
          isPrimary: true,
        },
      ],
    };

    try {
      await createProduct(product);
      showToast({
        type: "success",
        description: "Product has been listed successfully",
      });
      navigate(-1);
    } catch (error) {
      console.error("Error listing the product:", error);
      showToast({
        type: "error",
        description:
          "An error occurred while listing the product. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto mb-20 mt-36 w-full max-w-7xl flex-col items-center justify-between">
      <div className="flex-center w-full justify-between font-serif text-3xl">
        <div>Add Product</div>
      </div>
      <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-2">
        <div>
          <InputComponent title="Title" value={title} setValue={setTitle} />
          <InputComponent
            title="Price"
            value={price}
            setValue={setPrice}
            className="mt-8"
          />
          <div className="mt-8 grid grid-cols-2 gap-5">
            <SelectInput
              title="Category"
              options={[
                { value: "Men", name: "Men's Wear" },
                { value: "Women", name: "Women's Wear" },
              ]}
              value={category}
              handleChange={setCategory}
            />

            <SelectInput
              title="Subcategory"
              options={[
                { value: "Tops", name: "Tops" },
                { value: "Bottoms", name: "Bottoms" },
                { value: "Footwear", name: "Footwear" },
                { value: "Accessories", name: "Accessories" },
              ]}
              value={subcategory}
              handleChange={setSubcategory}
            />
          </div>
          {isColorsLoading ? (
            <div className="flex-center my-16 w-full justify-center">
              <SyncLoader size={8} />
            </div>
          ) : (
            <>
              <div className="mt-8 grid grid-cols-5 gap-5">
                <div className="col-span-4">
                  <SelectInput
                    title="Colors"
                    options={(colors || []).map((color) => ({
                      value: color.colorId,
                      name: color.name,
                    }))}
                    value={selectedColor?.colorId || ""}
                    handleChange={(value) =>
                      setSelectedColor(
                        colors.find(
                          (color) => color.colorId === parseInt(value),
                        ),
                      )
                    }
                  />
                </div>
                <div className="col-span-1">
                  <button
                    className="flex h-full w-full items-center justify-center rounded-lg border border-black text-black transition duration-300 hover:bg-black hover:text-white"
                    onClick={onAddColorClick}
                  >
                    <Plus />
                  </button>
                </div>
              </div>
              {availableColors.length !== 0 && (
                <div className="mt-8 flex gap-2">
                  {availableColors.map((c) => (
                    <div
                      key={c.colorId}
                      className="group relative rounded-lg px-4 py-2 text-white"
                      style={{ backgroundColor: c.hexValue }}
                    >
                      {c.name}

                      <button
                        className="absolute right-1 top-1 hidden rounded-full bg-red-500 p-1 px-2 text-white group-hover:block"
                        onClick={() => handleDeleteColor(c.colorId)}
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-8">
                <div>Available Sizes</div>
                <div className="mt-3 flex gap-3">
                  {sizes.map((s) => {
                    const isSelected = availableSizes.some(
                      (size) => size.sizeId === s.sizeId,
                    );

                    return (
                      <button
                        key={s.sizeId}
                        className={`rounded-md px-3 py-2 ${
                          isSelected
                            ? "bg-black text-white"
                            : "bg-gray-300 text-black"
                        }`}
                        onClick={() => {
                          if (isSelected) {
                            setAvailableSizes((prev) =>
                              prev.filter((size) => size.sizeId !== s.sizeId),
                            );
                          } else {
                            setAvailableSizes((prev) => [...prev, s]);
                          }
                        }}
                      >
                        {s.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            </>
          )}
          <InputComponent
            title="Description"
            value={description}
            setValue={setDescription}
            className="mt-12"
            height="100px"
          />
        </div>
        <div>
          <div>
            <h3 className="mb-4 text-xl font-semibold">Available Quantities</h3>
            {availableColors.map((color) => (
              <div key={color.colorId} className="mb-4 bg-gray-200 p-5">
                <h4 className="mb-3 text-lg font-bold">{color.name}</h4>
                <div className="grid grid-cols-6 gap-4">
                  {availableSizes.map((size) => {
                    const variantSku = `${(title?.toUpperCase() || "PRODUCT").replace(/\s+/g, "")}-${(color?.name?.toUpperCase() || "DEFAULT_COLOR").replace(/\s+/g, "")}-${(size?.name?.toUpperCase() || "DEFAULT_SIZE").replace(/\s+/g, "")}`;
                    const variant = productVariants.find(
                      (v) => v.sku === variantSku,
                    );
                    return (
                      <div key={size.sizeId} className="text-center">
                        <div className="mr-2">{size.name}</div>
                        <input
                          type="number"
                          value={variant?.quantity || 0}
                          onChange={(e) =>
                            updateVariantQuantity(
                              variantSku,
                              parseInt(e.target.value, 10) || 0,
                            )
                          }
                          className="w-16 rounded border border-gray-300 p-2"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
          {isLoading ? (
            <div className="flex-center my-16 w-full justify-center">
              <SyncLoader size={10} />
            </div>
          ) : (
            <div className="mt-10">
              <Button text="Add Product" onClick={handleAddProduct} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
