import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { showToast } from "../lib/toast";
import { clearCart } from "../features/cartSlice";

import OrderItem from "../components/OrderItem";
import cod from "../assets/cod.jpg";
import card from "../assets/card.jpg";

import { SyncLoader } from "react-spinners";

import { placeOrder } from "../services/orderService";
import ConfirmationDialog from "../components/ConfirmationDialog";
import { usePayment } from "../hooks/usePayment";

function Checkout() {
  const location = useLocation();
  const { firstName, lastName, address, city, postalCode, contactNo, note } =
    location.state || {};
  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartTotal = useSelector((state) => state.cart.cartTotal);

  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.user.token);

  const [isLoading, setIsLoading] = useState(false);

  const deliveryFee = 400.0;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { handlePayment } = usePayment();

  const onCheckoutClick = async (status) => {
    setIsLoading(true);

    try {
      const orderProducts = cartItems.map((item) => ({
        product: { productId: item.productId },
        productVariant: { productVariantId: item.productVariantId },
        quantity: item.quantity,
      }));

      const order = {
        user: { userId: user.userId },
        totalAmount: cartTotal + deliveryFee,
        status,
        orderProducts,
        delivery: {
          firstName,
          lastName,
          phone: contactNo,
          address,
          city,
          postalCode,
          note: note || null,
        },
      };

      if (status === "PAID") {
        await handlePayment(order, user);
      }

      await placeOrder(order, token);
      dispatch(clearCart());
      navigate("/cart");
      showToast({
        type: "success",
        description: "Your order has been placed successfully",
      });
    } catch (error) {
      console.error("Error placing order:", error);
      showToast({
        type: "error",
        description:
          "An error occurred while placing your order. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="mx-6 mb-20 mt-36 w-full max-w-7xl flex-col md:mx-10 lg:mx-auto">
        <div className="mt-8 grid grid-cols-1 gap-12 md:grid-cols-2">
          <div>
            <div className="flex-center w-full justify-between font-serif text-2xl">
              CONTACT INFORMATION
            </div>
            <div className="mt-5 grid grid-cols-5 gap-y-4">
              {[
                { label: "Name", value: firstName + " " + lastName },
                { label: "Contact No", value: "+94" + contactNo },
                { label: "Email", value: user.email },
                {
                  label: "Deliver to",
                  value: address + ", " + city + ", " + postalCode,
                },
                { label: "Notes", value: note },
              ].map((item, index) => (
                <React.Fragment key={index}>
                  <div className="col-span-2 border-b border-gray-200 pb-2">
                    {item.label}
                  </div>
                  <div className="col-span-3 border-b border-gray-200 pb-2">
                    {item.value}
                  </div>
                </React.Fragment>
              ))}
            </div>
            <div className="mt-10 flex justify-between border border-gray-500 p-5 px-10 font-serif text-lg font-bold">
              <div>DELIVERY FEE (flat rate)</div>
              <div>LKR {deliveryFee}</div>
            </div>
          </div>

          <div className="rounded-lg bg-gray-100 p-10">
            <div className="text-xl">Your Order</div>
            <div className="mt-5 bg-white p-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-1 flex justify-start">Product</div>
                <div className="col-span-1 flex justify-end">Subtotal LKR</div>
              </div>
              <hr className="my-4 border-t border-gray-300" />
              {cartItems.map((item) => (
                <OrderItem item={item} key={item.productName} />
              ))}
              <div className="grid grid-cols-2 gap-4 text-lg">
                <div className="col-span-1 flex justify-start">Subtotal</div>
                <div className="col-span-1 flex justify-end">
                  LKR {cartTotal}
                </div>
              </div>
              <hr className="my-4 border-t border-gray-300" />
              <div className="grid grid-cols-2 gap-4 text-lg">
                <div className="col-span-1 flex justify-start">
                  Delivery fee
                </div>
                <div className="col-span-1 flex justify-end">
                  LKR {deliveryFee}
                </div>
              </div>
              <hr className="my-4 border-t border-gray-300" />
              <div className="grid grid-cols-2 gap-4 text-lg">
                <div className="col-span-1 flex justify-start">Total</div>
                <div className="col-span-1 flex justify-end">
                  LKR {deliveryFee + cartTotal}
                </div>
              </div>
            </div>
            {isLoading ? (
              <div className="flex-center my-16 w-full justify-center">
                <SyncLoader />
              </div>
            ) : (
              <div className="mt-4">
                <div className="text-lg">Select your payment method</div>
                <div className="my-6 flex justify-around">
                  <ConfirmationDialog
                    action={() => onCheckoutClick("NOT PAID")}
                    message="Are you sure want to place this as a cash on delivery order"
                  >
                    <div
                      data-testid="checkout-cod"
                      className="w-26 h-14 cursor-pointer overflow-hidden rounded-xl"
                    >
                      <img
                        src={cod}
                        alt="product image"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </ConfirmationDialog>
                  <div
                    data-testid="checkout-card"
                    className="w-26 h-14 cursor-pointer overflow-hidden rounded-xl"
                    onClick={() => onCheckoutClick("PAID")}
                  >
                    <img
                      src={card}
                      alt="product image"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
