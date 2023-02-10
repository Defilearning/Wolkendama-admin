import React from "react";

function PendingPaymentInfo({ customerData, i }) {
  return (
    <div className="flex px-5 py-4 max-h-[22rem]" key={i}>
      <div className="flex flex-col flex-wrap gap-2 w-1/3">
        <div>
          <p className="font-bold text-black">Id:</p>
          <p className="pl-1 text-slate-600">{customerData._id}</p>
        </div>
        <div>
          <p className="font-bold text-black">Checkout Id:</p>
          <p className="pl-1 text-slate-600">{customerData.checkoutId}</p>
        </div>
        <div>
          <p className="font-bold text-black">Status:</p>
          <p className="pl-1 text-slate-600">{customerData.status}</p>
        </div>
        <div>
          <p className="font-bold text-black">Created Date:</p>
          <p className="pl-1 text-slate-600">
            {new Date(customerData.createdDate).toDateString()}
          </p>
        </div>

        <div>
          <p className="font-bold text-black">Reserve Item:</p>
          {customerData.emailParams?.items.map((el, i) => (
            <div className="flex">
              <p className="pl-1 font-bold  text-slate-600">{`${i + 1}: `}</p>
              <div className="pl-3  text-slate-500">
                <p>{`Item - ${el.name} `}</p>
                <p>{`Quantity - ${el.quantity} `}</p>
                <p>{`Price - ${el.price} `}</p>
                <p>{`SubTotal - ${el.subTotal} `}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PendingPaymentInfo;
