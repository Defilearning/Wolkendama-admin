import React from "react";
import { Link } from "react-router-dom";

function Customer() {
  return (
    <div className="py-3 px-5">
      <p className="text-2xl">Customer</p>
      <div className="px-5 py-3 flex flex-col gap-2">
        <Link to="/customer" className="text-lg">
          Customer overview
        </Link>
        <Link to="/change-customer-status/null" className="text-lg">
          Change customer status
        </Link>
        <Link to="/print-invoice/null" className="text-lg">
          Print invoice
        </Link>
      </div>
    </div>
  );
}

export default Customer;
