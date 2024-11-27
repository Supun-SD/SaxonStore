import { useState } from "react";
import InputComponent from "../components/InputComponent";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import OrderItem from "../components/OrderItem";
import { useSelector } from "react-redux";
import { showToast } from "../lib/toast";

function OrderConfirmation() {
  const user = useSelector((state) => state.user.user);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [address, setAddress] = useState(user.address);
  const [city, setCity] = useState(user.city);
  const [postalCode, setPostalCode] = useState(user.postalCode);
  const [contactNo, setContactNo] = useState(user.phone);
  const [note, setNote] = useState("");

  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartTotal = useSelector((state) => state.cart.cartTotal);

  const navigate = useNavigate();

  function isValidPhoneNumber(phoneNumber) {
    const phoneRegex = /^7\d{8}$/;
    return phoneRegex.test(phoneNumber);
  }

  function isValidPostalCode(postalCode) {
    const postalCodeRegex = /^\d+$/;
    return postalCodeRegex.test(postalCode);
  }

  function onCheckoutClick() {
    if (
      firstName === "" ||
      lastName === "" ||
      address === "" ||
      city === "" ||
      postalCode === "" ||
      contactNo === ""
    ) {
      showToast({
        type: "error",
        description: "Required fields cannot be empty",
      });
      return;
    }

    if (!isValidPhoneNumber(contactNo)) {
      showToast({
        type: "error",
        description: "Enter a valid contact number",
      });
      return;
    }

    if (!isValidPostalCode(postalCode)) {
      showToast({
        type: "error",
        description: "Enter a valid postal code",
      });
      return;
    }

    navigate("/checkout", {
      state: {
        firstName,
        lastName,
        address,
        city,
        postalCode,
        contactNo,
        note,
      },
    });
  }

  return (
    <div className="mx-6 mb-20 mt-36 w-full max-w-7xl flex-col md:mx-10 lg:mx-auto">
      <div className="flex-center w-full justify-between font-serif text-2xl">
        <div>DELIVERY DETAILS</div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-12 md:grid-cols-2">
        <div>
          <div className="grid grid-cols-2 gap-3" data-testid="order-${value}">
            <div data-testid="order-first-name" >
              <InputComponent
                title="First Name"
                value={firstName}
                setValue={setFirstName}
              />
            </div>
            <div data-testid="order-last-name" >
              <InputComponent
                title="Last Name"
                value={lastName}
                setValue={setLastName}
              />
            </div>
          </div>
          <div data-testid="order-address">
          <InputComponent
            className="mt-8"
            title="Address"
            value={address}
            setValue={setAddress}
            data-testid="address"
          />
          </div>
          <div  className="mt-8 grid grid-cols-2 gap-3">
            <div data-testid="oder-city">
              <InputComponent title="City" value={city} setValue={setCity}/>
            </div>
            <div data-testid="order-postal-code">
              <InputComponent
                title="Postal Code"
                value={postalCode}
                setValue={setPostalCode}

              />
            </div>
          </div>

          <div className="mt-8 grid grid-cols-5 gap-3">
            <div className="relative z-10 col-span-1">
              <div className="text-md absolute -top-3 left-3 bg-white px-3 text-gray-600">
                Phone *
              </div>
              <div className="w-full rounded-lg border border-gray-300 py-4 text-center">
                +94
              </div>
            </div>
            <InputComponent
              className="col-span-4"
              required={false}
              value={contactNo}
              setValue={setContactNo}
            />
          </div>
          <InputComponent
            className="mt-8"
            title="Note"
            required={false}
            height="100px"
            value={note}
            setValue={setNote}
          />

          <div className="mt-16 grid grid-cols-2 gap-3">
            <div
              className="flex-center cursor-pointer justify-center text-xl text-gray-500 hover:text-black"
              onClick={() => navigate(-1)}
            >
              Return to cart
            </div>
            <div>
              <Button text="Continue Checkout" onClick={onCheckoutClick} />
            </div>
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
              <div className="col-span-1 flex justify-start">Total</div>
              <div className="col-span-1 flex justify-end">LKR {cartTotal}</div>
            </div>
            <hr className="my-4 border-t border-gray-300" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderConfirmation;
