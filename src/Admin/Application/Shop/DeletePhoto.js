import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Alert from "../../../utils/Alert";
import LoadingSpinner from "../../../utils/LoadingSpinner";

function DeletePhoto() {
  const [isInitialLoading, setIsInitialLoading] = useState(false);
  const [isPosting, setIsPosting] = useState(false);
  const [response, setResponse] = useState();

  const id = useParams();
  const idRef = useRef();
  const authenticator = useRef();

  const [shopData, setShopData] = useState();
  const [imgToDelete, setImgToDelete] = useState([]);
  const [imgCoverToDelete, setImgCoverToDelete] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsInitialLoading(true);

      const response = await fetch(
        `https://api.wolkendama.com/api/v1/shop/${id.shopId}`
      );

      const data = (await response.json()).data;
      setIsInitialLoading(false);

      setShopData(data);
    };

    if (id.shopId !== "null") {
      fetchData();
    }
  }, [id]);

  const toggleImage = (image) => {
    setImgToDelete((prev) => {
      const prevArr = [...prev];

      if (prevArr.includes(image)) {
        return prevArr.filter((el) => el !== image);
      } else {
        prevArr.push(image);
        return prevArr;
      }
    });
  };

  const submitDelete = async (e) => {
    e.preventDefault();

    setIsPosting(true);
    const apiPOST = await fetch(
      `https://api.wolkendama.com/api/v1/shop/${idRef.current.value}/deletePhoto`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "DELETE",
        body: JSON.stringify({
          img: imgToDelete,
          imgCover: imgCoverToDelete,
          authenticator: authenticator.current.value,
        }),
        credentials: "include",
      }
    );

    const apiResponse = await apiPOST.json();
    setIsPosting(false);
    setResponse(apiResponse);
  };

  return (
    <div className="py-3 px-5">
      {isInitialLoading && <LoadingSpinner />}
      {!isInitialLoading && (
        <>
          <p>Id:</p>
          <input
            type="text"
            ref={idRef}
            placeholder="eg: 63bbf9ecb5c3773733898a0f"
            className="text-black w-full mb-7 bg-slate-50"
            defaultValue={`${id.shopId === "null" ? "" : id.shopId}`}
          />
          <h1 className="text-4xl mb-5">Image Cover</h1>
          {!shopData?.imgCover ? (
            <p>There is no image cover for this shop item.</p>
          ) : (
            <div
              className={`h-[220px] w-[220px] flex justify-center items-center bg-slate-200 cursor-pointer ml-4 box-border ${
                imgCoverToDelete
                  ? "border-red-500 border-[6px]"
                  : "border-slate-200 border-[6px]"
              }`}
              onClick={() => setImgCoverToDelete((prev) => !prev)}
            >
              <div
                className="h-[200px] w-[200px] bg-center"
                style={{
                  backgroundImage: `url(${shopData?.imgCover})`,
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                }}
              />
            </div>
          )}

          <h1 className="text-4xl my-5">Product Images</h1>
          <div className="mt-5 flex w-full gap-10 flex-wrap py-3 px-4">
            {shopData?.img.length > 0 &&
              shopData?.img.map((image, i) => {
                return (
                  <div
                    key={i}
                    className={`py-5 px-5 bg-slate-200 box-border cursor-pointer ${
                      imgToDelete.includes(image)
                        ? "border-red-500 border-[6px]"
                        : "border-slate-200 border-[6px]"
                    }`}
                    onClick={() => toggleImage(image)}
                  >
                    <div
                      className="min-h-[200px] min-w-[200px] bg-center"
                      style={{
                        backgroundImage: `url(${image})`,
                        backgroundSize: "contain",
                        backgroundRepeat: "no-repeat",
                      }}
                    />
                  </div>
                );
              })}
          </div>
          {(shopData?.img.length === 0 || !shopData) && (
            <p className="mb-7">
              There is no product imgaes for this shop item.
            </p>
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
          {!imgCoverToDelete && imgToDelete.length === 0 ? (
            <div className="bg-slate-50 text-black py-2 px-3 w-full text-2xl mt-6 text-center">
              Select images to delete!
            </div>
          ) : (
            <button
              onClick={submitDelete}
              className={`${
                isPosting ? "bg-slate-400" : "bg-slate-50"
              } text-black py-2 px-3 w-full text-2xl mt-6`}
            >
              {isPosting
                ? "Processing..."
                : `Delete ${
                    imgCoverToDelete
                      ? imgToDelete.length + 1
                      : imgToDelete.length
                  } selected photos!`}
            </button>
          )}
        </>
      )}

      {response && response?.status === "success" && !isPosting && (
        <Alert variant="success">
          Photos deleted successfully, Please refresh to see changes
        </Alert>
      )}

      {response && response?.status !== "success" && !isPosting && (
        <Alert variant="warning">{response?.message}</Alert>
      )}
    </div>
  );
}

export default DeletePhoto;
