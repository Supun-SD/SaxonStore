import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

function MyAccount() {
  const [accountInfo, setAccountInfo] = useState(null);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  /* useEffect(() => {
    async function fetchData() {
      try {
        // Replace these API endpoints with the actual backend endpoints
        const accountResponse = await axios.get("/api/account");
        const ordersResponse = await axios.get("/api/orders");

        setAccountInfo(accountResponse.data);
        setOrders(ordersResponse.data);
      } catch (error) {
        console.error("Error fetching account or order data:", error);
      }
    }

    fetchData();
  }, []);*/

  useEffect(() => {
    // Mock API responses
    const mockAccountInfo = {
      name: "John Doe",
      email: "johndoe@gmail.com",
      phone: "+94771234567",
      shippingAddress: "221B, Baker Street, London.",
    };

    const mockOrders = [
      { id: 52452, date: "2024-03-12", amount: 2300 },
      { id: 36356, date: "2024-09-15", amount: 10500 },
      { id: 35657, date: "2024-03-12", amount: 5460 },
    ];

    // Directly set the mock data
    setAccountInfo(mockAccountInfo);
    setOrders(mockOrders);
  }, []);

  const handleOrderView = (orderId) => {
    navigate(`/orders/${orderId}`);
  };

  const handleUpdateAccount = () => {
    navigate("/update-info");
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 py-10">
      <div className="flex w-full max-w-4xl gap-6">
        {/* My Account Section */}
        <div className="flex-1 rounded-lg bg-gray-200 p-8">
          <h3 className="mb-6 text-center text-xl font-semibold">My Account</h3>
          <hr className="my-4 border-gray-300" />
          {accountInfo ? (
            <>
              <div className="space-y-4 text-center text-gray-800">
                <p>{accountInfo.name}</p>
                <p>{accountInfo.email}</p>
                <p>{accountInfo.phone}</p>
              </div>
              <hr className="my-4 border-gray-300" />
              <div className="mb-2 text-center font-semibold text-gray-700">
                Shipping Address
              </div>
              <p className="mb-6 text-center text-gray-600">
                {accountInfo.shippingAddress}
              </p>
              <div className="flex justify-center">
                <button
                  onClick={handleUpdateAccount}
                  className="rounded-l border border-gray-800 px-6 py-2 text-gray-800 transition-colors hover:bg-gray-800 hover:text-white"
                >
                  Update
                </button>
              </div>
            </>
          ) : (
            <p>Loading account information...</p>
          )}
        </div>

        {/* My Orders Section */}
        <div className="flex-1 rounded-lg bg-gray-200 p-8">
          <h3 className="mb-6 text-center text-xl font-semibold">My Orders</h3>
          <hr className="my-4 border-gray-300" />
          {orders.length > 0 ? (
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
                  <TableRow key={order.id}>
                    <TableCell className="border-b border-gray-300 py-2">
                      #{order.id}
                    </TableCell>
                    <TableCell className="border-b border-gray-300 py-2">
                      {new Date(order.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="border-b border-gray-300 py-2">
                      {order.amount}
                    </TableCell>
                    <TableCell
                      onClick={() => handleOrderView(order.id)}
                      className="cursor-pointer border-b border-gray-300 py-2 text-right text-gray-500 hover:underline"
                    >
                      View
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p>Loading orders...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyAccount;
