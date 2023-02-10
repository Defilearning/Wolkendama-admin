import React from "react";

function ShopInfo({ shopData }) {
  return (
    <div className="flex px-5 py-4 max-h-[28rem]">
      <img
        src={shopData.imgCover}
        className="w-[200px]  object-contain mr-5"
        alt="Kendama"
      />
      <div className="flex flex-col flex-wrap gap-2 w-1/3">
        <div>
          <p className="font-bold text-black">Id:</p>
          <p className="pl-1 text-slate-600">{shopData._id}</p>
        </div>
        <div>
          <p className="font-bold text-black">Description:</p>
          <p className="pl-1 text-slate-600">{shopData.descriptions}</p>
        </div>
        <div>
          <p className="font-bold text-black">Rank:</p>
          <p className="pl-1 text-slate-600">{shopData.rank}</p>
        </div>
        <div>
          <p className="font-bold text-black">Filter:</p>
          <div className="flex gap-4">
            {shopData.itemFilter?.map((el, i) => (
              <p
                className="px-2 border border-slate-700 rounded-md text-slate-600"
                key={i}
              >
                {el}
              </p>
            ))}
          </div>
        </div>
        <div>
          <p className="font-bold text-black">Specification:</p>
          <div className="flex gap-4">
            {shopData.specification?.map((el, i) => (
              <p
                className="px-2 border border-slate-700 rounded-md  text-slate-600"
                key={i}
              >
                {el}
              </p>
            ))}
          </div>
        </div>
        <div>
          <p className="font-bold text-black">Variant:</p>
          {Object.keys(shopData.variant)?.map((el, i) => (
            <div className="flex" key={i}>
              <p className="pl-1 font-bold  text-slate-600 ">{`${el}: `}</p>
              <div className="pl-3  text-slate-500">
                <p>{`quantity - ${shopData.variant[el].remainingQuantity} `}</p>
                <p>{`price - RM${shopData.variant[el].price} `}</p>
              </div>
            </div>
          ))}
        </div>
        <div>
          <p className="font-bold text-black">Reserve Item:</p>
          {shopData.reserveItem?.length > 0 ? (
            shopData.reserveItem?.map((el, i) => (
              <div className="flex" key={i}>
                <p className="pl-1 font-bold  text-slate-600">{`${i + 1}: `}</p>
                <div className="pl-3  text-slate-500">
                  <p>{`checkout Id - ${el.checkoutId} `}</p>
                  <p>{`variant - ${el.variant} `}</p>
                  <p>{`quantity - ${el.quantity} `}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="pl-1  text-slate-600">
              There is currently no reserve items.
            </p>
          )}
        </div>
        <div>
          <p className="font-bold text-black">Production Ready?</p>
          <p className="pl-1 text-slate-600">
            {shopData.productionReady ? "Yes" : "No"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ShopInfo;
