import React from "react";

function CustomerInfo({ customerData }) {
  return (
    <div className="flex px-5 py-4 max-h-[25rem]">
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
          <p className="font-bold text-black">Email:</p>
          <p className="pl-1 text-slate-600">{customerData.email}</p>
        </div>
        <div>
          <p className="font-bold text-black">Phone:</p>
          <p className="pl-1 text-slate-600">{customerData.phone}</p>
        </div>
        <div>
          <p className="font-bold text-black">Billing Name:</p>
          <p className="pl-1 text-slate-600">{customerData.billingName}</p>
        </div>
        <div>
          <p className="font-bold text-black">Billing Address:</p>
          <p className="pl-1 text-slate-600">
            {`${customerData.billingAddress.line1 ?? ""} ${
              customerData.billingAddress.line2 ?? ""
            } ${customerData.billingAddress.postal_code ?? ""} ${
              customerData.billingAddress.city ?? ""
            } ${customerData.billingAddress.state ?? ""} ${
              customerData.billingAddress.country ?? ""
            } `}
          </p>
        </div>
        <div>
          <p className="font-bold text-black">Shipping Name:</p>
          <p className="pl-1 text-slate-600">{customerData.shippingName}</p>
        </div>
        <div>
          <p className="font-bold text-black">Shipping Address:</p>
          <p className="pl-1 text-slate-600">
            {`${customerData.shippingAddress.line1 ?? ""} ${
              customerData.shippingAddress.line2 ?? ""
            } ${customerData.shippingAddress.postal_code ?? ""} ${
              customerData.shippingAddress.city ?? ""
            } ${customerData.shippingAddress.state ?? ""} ${
              customerData.shippingAddress.country ?? ""
            } `}
          </p>
        </div>
        {customerData.shippingProvider && (
          <div>
            <p className="font-bold text-black">Shipping Provider:</p>
            <p className="pl-1 text-slate-600">
              {customerData.shippingProvider}
            </p>
          </div>
        )}
        {customerData.trackingNo && (
          <div>
            <p className="font-bold text-black">Tracking No:</p>
            <p className="pl-1 text-slate-600">{customerData.trackingNo}</p>
          </div>
        )}
        <div>
          <p className="font-bold text-black">Created Date:</p>
          <p className="pl-1 text-slate-600">
            {new Date(customerData.createdDate).toDateString()}
          </p>
        </div>

        <div>
          <p className="font-bold text-black">Purchased Item:</p>
          {customerData.purchasedItem?.map((el, i) => (
            <div className="flex" key={i}>
              <p className="pl-1 font-bold  text-slate-600">{`${i + 1}: `}</p>
              <div className="pl-3  text-slate-500">
                <p>{`Item - ${el.item} `}</p>
                <p>{`Quantity - ${el.quantity} `}</p>
                <p>{`Price - RM${el.pricePerUnit} `}</p>
                <p>{`SubTotal - RM${el.subtotal} `}</p>
              </div>
            </div>
          ))}
          <p className="font-bold text-black">{`Total: RM${customerData.amountTotal}`}</p>
        </div>
      </div>
    </div>
  );
}

export default CustomerInfo;
