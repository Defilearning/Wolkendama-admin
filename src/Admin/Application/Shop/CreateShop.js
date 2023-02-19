import React, { useRef, useState } from "react";
import Alert from "../../../utils/Alert";

function CreateShop() {
  const [isLoading, setIsLoading] = useState(false);
  const [variant, setVariant] = useState({});
  const [response, setResponse] = useState();

  const title = useRef();
  const descriptions = useRef();
  const rank = useRef();
  const filter = useRef();

  const specification = useRef();

  const variantColour = useRef();
  const variantQuantity = useRef();
  const variantPrice = useRef();
  const authenticator = useRef();

  const submitHandler = async (e) => {
    e.preventDefault();

    if (Object.keys(variant).length === 0) {
      setResponse({
        status: "error",
        message: "Kindly add the variant into the table",
      });
      return;
    }

    const tempObj = {
      title: title.current.value,
      descriptions: descriptions.current.value,
      rank: rank.current.value,
      itemFilter:
        filter.current.value.slice(-1) === ","
          ? filter.current.value.slice(0, -1).replaceAll(" ", "").split(",")
          : filter.current.value.replaceAll(" ", "").split(","),
      variant,
      authenticator: authenticator.current.value,
    };

    if (specification.current.value) {
      if (specification.current.value.slice(-1) === ",") {
        tempObj.specification = specification.current.value
          .slice(0, -1)
          .replaceAll(" ", "")
          .split(",");
      } else {
        tempObj.specification = specification.current.value
          .replaceAll(" ", "")
          .split(",");
      }
    }

    setIsLoading(true);
    const apiPOST = await fetch(
      `${process.env.REACT_APP_FETCH_URL}/api/v1/shop`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        credentials: "include",
        body: JSON.stringify(tempObj),
      }
    );

    const apiResponse = await apiPOST.json();
    setIsLoading(false);

    setResponse(apiResponse);
  };

  return (
    <div className="py-3 px-5 w-fit">
      <form onSubmit={submitHandler} className="flex flex-col gap-5">
        <label>
          <p>Title:</p>
          <input
            type="text"
            required={true}
            ref={title}
            placeholder="eg: Strong Little Kendama"
            className="text-black w-full bg-slate-50"
          />
        </label>
        <label>
          <p>Descriptions:</p>
          <textarea
            rows="4"
            required={true}
            ref={descriptions}
            className="text-black w-full bg-slate-50"
            placeholder="eg: We are proud to finally introduce our newest version of the Mini Kendama! We've made Micros and Minis in the past, but this Mini is the most playable one yet! You can do all the tricks you would normally do with an average sized kendama, except now it fits in your pocket."
          />
        </label>
        <label>
          <p>Rank:</p>
          <input
            type="number"
            required={true}
            ref={rank}
            placeholder="eg: 1"
            className="text-black w-full bg-slate-50"
          />
        </label>
        <label>
          <p>Filter: valid options - hot, new, advanced, basic, accesories</p>
          <input
            type="text"
            required={true}
            ref={filter}
            placeholder="eg: hot, new / hot"
            className="text-black w-full bg-slate-50"
          />
        </label>
        <label>
          <p>Specification:</p>
          <input
            type="text"
            ref={specification}
            placeholder="eg: sticky, red / red"
            className="text-black w-full bg-slate-50"
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
                  required={true}
                  ref={variantColour}
                  className="text-black bg-slate-50"
                  placeholder="eg: red"
                ></input>
              </div>
              <div>
                <p>Remaining Quantity:</p>
                <input
                  type="number"
                  required={true}
                  ref={variantQuantity}
                  className="text-black bg-slate-50"
                  placeholder="eg: 5"
                ></input>
              </div>
              <div>
                <p>Price:</p>
                <input
                  type="number"
                  required={true}
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
        <label>
          <p>2FA:</p>
          <input
            type="text"
            required
            ref={authenticator}
            placeholder="eg: 372617"
            className="text-black w-full bg-slate-50"
          />
        </label>
        <button
          className={`${isLoading ? "bg-slate-400" : "bg-slate-50"} text-black`}
          type="submit"
          disabled={isLoading}
        >
          {`${isLoading ? "Processing..." : "Submit Form!"}`}
        </button>
      </form>

      {response && response?.status !== "success" && !isLoading && (
        <Alert variant="warning">{response?.message}</Alert>
      )}

      {response && response?.status === "success" && !isLoading && (
        <Alert variant="success">Item created successfully</Alert>
      )}
    </div>
  );
}

export default CreateShop;
