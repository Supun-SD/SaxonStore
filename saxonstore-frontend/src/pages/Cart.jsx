import React from "react";
import CartItem from "../components/CartItem";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../features/cartSlice";
import ConfirmationDialog from "../components/ConfirmationDialog";

function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartTotal = useSelector((state) => state.cart.cartTotal);

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="mx-auto mb-20 mt-36 w-full max-w-7xl flex-col items-center justify-between">
      <div className="flex-center w-full justify-between font-serif text-3xl">
        <div>Your Cart</div>
        {cartItems.length !== 0 && (
          <ConfirmationDialog
            message="Clearing your cart will remove all items permanently. Are you sure you want to proceed? This action cannot be undone."
            action={handleClearCart}
          >
            <div className="cursor-pointer text-red-500">Clear cart</div>
          </ConfirmationDialog>
        )}
      </div>
      {cartItems.length === 0 ? (
        <div className="mt-10 flex w-full justify-center bg-gray-100 p-14 text-2xl text-gray-500">
          Your cart is empty
        </div>
      ) : (
        <div className="mt-10 w-full">
          <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-4 bg-gray-200 px-6 font-serif">
            <div className="p-4">Product</div>
            <div className="p-4 text-center">Color/Size</div>
            <div className="p-4 text-center">Price</div>
            <div className="p-4 text-center">Quantity</div>
            <div className="p-4 text-end">Subtotal</div>
          </div>
          <div className="mt-8 px-6">
            {cartItems.map((item, index) => (
              <React.Fragment key={item.productVariantId}>
                <CartItem item={item} />
                {index < cartItems.length - 1 && (
                  <hr className="my-4 border-t border-gray-300" />
                )}
              </React.Fragment>
            ))}
          </div>
          <hr className="my-4 border-t border-gray-300" />
          <div className="flex-center my-8 justify-end gap-16 px-10 text-xl">
            <div>Total</div>
            <div>LKR {cartTotal}</div>
          </div>
          <hr className="my-4 border-t border-gray-300" />
        </div>
      )}
      <div className="mt-12 flex gap-10">
        <Button
          text="CONTINUE SHOPPING"
          onClick={() => {
            navigate("/");
          }}
        />
        {cartItems.length !== 0 && (
          <Button
            text="CHECKOUT"
            data-testid="checkout-button"
            onClick={() => {
              navigate("/order-confirmation");
            }}
          />
        )}
      </div>
    </div>
  );
}

export default Cart;
