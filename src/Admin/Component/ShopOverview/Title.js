import React from "react";

function Title({ setActiveShop, activeShop, shopData }) {
  return (
    <div
      className="bg-slate-400 w-full py-3 px-10 rounded-xl flex justify-between text-black cursor-pointer"
      onClick={() =>
        setActiveShop((prev) => {
          const tempObj = { ...prev };
          tempObj[shopData._id] = !tempObj[shopData._id];
          return tempObj;
        })
      }
    >
      <p className="text-2xl">{shopData.title}</p>
      {activeShop[shopData._id] ? (
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
            d="M4.5 15.75l7.5-7.5 7.5 7.5"
          />
        </svg>
      ) : (
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
            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
          />
        </svg>
      )}
    </div>
  );
}

export default Title;
