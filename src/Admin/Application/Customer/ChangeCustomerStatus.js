import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Alert from "../../../utils/Alert";
import LoadingSpinner from "../../../utils/LoadingSpinner";

function ChangeCustomerStatus() {
  const [isInitialLoading, setIsInitialLoading] = useState(false);
  const [isPosting, setIsPosting] = useState(false);
  const [response, setResponse] = useState();

  const id = useParams();

  const idRef = useRef();
  const shippingProvider = useRef();
  const trackingNo = useRef();
  const checkbox = useRef();
  const authenticator = useRef();

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

    setIsPosting(true);

    const tempObj = {
      trackingNo: trackingNo.current.value,
      shippingProvider: shippingProvider.current.value,
      sendEmail: checkbox.current.checked,
      authenticator: authenticator.current.value,
    };

    const response = await fetch(
      `http://localhost:3000/api/v1/customer/${id.customerId}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        method: "PATCH",
        credentials: "include",
        body: JSON.stringify(tempObj),
      }
    );

    const data = await response.json();

    setIsPosting(false);

    setResponse(data);
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
          <label>
            <p>Shipping Provider:</p>
            <input
              type="text"
              placeholder="eg: J&T Express"
              className="text-black w-full bg-slate-50"
              defaultValue={`${customerData?.shippingProvider ?? ""}`}
              ref={shippingProvider}
              required
            />
          </label>
          <label>
            <p>Tracking No:</p>
            <input
              type="text"
              placeholder="eg: 60000000001"
              className="text-black w-full bg-slate-50"
              defaultValue={`${customerData?.trackingNo ?? ""}`}
              ref={trackingNo}
              required
            />
          </label>
          <label>
            <p>Send Email?</p>
            <input type="checkbox" className="checkbox" ref={checkbox} />
          </label>
          <label>
            <p>2FA:</p>
            <input
              type="text"
              ref={authenticator}
              placeholder="eg: 372617"
              className="text-black w-full  bg-slate-50"
              required
            />
          </label>

          {customerData?.status !== "pending_payment" ? (
            <button
              className={`${
                isPosting ? "bg-slate-400" : "bg-slate-50"
              } text-black`}
              type="submit"
              disabled={isPosting}
            >
              {isPosting ? "Processing..." : "Submit Form"}
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

      {response && response?.status === "success" && !isPosting && (
        <Alert variant="success">
          Item updated successfully, please refresh to see changes
        </Alert>
      )}

      {response && response?.status !== "success" && !isPosting && (
        <Alert variant="warning">{response?.message}</Alert>
      )}
    </div>
  );
}

export default ChangeCustomerStatus;
