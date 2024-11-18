import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { useSelector } from "react-redux";
import { getAllCustomerOrders } from "../services/orderService";
import { toast } from "../hooks/use-toast";
import PopUpModel from "../components/PopUpModel";
import OrderDetails from "../components/OrderDetails";
import { SyncLoader } from "react-spinners";

function MyAccount() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);

  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setIsLoading(true);
        const response = await getAllCustomerOrders(user.userId, token);

        if (response.data.httpCode === 404) {
          setOrders([]);
        } else {
          const sortedOrders = response.data.data.sort(
            (a, b) => new Date(b.orderDate) - new Date(a.orderDate),
          );
          setOrders(sortedOrders);
        }
      } catch (error) {
        console.error("Error getting your orders:", error);
        toast({
          description: "There was a problem getting your orders.",
          className: "border border-red-500 rounded-lg p-4",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [token, user]);

  const handleUpdateAccount = () => {
    navigate("/update-info");
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 py-10">
      <div className="flex w-full max-w-4xl gap-6">
        <div className="flex-1 rounded-lg bg-gray-200 p-8">
          <h3 className="mb-6 text-center text-xl font-semibold">My Account</h3>
          <hr className="my-4 border-gray-300" />

          <>
            <div className="space-y-4 text-center text-gray-800">
              <p>
                {user.firstName} {user.lastName}
              </p>
              <p>{user.email}</p>
              <p>+94{user.phone}</p>
            </div>
            <hr className="my-4 border-gray-300" />
            <div className="mb-2 text-center font-semibold text-gray-700">
              Shipping Address
            </div>
            {user.address !== "" && (
              <p className="mb-6 text-center text-gray-600">
                {user.address}, {user.city}, {user.postalCode}
              </p>
            )}
            <div className="flex justify-center">
              <button
                onClick={handleUpdateAccount}
                className="mt-3 rounded-l border border-gray-800 px-6 py-2 text-gray-800 transition-colors hover:bg-gray-800 hover:text-white"
              >
                Update
              </button>
            </div>
          </>
        </div>

        <div className="flex-1 rounded-lg bg-gray-200 p-8">
          <h3 className="mb-6 text-center text-xl font-semibold">My Orders</h3>
          <hr className="my-4 border-gray-300" />
          {!isLoading ? (
            <Table className="w-full text-left text-gray-800">
              <TableHeader>
                <TableRow>
                  <TableHead className="border-b border-gray-300 pb-2">
                    Order no.
                  </TableHead>
                  <TableHead className="border-b border-gray-300 pb-2">
                    Date
                  </TableHead>
                  <TableHead className="border-b border-gray-300 pb-2">
                    Amount
                  </TableHead>
                  <TableHead className="border-b border-gray-300 pb-2 text-right">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.orderId}>
                    <TableCell className="border-b border-gray-300 py-2">
                      #{order.orderId}
                    </TableCell>
                    <TableCell className="border-b border-gray-300 py-2">
                      {new Date(order.orderDate).toLocaleDateString("en-CA")}
                    </TableCell>
                    <TableCell className="border-b border-gray-300 py-2">
                      {order.totalAmount}
                    </TableCell>
                    <TableCell className="cursor-pointer border-b border-gray-300 py-2 text-right text-gray-500 hover:underline">
                      <PopUpModel
                        button={<div className="hover:underline">View</div>}
                      >
                        <OrderDetails order={order} />
                      </PopUpModel>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="mt-24 flex w-full justify-center">
              <SyncLoader size={5} color="gray" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyAccount;
