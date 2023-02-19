import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Alert from "../../../utils/Alert";
import LoadingSpinner from "../../../utils/LoadingSpinner";

function ChangeShop() {
  const [isInitialLoading, setIsInitialLoading] = useState(false);
  const [isPosting, setIsPosting] = useState(false);

  const [shopItem, setShopItem] = useState();
  const [response, setResponse] = useState();
  const [productionReady, setProductionReady] = useState();

  const id = useParams();
  const idRef = useRef();
  const title = useRef();
  const descriptions = useRef();
  const rank = useRef();
  const filter = useRef();
  const specification = useRef();
  const authenticator = useRef();

  useEffect(() => {
    const fetchData = async () => {
      setIsInitialLoading(true);

      const response = await fetch(
        `${process.env.REACT_APP_FETCH_URL}/api/v1/shop/${id.shopId}`
      );

      const data = (await response.json()).data;
      setIsInitialLoading(false);

      setShopItem(data);
      setProductionReady(data.productionReady);
    };

    if (id.shopId !== "null") {
      fetchData();
    }
  }, [id]);

  const submitHandler = async (e) => {
    e.preventDefault();

    const tempObj = {};

    if (title.current.value) {
      tempObj.title = title.current.value;
    }

    if (title.current.value) {
      tempObj.title = title.current.value;
    }

    if (descriptions.current.value) {
      tempObj.descriptions = descriptions.current.value;
    }

    if (rank.current.value) {
      tempObj.rank = rank.current.value;
    }

    if (filter.current.value) {
      if (filter.current.value.slice(-1) === ",") {
        tempObj.itemFilter = filter.current.value
          .slice(0, -1)
          .replaceAll(" ", "")
          .split(",");
      } else {
        tempObj.itemFilter = filter.current.value
          .replaceAll(" ", "")
          .split(",");
      }
    }

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

    tempObj.productionReady = productionReady;
    tempObj.authenticator = authenticator.current.value;

    setIsPosting(true);
    const apiPOST = await fetch(
      `${process.env.REACT_APP_FETCH_URL}/api/v1/shop/${idRef.current.value}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
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
    <div className="py-3 px-5 w-1/2">
      {isInitialLoading && <LoadingSpinner />}

      {!isInitialLoading && (
        <form onSubmit={submitHandler} className="flex flex-col gap-5">
          <label>
            <p>Id:</p>
            <input
              type="text"
              placeholder="eg: 63bbf9ecb5c3773733898a0f"
              className="text-black w-full  bg-slate-50"
              defaultValue={`${id.shopId === "null" ? "" : id.shopId}`}
              required
              ref={idRef}
            />
          </label>
          <label>
            <p>Title:</p>
            <input
              type="text"
              ref={title}
              placeholder="eg: Strong Little Kendama"
              className="text-black w-full  bg-slate-50"
              defaultValue={`${shopItem?.title ? shopItem.title : ""}`}
            />
          </label>
          <label>
            <p>Descriptions:</p>
            <textarea
              rows="4"
              ref={descriptions}
              className="text-black w-full  bg-slate-50"
              defaultValue={`${
                shopItem?.descriptions ? shopItem.descriptions : ""
              }`}
              placeholder="eg: We are proud to finally introduce our newest version of the Mini Kendama! We've made Micros and Minis in the past, but this Mini is the most playable one yet! You can do all the tricks you would normally do with an average sized kendama, except now it fits in your pocket."
            />
          </label>
          <label>
            <p>Rank:</p>
            <input
              type="number"
              ref={rank}
              placeholder="eg: 1"
              defaultValue={`${shopItem?.rank ? shopItem.rank : ""}`}
              className="text-black w-full  bg-slate-50"
            />
          </label>
          <label>
            <p>Filter: valid options - single, gradient, hot, accessories</p>
            <input
              type="text"
              ref={filter}
              defaultValue={`${
                shopItem?.itemFilter.length > 0
                  ? shopItem.itemFilter.join(",")
                  : ""
              }`}
              placeholder="eg: hot, new, advanced, basic, accesories"
              className="text-black w-full  bg-slate-50"
            />
          </label>
          <label>
            <p>Specification:</p>
            <input
              type="text"
              ref={specification}
              defaultValue={`${
                shopItem?.specification.length > 0
                  ? shopItem.specification.join(",")
                  : ""
              }`}
              placeholder="eg: sticky, red / red"
              className="text-black w-full  bg-slate-50"
            />
          </label>
          <label>
            <p>Production Ready?</p>
            <div className="flex gap-5">
              <div className="flex">
                <input
                  type="checkbox"
                  checked={productionReady}
                  onChange={() => setProductionReady((prev) => !prev)}
                />
                <p>Yes</p>
              </div>
              <div className="flex">
                <input
                  type="checkbox"
                  checked={!productionReady}
                  onChange={() => setProductionReady((prev) => !prev)}
                />
                <p>No</p>
              </div>
            </div>
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

export default ChangeShop;
