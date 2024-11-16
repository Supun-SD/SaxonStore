import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

import { getAllOrders } from "../services/orderService";
import { toast } from "../hooks/use-toast";
import SyncLoader from "react-spinners/SyncLoader";

function OrderManagement() {
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setIsLoading(true);
        const response = await getAllOrders();
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
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
  };

  const closeDetails = () => {
    setSelectedOrder(null);
  };

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
                    order.status === "Paid"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {order.status}
                </span>
              </td>
              <td className="whitespace-nowrap px-8 py-5 text-center text-xl">
                <button
                  className="text-gray-500 hover:text-gray-900"
                  onClick={() => handleViewDetails(order)}
                >
                  <FontAwesomeIcon icon={faEye} className="h-8 w-8" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="w-11/12 rounded-lg bg-white p-8 shadow-lg md:w-1/2">
            <h3 className="mb-4 text-xl font-semibold">Order Details</h3>
            <p className="text-gray-700">{selectedOrder.details}</p>
            <button
              className="py -3 mt-6 rounded bg-indigo-600 px-6 text-white hover:bg-indigo-700"
              onClick={closeDetails}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderManagement;
