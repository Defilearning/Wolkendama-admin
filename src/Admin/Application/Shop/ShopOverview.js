import React, { useEffect, useRef, useState } from "react";
import ShopButtons from "../../Component/ShopOverview/ShopButtons";
import ShopInfo from "../../Component/ShopOverview/ShopInfo";
import Title from "../../Component/ShopOverview/Title";

function ShopOverview() {
  const twoFA = useRef();

  const [shopItem, setShopItem] = useState();
  const [activeShop, setActiveShop] = useState({});

  const [onConfirm, setOnConfirm] = useState(false);
  const [toDeleteShop, setToDeleteShop] = useState();

  const fetchData = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_FETCH_URL}/api/v1/shop`
    );

    const data = (await response.json()).data;

    setShopItem(data);
  };

  const toDeleteFetch = async (e) => {
    e.preventDefault();

    const apiDELETE = await fetch(
      `${process.env.REACT_APP_FETCH_URL}/api/v1/shop/${toDeleteShop._id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "DELETE",
        body: JSON.stringify({
          authenticator: twoFA.current.value,
        }),
        credentials: "include",
      }
    );

    await apiDELETE.json();

    setOnConfirm(false);

    await fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {onConfirm && (
        <>
          <div
            className="h-full w-full z-10 bg-black/30 backdrop-blur-sm fixed top-0 left-0"
            onClick={() => setOnConfirm(false)}
          ></div>
          <form
            onSubmit={toDeleteFetch}
            className="w-1/2 h-1/2 bg-slate-300 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md px-10 py-10 flex flex-col justify-around z-30"
          >
            <p className="text-black text-3xl">{`Are you sure to delete ${toDeleteShop.title}?`}</p>
            <div className="text-black flex flex-col">
              <label>2FA authenticator:</label>
              <input
                type="number"
                placeholder="183737"
                required
                ref={twoFA}
                className="bg-slate-50"
              />
            </div>
            <div className="flex gap-10 justify-end">
              <button
                className="bg-red-600 py-5 px-10 text-white rounded-md text-2xl"
                onClick={() => {
                  setOnConfirm(false);
                  setToDeleteShop(null);
                }}
              >
                No
              </button>
              <button
                className="bg-lime-600 py-5 px-10 text-white rounded-md text-2xl"
                type="submit"
              >
                Yes
              </button>
            </div>
          </form>
        </>
      )}

      <div className="py-3 px-5 w-full h-full flex flex-col gap-10">
        {shopItem?.length === 0 && (
          <p>There is no shop current, please create 1</p>
        )}

        {shopItem?.length > 0 &&
          shopItem?.map((shopData, i) => (
            <div className="bg-slate-300 rounded-xl" key={i}>
              <Title
                setActiveShop={setActiveShop}
                shopData={shopData}
                activeShop={activeShop}
              />
              {activeShop[shopData._id] && <ShopInfo shopData={shopData} />}
              {activeShop[shopData._id] && (
                <ShopButtons
                  shopData={shopData}
                  setOnConfirm={setOnConfirm}
                  setToDeleteShop={setToDeleteShop}
                />
              )}
            </div>
          ))}
      </div>
    </>
  );
}

export default ShopOverview;
