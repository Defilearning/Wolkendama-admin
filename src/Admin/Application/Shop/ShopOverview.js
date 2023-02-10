import React, { useEffect, useState } from "react";
import ShopButtons from "../../../../../admin-wolkendama/src/Admin/Component/ShopOverview/ShopButtons";
import ShopInfo from "../../Component/ShopOverview/ShopInfo";
import Title from "../../Component/ShopOverview/Title";

function ShopOverview() {
  const [shopItem, setShopItem] = useState();
  const [activeShop, setActiveShop] = useState({});

  const [onConfirm, setOnConfirm] = useState(false);
  const [toDeleteShop, setToDeleteShop] = useState();

  const fetchData = async () => {
    const response = await fetch("http://localhost:3000/api/v1/shop");

    const data = (await response.json()).data;

    setShopItem(data);
  };

  const toDeleteFetch = async () => {
    console.log(toDeleteShop);

    const apiDELETE = await fetch(
      `http://localhost:3000/api/v1/shop/${toDeleteShop._id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        method: "DELETE",
        credentials: "include",
      }
    );

    const response = await apiDELETE.json();

    console.log(response);

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
          <div className="w-1/2 h-1/2 bg-slate-300 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md px-10 py-10 flex flex-col justify-around z-30">
            <p className="text-black text-3xl">{`Are you sure to delete ${toDeleteShop.title}?`}</p>
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
                onClick={toDeleteFetch}
              >
                Yes
              </button>
            </div>
          </div>
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
