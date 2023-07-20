import { Navigate, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logingSuccess } from "../features/LoginSlice";

/**
 * Component - PrivateRoute
 */
const PrivateRoute = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  // keeps you logged in while refreshing
  if (token) {
    //alert("logged");
    dispatch(logingSuccess());
  }
  const { isAuth } = useSelector((state) => state.login);
  console.log(isAuth);
  return isAuth ? <Outlet /> : <Navigate to="/" />;
};
export default PrivateRoute;
