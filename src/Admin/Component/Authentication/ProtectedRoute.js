import { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import UserAuth from "../../../store/user-auth";

const ProtectedRoute = () => {
  const [firstLoad, setFirstLoad] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // ctx.setVisitedLink(href);
  useEffect(() => {
    const fetchLogInStatus = async () => {
      const fetchData = await fetch(
        "http://localhost:3000/api/v1/user-admin/isLoggedIn",
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

      setFirstLoad(false);
      if (status === "success") {
        setIsLoggedIn(true);

        return <Outlet />;
      }

      return navigate(`/login`);
    };

    fetchLogInStatus();
  }, [isLoggedIn, navigate]);

  return (
    <UserAuth.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
      }}
    >
      {!firstLoad && <Outlet />}
    </UserAuth.Provider>
  );
};

export default ProtectedRoute;
