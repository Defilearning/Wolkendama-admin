import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Customer from "../Admin/Navigation/Customer";
import Shop from "../Admin/Navigation/Shop";
import UserAuth from "../store/user-auth";

const Admin = () => {
  const ctx = useContext(UserAuth);
  const navigate = useNavigate();

  const logout = async () => {
    const fetchData = await fetch(
      "http://localhost:3000/api/v1/user-admin/logout",
      {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          // authorization: `Bearer ${token}`,
        },
      }
    );
    const { status } = await fetchData.json();

    if (status === "success") {
      ctx.setIsLoggedIn(false);

      return navigate(`/login`);
    }
  };

  return (
    <div className="min-h-screen min-w-full flex relative">
      <div className="h-full w-full bg-slate-800 fixed -z-10" />
      <div className="min-w-fit w-2/12 h-screen bg-slate-600 fixed flex flex-col">
        <Shop />
        <Customer />
        <button className="px-5 text-2xl" onClick={logout}>
          Logout
        </button>
      </div>
      <div className="left-[16.6667%] w-10/12 h-screen absolute">
        <Outlet />
      </div>
    </div>
  );
};

export default Admin;
