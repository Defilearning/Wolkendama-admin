import React from "react";
import { Link } from "react-router-dom";

function Shop() {
  return (
    <div className="py-3 px-5">
      <p className="text-2xl">Shop</p>
      <div className="px-5 py-3 flex flex-col gap-2">
        <Link to="/shop" className="text-lg">
          Shop overview
        </Link>
        <Link to="/create-shop-item" className="text-lg">
          Create a shop item
        </Link>
        <Link to="/change-shop-item/null" className="text-lg">
          Change a shop info
        </Link>
        <Link to="/update-inventory/null" className="text-lg">
          Update inventory
        </Link>
        <Link to="/upload-photo/null" className="text-lg">
          Upload inventory photos
        </Link>
        <Link to="/delete-photo/null" className="text-lg">
          Delete inventory photos
        </Link>
      </div>
    </div>
  );
}

export default Shop;
