import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Admin from "./Pages/Admin";
import UserLogin from "./Pages/UserLogin";
import ShopOverview from "./Admin/Application/Shop/ShopOverview";
import CreateShop from "./Admin/Application/Shop/CreateShop";
import ChangeShop from "./Admin/Application/Shop/ChangeShop";
import UpdateInventory from "./Admin/Application/Shop/UpdateInventory";
import UploadPhoto from "./Admin/Application/Shop/UploadPhoto";
import DeletePhoto from "./Admin/Application/Shop/DeletePhoto";
import CustomerOverview from "./Admin/Application/Customer/CustomerOverview";
import ChangeCustomerStatus from "./Admin/Application/Customer/ChangeCustomerStatus";
import PrintInvoice from "./Admin/Application/Customer/PrintInvoice";
import ProtectedRoute from "./Admin/Component/Authentication/ProtectedRoute";

// const AuthLayout = ()=> (
//   <UserAuth.Provider

// )

const router = createBrowserRouter([
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <Admin />,
        children: [
          {
            path: "/shop",
            element: <ShopOverview />,
          },
          {
            path: "/create-shop-item",
            element: <CreateShop />,
          },
          {
            path: "/change-shop-item/:shopId",
            element: <ChangeShop />,
          },
          {
            path: "/update-inventory/:shopId",
            element: <UpdateInventory />,
          },
          {
            path: "/upload-photo/:shopId",
            element: <UploadPhoto />,
          },
          {
            path: "/delete-photo/:shopId",
            element: <DeletePhoto />,
          },
          {
            path: "/customer",
            element: <CustomerOverview />,
          },
          {
            path: "/change-customer-status/:customerId",
            element: <ChangeCustomerStatus />,
          },
          {
            path: "/print-invoice/:customerId",
            element: <PrintInvoice />,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <UserLogin />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
