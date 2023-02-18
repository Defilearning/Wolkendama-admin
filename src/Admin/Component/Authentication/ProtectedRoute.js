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
        `${process.env.REACT_APP_FETCH_URL}/api/v1/user-admin/isLoggedIn`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            // authorization: `Bearer ${token}`,
          },
        }
      );
      const response = await fetchData.json();

      setFirstLoad(false);
      if (response.status === "success") {
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
