import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Alert from "../../../utils/Alert";
import LoadingSpinner from "../../../utils/LoadingSpinner";

function UpdateInventory() {
  const [isInitialLoading, setIsInitialLoading] = useState(false);
  const [isPosting, setIsPosting] = useState(false);

  const id = useParams();
  const idRef = useRef();

  const variantColour = useRef();
  const variantQuantity = useRef();
  const variantPrice = useRef();
  const authenticator = useRef();

  const [shopItem, setShopItem] = useState();
  const [customer, setCustomer] = useState([]);
  const [variant, setVariant] = useState();

  const [response, setResponse] = useState();

  useEffect(() => {
    const fetchData = async () => {
      setIsInitialLoading(true);

      const shopResponse = await fetch(
        `${process.env.REACT_APP_FETCH_URL}/api/v1/shop/${id.shopId}`
      );

      const shopData = (await shopResponse.json()).data;

      setShopItem(shopData);
      setVariant(shopData?.variant);

      if (shopData.reserveItem?.length > 0) {
        const customerResponse = await fetch(
          `${process.env.REACT_APP_FETCH_URL}/api/v1/customer/?status=pending_payment`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            mode: "cors",
            credentials: "include",
          }
        );

        const customerData = (await customerResponse.json()).data;

        setCustomer(customerData);
      }

      setIsInitialLoading(false);
    };

    if (id.shopId !== "null") {
      fetchData();
    }
  }, [id]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsPosting(true);

    const tempObj = { variant };
    tempObj.authenticator = authenticator.current.value;

    const apiPOST = await fetch(
      `${process.env.REACT_APP_FETCH_URL}/api/v1/shop/${idRef.current.value}/updateInventory`,
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

    const apiResponse = await apiPOST.json();

    setIsPosting(false);
    setResponse(apiResponse);
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
              ref={idRef}
              placeholder="eg: 63bbf9ecb5c3773733898a0f"
              className="text-black w-full  bg-slate-50"
              defaultValue={`${id.shopId === "null" ? "" : id.shopId}`}
            />
          </label>
          <label className="flex flex-col gap-7">
            <div>
              <p>Variant:</p>
              <div className="flex gap-6">
                <div>
                  <p>Colour:</p>
                  <input
                    type="text"
                    ref={variantColour}
                    className="text-black bg-slate-50"
                    placeholder="eg: red"
                  ></input>
                </div>
                <div>
                  <p>Remaining Quantity:</p>
                  <input
                    type="number"
                    ref={variantQuantity}
                    className="text-black bg-slate-50"
                    placeholder="eg: 5"
                  ></input>
                </div>
                <div>
                  <p>Price:</p>
                  <input
                    type="number"
                    ref={variantPrice}
                    className="text-black bg-slate-50"
                    placeholder="eg: 50"
                  ></input>
                </div>
                <button
                  className="text-left bg-slate-50 w-fit text-black py-2 px-3 rounded-md"
                  onClick={(e) => {
                    e.preventDefault();
                    setVariant((prev) => {
                      const prevObj = { ...prev };
                      const tempObj = {};

                      tempObj[variantColour.current.value] = {
                        remainingQuantity: +variantQuantity.current.value,
                        price: +variantPrice.current.value,
                      };

                      Object.assign(prevObj, tempObj);

                      return prevObj;
                    });
                    setResponse("");
                  }}
                >
                  Add/Amend variant
                </button>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-y-2 place-items-center border">
              <div className="border w-full text-center col-start-1 col-end-1">
                Colour
              </div>
              <div className="border w-full text-center col-start-2 col-end-2">
                Remaining Quantity
              </div>
              <div className="border w-full text-center col-start-3 col-end-3">{`Price (RM)`}</div>
              <div className="border w-full text-center col-start-4 col-end-4">
                Delete
              </div>
              {variant &&
                Object.keys(variant).map((el) => {
                  return (
                    <>
                      <div>{el}</div>
                      <div>{variant[el].remainingQuantity}</div>
                      <div>{variant[el].price}</div>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setVariant((prev) => {
                            const prevObj = { ...prev };
                            delete prevObj[el];

                            return prevObj;
                          });
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </>
                  );
                })}
            </div>
          </label>
          {shopItem?.reserveItem.length > 0 && (
            <label className="flex flex-col">
              <p>Reserve Item:</p>
              <div className="grid grid-cols-3 gap-y-2 place-items-center border">
                <div className="border w-full text-center col-start-1 col-end-1">
                  Colour
                </div>
                <div className="border w-full text-center col-start-2 col-end-2">
                  Quantity
                </div>
                <div className="border w-full text-center col-start-3 col-end-3">
                  Status
                </div>
                {shopItem?.reserveItem?.length > 0 &&
                  shopItem?.reserveItem?.map((el) => {
                    const result = customer.find(
                      (customerEL) => el.checkoutId === customerEL.checkoutId
                    );

                    return (
                      <>
                        <div>{el.variant}</div>
                        <div>{el.quantity}</div>
                        <div>
                          {result ? "Pending customer payment" : "Find JJ ASAP"}
                        </div>
                      </>
                    );
                  })}
              </div>
            </label>
          )}
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
          <button
            className={`${
              isPosting ? "bg-slate-400" : "bg-slate-50"
            } text-black`}
            type="submit"
            disabled={isPosting}
          >
            {`${isPosting ? "Processing..." : "Submit Form!"}`}
          </button>
        </form>
      )}

      {response && response?.status === "success" && !isPosting && (
        <Alert variant="success">Item updated successfully</Alert>
      )}

      {response && response?.status !== "success" && !isPosting && (
        <Alert variant="warning">{response?.message}</Alert>
      )}
    </div>
  );
}

export default UpdateInventory;
