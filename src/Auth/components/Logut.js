import { useEffect } from "react";
import { SelectLoggedInUser, signOutAsync } from "../AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { nullifyCartIndex } from "../../Feature/Cart/CartSlice";
import { nullifyOrderIndex } from "../../Feature/Order/OrderSlice";
import { nullifyUserIndex } from "../../Feature/Users/UserSlice";

function Logout() {
  const dispatch = useDispatch();
  const user = useSelector(SelectLoggedInUser);

  useEffect(() => {
    dispatch(signOutAsync());
    dispatch(nullifyCartIndex());
    dispatch(nullifyOrderIndex());
    dispatch(nullifyUserIndex())
  });

  // but useEffect runs after render, so we have to delay navigate part
  return <>{!user && <Navigate to="/login" replace={true}></Navigate>}</>;
}

export default Logout;
