import React from "react";
import { Link } from "react-router-dom";

function ShopButtons({ shopData, setOnConfirm, setToDeleteShop }) {
  return (
    <div className="flex bg-slate-500 py-5 px-4 rounded-lg gap-10 justify-end">
      <Link
        to={`/change-shop-item/${shopData._id}`}
        className="bg-lime-600 py-2 px-3 text-white rounded-md"
      >
        Change info
      </Link>
      <Link
        to={`/update-inventory/${shopData._id}`}
        className="bg-lime-600 py-2 px-3 text-white rounded-md"
      >
        Update inventory
      </Link>
      <Link
        to={`/upload-photo/${shopData._id}`}
        className="bg-lime-600 py-2 px-3 text-white rounded-md"
      >
        Upload photos
      </Link>
      <Link
        to={`/delete-photo/${shopData._id}`}
        className="bg-lime-600 py-2 px-3 text-white rounded-md"
      >
        Delete photos
      </Link>
      <button
        onClick={() => {
          setOnConfirm(true);
          setToDeleteShop({ _id: shopData._id, title: shopData.title });
        }}
        className="bg-red-600 py-2 px-3 text-white rounded-md"
      >
        Delete shop
      </button>
    </div>
  );
}

export default ShopButtons;
