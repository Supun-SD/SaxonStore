import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

import { getAllOrders } from "../services/orderService";
import { toast } from "../hooks/use-toast";
import SyncLoader from "react-spinners/SyncLoader";
import PopUpModel from "../components/PopUpModel";
import OrderDetails from "../components/OrderDetails";
import { useSelector } from "react-redux";

function OrderManagement() {
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState([]);

  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setIsLoading(true);
        const response = await getAllOrders(token);
        if (response.data.httpCode === 404) {
          setOrders([]);
        } else {
          const sortedOrders = response.data.data.sort(
            (a, b) => new Date(b.orderDate) - new Date(a.orderDate),
          );
          setOrders(sortedOrders);
        }
      } catch (error) {
        console.error("Error getting orders:", error);
        toast({
          description: "There was a problem getting orders",
          className: "border border-red-500 rounded-lg p-4",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);
  return (
    <div className="mx-auto mb-20 mt-36 w-full max-w-7xl flex-col items-center justify-center">
      <div className="space-y-6">
        <div className="flex-center w-full justify-between font-serif text-3xl">
          Orders
        </div>
        {isLoading ? (
          <div className="flex h-72 w-full items-center justify-center">
            <SyncLoader color="gray" />
          </div>
        ) : (
          <OrdersTable orders={orders} />
        )}
      </div>
    </div>
  );
}

function OrdersTable({ orders }) {
  return (
    <div className="relative w-full overflow-hidden rounded-lg shadow-lg">
      <table className="w-full table-auto divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-8 py-5 text-left text-xl font-semibold uppercase tracking-wider text-gray-600">
              Order No.
            </th>
            <th className="px-8 py-5 text-left text-xl font-semibold uppercase tracking-wider text-gray-600">
              Date
            </th>
            <th className="px-8 py-5 text-left text-xl font-semibold uppercase tracking-wider text-gray-600">
              Amount
            </th>
            <th className="px-8 py-5 text-left text-xl font-semibold uppercase tracking-wider text-gray-600">
              Status
            </th>
            <th className="px-8 py-5 text-center text-xl font-semibold uppercase tracking-wider text-gray-600">
              {" "}
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {orders.map((order, index) => (
            <tr
              key={index}
              className="transition duration-150 ease-in-out hover:bg-gray-50"
            >
              <td className="whitespace-nowrap px-8 py-5 text-xl font-medium text-gray-800">
                #{order.orderId}
              </td>
              <td className="whitespace-nowrap px-8 py-5 text-xl text-gray-600">
                {order.orderDate.split("T")[0]}
              </td>
              <td className="whitespace-nowrap px-8 py-5 text-xl text-gray-600">
                {order.totalAmount.toFixed(2)}
              </td>
              <td className="whitespace-nowrap px-8 py-5 text-xl">
                <span
                  className={`inline-flex rounded-full px-5 py-3 text-xs font-semibold leading-5 ${
                    order.status === "PAID"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {order.status}
                </span>
              </td>
              <td className="whitespace-nowrap px-8 py-5 text-center text-xl">
                <PopUpModel
                  button={
                    <button className="text-gray-500 hover:text-gray-900">
                      <FontAwesomeIcon icon={faEye} className="h-8 w-8" />
                    </button>
                  }
                >
                  <OrderDetails order={order} />
                </PopUpModel>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrderManagement;
