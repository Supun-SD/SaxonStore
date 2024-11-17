import { useState } from "react";
import sampleImage from "../assets/sample.jpg";
import Button from "../components/Button";
import ProgressBar from "../components/ProgressBar";

import { updateOrder } from "../services/orderService";
import { toast } from "../hooks/use-toast";

function OrderDetails({ order }) {
  const [isLoading, setIsLoading] = useState(false);
  const [orderStatus, setOrderStatus] = useState(order.status);

  const onButtonClick = async (status) => {
    setIsLoading(true);

    try {
      await updateOrder(order.orderId, {
        status: status,
      });
      toast({
        description: `Order status updated to ${status} successfully`,
        className: "border border-green-500 rounded-lg p-4",
      });

      setOrderStatus(status);
    } catch (error) {
      toast({
        description: "There was a problem updating the status",
        className: "border border-red-500 rounded-lg p-4",
      });

      console.error("Error making PUT request:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getNextStatus = () => {
    if (orderStatus === "PAID" || orderStatus === "NOT PAID") return "SHIPPED";
    if (orderStatus === "SHIPPED") return "DELIVERED";
    return "";
  };

  const getButtonText = () => {
    if (isLoading) return "Updating...";
    const nextStatus = getNextStatus();
    return nextStatus ? `Mark as ${nextStatus.toLowerCase()}` : "";
  };

  return (
    <div className="p-5">
      <div>
        <ProgressBar
          status={orderStatus}
          payStatus={
            ["PAID", "NOT PAID"].includes(orderStatus) ? orderStatus : "PAID"
          }
        />
      </div>
      <div className="mt-5 grid grid-cols-5 gap-4">
        <div className="col-span-2">
          <div className="mb-2">
            <div className="text-sm text-gray-400">Order no.</div>
            <div className="font-bold">{order.orderId}</div>
          </div>
          <hr />
          <div className="mb-2 mt-3">
            <div className="text-sm text-gray-400">Order date</div>
            <div className="font-bold">{order.orderDate.split("T")[0]}</div>
          </div>
          <hr />
          <div className="mb-2 mt-3">
            <div className="text-sm text-gray-400">Amount</div>
            <div className="font-bold">LKR {order.totalAmount.toFixed(2)}</div>
          </div>
          <hr />
          <div className="mb-2 mt-3">
            <div className="text-sm text-gray-400">Customer</div>
            <div className="font-bold">
              {order.delivery.firstName} {order.delivery.lastName}
            </div>
          </div>
          <hr />
          <div className="mb-2 mt-3">
            <div className="text-sm text-gray-400">Address</div>
            <div className="font-bold">
              {order.delivery.address}, {order.delivery.city}
            </div>
          </div>
          <hr />
          <div className="mb-2 mt-3">
            <div className="text-sm text-gray-400">Contact No</div>
            <div className="font-bold">{order.delivery.phone}</div>
          </div>
        </div>
        <div className="scrollbar-thin col-span-3 max-h-96 overflow-y-auto bg-gray-200 p-5">
          {order.orderProducts.map((product, index) => (
            <div key={product.productName}>
              <div className="mb-3 flex gap-4">
                <div className="h-20 w-20 overflow-hidden">
                  <img
                    src={sampleImage}
                    alt="product image"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <div className="font-bold">{product.productName}</div>
                  <div className="text-sm">LKR {product.price}</div>
                  <div className="text-sm">
                    {product.sizeName}, {product.colorName} x {product.quantity}
                  </div>
                </div>
              </div>
              {index < order.orderProducts.length - 1 && (
                <hr className="my-3 border-t border-gray-300" />
              )}
            </div>
          ))}
        </div>
      </div>
      {orderStatus !== "DELIVERED" && (
        <div className="flex w-full flex-col justify-end">
          <div className="ml-auto mt-6 w-60">
            <Button
              text={getButtonText()}
              onClick={() => onButtonClick(getNextStatus())}
              disabled={isLoading}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderDetails;
