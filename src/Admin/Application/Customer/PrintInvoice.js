import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../../../utils/LoadingSpinner";

function PrintInvoice() {
  const [isInitialLoading, setIsInitialLoading] = useState(false);
  const id = useParams();

  const idRef = useRef();

  const [customerData, setCustomerData] = useState();

  //To fetch data
  useEffect(() => {
    const fetchData = async () => {
      setIsInitialLoading(true);

      const response = await fetch(
        `http://localhost:3000/api/v1/customer/${id.customerId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          mode: "cors",
          method: "GET",
          credentials: "include",
        }
      );

      const data = (await response.json()).data;
      setIsInitialLoading(false);

      setCustomerData(data);
    };

    if (id.shopId !== "null") {
      fetchData();
    }
  }, [id]);

  const submitHandler = async (e) => {
    e.preventDefault();

    window.open(customerData.invoiceUrl);
  };

  return (
    <div className="py-3 px-5 min-w-[50rem] w-1/2">
      {isInitialLoading && <LoadingSpinner />}
      {!isInitialLoading && (
        <form onSubmit={submitHandler} className="flex flex-col gap-5">
          <label>
            <p>Id:</p>
            <input
              type="text"
              placeholder="eg: 63bbf9ecb5c3773733898a0f"
              className="text-black w-full bg-slate-50"
              defaultValue={`${customerData?._id ?? ""}`}
              ref={idRef}
              required
            />
          </label>

          {customerData?.status !== "pending_payment" ? (
            <button className="bg-slate-50 text-black" type="submit">
              Print Invoice Now!
            </button>
          ) : (
            <button
              className="bg-slate-700 text-slate-300 cursor-not-allowed"
              type="submit"
              disabled
            >
              The customer has not made any payment
            </button>
          )}
        </form>
      )}
    </div>
  );
}

export default PrintInvoice;
