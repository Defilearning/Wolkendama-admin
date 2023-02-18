import { useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Customer from "../Admin/Navigation/Customer";
import Shop from "../Admin/Navigation/Shop";
import UserAuth from "../store/user-auth";

const Admin = () => {
  const ctx = useContext(UserAuth);
  const navigate = useNavigate();

  const logout = async () => {
    const fetchData = await fetch(
      `${process.env.REACT_APP_FETCH_URL}/api/v1/user-admin/logout`,
      {
        method: "POST",
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
    <div className="h-screen w-full flex relative">
      <div className="h-screen w-screen bg-slate-800 fixed -z-10" />
      <div className="min-w-[300px] w-2/12 h-screen bg-slate-600 flex flex-col">
        <Shop />
        <Customer />
        <button className="px-5 text-2xl" onClick={logout}>
          Logout
        </button>
      </div>
      <div className="w-full ">
        <Outlet />
      </div>
    </div>
  );
};

export default Admin;
