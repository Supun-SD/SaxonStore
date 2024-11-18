import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateCartItem, removeCartItem } from "../features/cartSlice";
import { X } from "lucide-react";
import ConfirmationDialog from "./ConfirmationDialog";

export default function CartItem({ item }) {
  const [quantity, setQuantity] = useState(item.quantity);

  const dispatch = useDispatch();

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value);
    setQuantity(newQuantity);

    dispatch(
      updateCartItem({
        id: item.id,
        color: item.color,
        size: item.size,
        quantity: newQuantity,
      }),
    );
  };

  const handleRemoveItem = () => {
    dispatch(
      removeCartItem({ id: item.id, color: item.color, size: item.size }),
    );
  };

  return (
    <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] items-center gap-4">
      <div className="flex-center gap-6 p-4">
        <div>
          <ConfirmationDialog
            action={handleRemoveItem}
            message="Are you sure want to remove this item from your cart"
          >
            <X size={18} className="cursor-pointer hover:text-red-600" />
          </ConfirmationDialog>
        </div>
        <div className="h-24 w-24 overflow-hidden">
          <img
            src={item.imgURL}
            alt="product image"
            className="h-full w-full object-cover"
          />
        </div>

        <div>{item.productName}</div>
      </div>
      <div className="p-4 text-center">
        {item.color}/{item.size}
      </div>
      <div className="p-4 text-center">LKR {item.price}</div>
      <div className="p-4 text-center">
        <select
          value={quantity}
          onChange={handleQuantityChange}
          className="w-20 text-center"
        >
          {[1, 2, 3, 4, 5].map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </div>
      <div className="p-4 text-end">LKR {quantity * item.price}</div>
    </div>
  );
}
