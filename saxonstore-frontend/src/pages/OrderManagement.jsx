import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

// Sample data for demonstration
const orders = [
  { orderNo: '#224624', date: '2024.12.02', amount: 'LKR 3500.00', status: 'Paid', details: 'Product details for Order #224624' },
  { orderNo: '#224625', date: '2024.12.02', amount: 'LKR 3500.00', status: 'Paid', details: 'Product details for Order #224625' },
  { orderNo: '#224626', date: '2024.12.02', amount: 'LKR 3500.00', status: 'Paid', details: 'Product details for Order #224626' },
  { orderNo: '#224627', date: '2024.12.02', amount: 'LKR 3500.00', status: 'Paid', details: 'Product details for Order #224627' },
  { orderNo: '#224628', date: '2024.12.02', amount: 'LKR 3500.00', status: 'Paid', details: 'Product details for Order #224628' },
];

function OrdersTable() {
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
  };

  const closeDetails = () => {
    setSelectedOrder(null);
  };

  return (
    <div className="relative shadow-lg rounded-lg overflow-hidden w-full">
      <table className="w-full table-auto divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-8 py-5 text-left text-xl font-semibold text-gray-600 uppercase tracking-wider">Order No.</th>
            <th className="px-8 py-5 text-left text-xl font-semibold text-gray-600 uppercase tracking-wider">Date</th>
            <th className="px-8 py-5 text-left text-xl font-semibold text-gray-600 uppercase tracking-wider">Amount</th>
            <th className="px-8 py-5 text-left text-xl font-semibold text-gray-600 uppercase tracking-wider">Status</th>
            <th className="px-8 py-5 text-center text-xl font-semibold text-gray-600 uppercase tracking-wider"> </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {orders.map((order, index) => (
            <tr key={index} className="hover:bg-gray-50 transition duration-150 ease-in-out">
              <td className="px-8 py-5 whitespace-nowrap text-xl font-medium text-gray-800">{order.orderNo}</td>
              <td className="px-8 py-5 whitespace-nowrap text-xl text-gray-600">{order.date}</td>
              <td className="px-8 py-5 whitespace-nowrap text-xl text-gray-600">{order.amount}</td>
              <td className="px-8 py-5 whitespace-nowrap text-xl">
                <span
                  className={`px-5 py-3 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    order.status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}
                >
                  {order.status}
                </span>
              </td>
              <td className="px-8 py-5 whitespace-nowrap text-center text-xl">
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
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-11/12 md:w-1/2">
            <h3 className="text-xl font-semibold mb-4">Order Details</h3>
            <p className="text-gray-700">{selectedOrder.details}</p>
            <button
              className="mt-6 px-6 py -3 bg-indigo-600 text-white rounded hover:bg-indigo-700"
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

function OrderManagement() {
  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-6xl p-12 space-y-8 shadow-lg rounded-lg">
        <div className="space-y-6">
          <h2 className="text-4xl font-semibold text-gray-700">Orders</h2>
          <OrdersTable />
        </div>
      </div>
    </div>
  );
}

export default OrderManagement;