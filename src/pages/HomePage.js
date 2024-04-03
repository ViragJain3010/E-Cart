import { useSelector } from "react-redux";
import FilterPage from "../Feature/FilterPage/FilterPage";
import Navbar from "../Feature/Navbar/Navbar";
import { SelectLoggedInUser } from "../Auth/AuthSlice";
import { Navigate } from "react-router-dom";

const HomePage = () => {
  const user = useSelector(SelectLoggedInUser);

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
