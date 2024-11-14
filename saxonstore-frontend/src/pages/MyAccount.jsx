import React from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

function MyAccount() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 py-10">
      <div className="flex w-full max-w-4xl gap-6">
        {/* My Account Section */}
        <div className="flex-1 rounded-lg bg-gray-200 p-8">
          <h3 className="mb-6 text-center text-xl font-semibold">My Account</h3>
          <hr className="my-4 border-gray-300" />
          <div className="space-y-4 text-center text-gray-800">
            <p>John Doe</p>
            <p>johndoe@gmail.com</p>
            <p>+94771234567</p>
          </div>
          <hr className="my-4 border-gray-300" />
          <div className="mb-2 text-center font-semibold text-gray-700">
            Shipping Address
          </div>
          <p className="mb-6 text-center text-gray-600">
            221B, Baker Street, London.
          </p>
          <div className="flex justify-center">
            <button className="rounded-l border border-gray-800 px-6 py-2 text-gray-800 transition-colors hover:bg-gray-800 hover:text-white">
              <a href="/update-info">Update</a>
            </button>
          </div>
        </div>

        {/* My Orders Section */}
        <div className="flex-1 rounded-lg bg-gray-200 p-8">
          <h3 className="mb-6 text-center text-xl font-semibold">My Orders</h3>
          <hr className="my-4 border-gray-300" />
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
              <TableRow>
                <TableCell className="border-b border-gray-300 py-2">
                  #52452
                </TableCell>
                <TableCell className="border-b border-gray-300 py-2">
                  2024.03.12
                </TableCell>
                <TableCell className="border-b border-gray-300 py-2">
                  2300
                </TableCell>
                <TableCell className="cursor-pointer border-b border-gray-300 py-2 text-right text-gray-500 hover:underline">
                  View
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="border-b border-gray-300 py-2">
                  #36356
                </TableCell>
                <TableCell className="border-b border-gray-300 py-2">
                  2024.09.15
                </TableCell>
                <TableCell className="border-b border-gray-300 py-2">
                  10500
                </TableCell>
                <TableCell className="cursor-pointer border-b border-gray-300 py-2 text-right text-gray-500 hover:underline">
                  View
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="border-b border-gray-300 py-2">
                  #35657
                </TableCell>
                <TableCell className="border-b border-gray-300 py-2">
                  2024.03.12
                </TableCell>
                <TableCell className="border-b border-gray-300 py-2">
                  5460
                </TableCell>
                <TableCell className="cursor-pointer border-b border-gray-300 py-2 text-right text-gray-500 hover:underline">
                  View
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default MyAccount;
