import { useDispatch, useSelector } from "react-redux";
import FilterPage from "../Feature/FilterPage/FilterPage";
import Navbar from "../Feature/Navbar/Navbar";
import { SelectLoggedInUser, nullifyAuth } from "../Auth/AuthSlice";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";

const HomePage = () => {
  const user = useSelector(SelectLoggedInUser);
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(nullifyAuth())
  })

  return (
    <>
      {user && user.role === "admin" && (
        <Navigate to={"/admin"} replace={true} />
      )}
      <Navbar>
        <FilterPage />
      </Navbar>
    </>
  );
};

export default HomePage;
