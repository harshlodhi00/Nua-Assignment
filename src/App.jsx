import React, { useEffect } from "react";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  useNavigate,
} from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Layout from "./Layout/Layout";
import SearchBook from "./pages/SearchBook";

const RequireAuth = ({ children, loginPath }) => {
  const email = localStorage.getItem("email");
  const navigate = useNavigate();

  if (!email) {
    navigate(loginPath);
    return null;
  } else {
    return children;
  }
};

const App = () => {
  const Routes = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route
          path="/"
          element={
            <RequireAuth loginPath={"/login"}>
              <Layout />
            </RequireAuth>
          }
        >
          <Route path="/all-saved-books" element={<Dashboard />} />
          <Route path="/search-a-book" element={<SearchBook />} />
        </Route>

        <Route path="/login" element={<Login />} />
      </>
    )
  );

  return <RouterProvider router={Routes} />;
};

export default App;
