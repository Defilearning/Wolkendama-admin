import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CustomerInfo from "../../Component/CustomerOverview/CustomerInfo";
import PendingPaymentInfo from "../../Component/CustomerOverview/PendingPaymentInfo";
import Title from "../../Component/CustomerOverview/Title";

const filterOptions = [
  {
    value: "",
    text: "--Filter--",
  },
  {
    value: "all",
    text: "All",
  },
  {
    value: "pending_payment",
    text: "Pending Payment",
  },
  {
    value: "payment_success",
    text: "Payment success pending shipment",
  },
  {
    value: "shipped",
    text: "Item Shipped",
  },
];

const searchOptions = [
  {
    value: "",
    text: "--Search By--",
  },
  {
    value: "none",
    text: "None",
  },
  {
    value: "email",
    text: "Email",
  },
  {
    value: "phone",
    text: "Phone",
  },
  {
    value: "shippingName",
    text: "Shipping Name",
  },
];

function CustomerOverview() {
  const [filter, setFilter] = useState(filterOptions[0].value);
  const [searchByOptions, setSearchByOptions] = useState(
    searchOptions[0].value
  );
  const [searchText, setSearchText] = useState("");

  const [customerItem, setCustomerItem] = useState();
  const [data, setData] = useState([]);
  const [activeCustomer, setActiveCustomer] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:3000/api/v1/customer", {
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        method: "GET",
        credentials: "include",
      });

      const data = (await response.json()).data;

      setCustomerItem(data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (filter && !searchText) {
      let tempArr = [];

      for (let i = 0; i < customerItem.length; i++) {
        if (customerItem[i].status === filter) {
          tempArr.push(customerItem[i]);
        }
      }
      setData(tempArr);
    }

    if ((!filter || filter === "all") && !searchText) {
      setData(customerItem);
    }
  }, [filter, customerItem, searchText]);

  useEffect(() => {
    if (searchByOptions && searchText) {
      setData((prev) => {
        return prev.filter((el) => {
          return el[searchByOptions]?.includes(searchText);
        });
      });
    }
  }, [searchText, searchByOptions]);

  const filterChange = (e) => {
    setFilter(e.target.value);
  };

  const searchOptionChange = (e) => {
    setSearchByOptions(e.target.value);
  };

  return (
    <div className="py-3 px-5 w-full h-full flex flex-col gap-10">
      <select
        className="select w-full max-w-xs bg-slate-100 text-slate-800 col-span-full justify-self-stretch"
        value={filter}
        onChange={filterChange}
      >
        {filterOptions.map((el) => (
          <option key={el.text} value={el.value} disabled={!el.value}>
            {el.text}
          </option>
        ))}
      </select>
      {filter !== "pending_payment" && (
        <div>
          <select
            className="select w-full max-w-xs bg-slate-100 text-slate-800 col-span-full justify-self-stretch"
            value={searchByOptions}
            onChange={searchOptionChange}
          >
            {searchOptions.map((el) => (
              <option key={el.text} value={el.value} disabled={el.value === ""}>
                {el.text}
              </option>
            ))}
          </select>
          <input
            type="text"
            value={searchText}
            disabled={searchByOptions === "none" || searchByOptions === ""}
            onChange={(e) => setSearchText(e.target.value)}
            className=" ml-7 input w-full max-w-xs bg-slate-100 text-slate-800 col-span-full justify-self-stretch"
          />
        </div>
      )}

      {data?.length > 0 ? (
        data?.map((customerData, i) => (
          <div className="bg-slate-300 rounded-xl" key={i}>
            <Title
              setActiveCustomer={setActiveCustomer}
              customerData={customerData}
              activeCustomer={activeCustomer}
            />
            {activeCustomer[customerData._id] &&
              customerData.status === "pending_payment" && (
                <PendingPaymentInfo customerData={customerData} />
              )}
            {activeCustomer[customerData._id] &&
              customerData.status !== "pending_payment" && (
                <CustomerInfo customerData={customerData} />
              )}
            {activeCustomer[customerData._id] &&
              customerData.status === "payment_success" && (
                <div className="flex bg-slate-500 py-5 px-4 rounded-lg gap-10 justify-end">
                  <Link
                    to={`/change-customer-status/${customerData._id}`}
                    className="bg-lime-600 py-2 px-3 text-white rounded-md"
                  >
                    Change status
                  </Link>
                  <Link
                    to={`/print-invoice/${customerData._id}`}
                    className="bg-lime-600 py-2 px-3 text-white rounded-md"
                  >
                    Print Invoice
                  </Link>
                </div>
              )}
          </div>
        ))
      ) : (
        <div>There is no result found</div>
      )}
    </div>
  );
}

export default CustomerOverview;
