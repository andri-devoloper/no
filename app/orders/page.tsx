import React from "react";
import TableOrders from "@/components/ui/tabel-orders";
import ModelOrder from "@/components/ui/modal/modal-order";

function Orders() {
  return (
    <div className="w-full p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-between">
        <div>
          <h1 className="text-3xl font-bold">Strategi</h1>
        </div>
        <div className="flex justify-end">
          <ModelOrder />
        </div>
      </div>
      <TableOrders />
    </div>
  );
}

export default Orders;
