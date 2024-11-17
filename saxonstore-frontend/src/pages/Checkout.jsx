import React from "react";
import OrderItem from "../components/OrderItem";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

function Checkout() {
  const location = useLocation();
  const { firstName, lastName, address, city, postalCode, contactNo, note } =
    location.state || {};

  const deliveryFee = 400.0;
  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartTotal = useSelector((state) => state.cart.cartTotal);

  return (
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
              { label: "Email", value: "johndoe@gmail.com" },
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
              <div className="col-span-1 flex justify-end">LKR {cartTotal}</div>
            </div>
            <hr className="my-4 border-t border-gray-300" />
            <div className="grid grid-cols-2 gap-4 text-lg">
              <div className="col-span-1 flex justify-start">Delivery fee</div>
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
          <div className="mt-4">
            <div className="text-lg">Select your payment method</div>
            <div className="my-6 flex justify-around">
              <div className="cursor-pointer rounded-md border border-gray-500 p-3">
                Cash on delivery
              </div>
              <div className="cursor-pointer rounded-md border border-gray-500 p-3">
                Visa/Master
              </div>
              <div className="cursor-pointer rounded-md border border-gray-500 p-3">
                Bank deposite
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
