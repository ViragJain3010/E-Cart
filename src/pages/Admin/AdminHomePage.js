import { useSelector } from "react-redux";
import AdminFilterPage from "../../Feature/Admin/AdminFilterPage";
import AdminNavbar from "../../Feature/Admin/AdminNavbar";
import { SelectLoggedInUser } from "../../Auth/AuthSlice";
import { Navigate } from "react-router-dom";

const AdminHomePage = () => {
  const user = useSelector(SelectLoggedInUser);

  if(!user){
    return (<Navigate to={"/"} replace={true}></Navigate>)
  }

  return (
    <>
      {user && user.role !== "admin" && (
        <Navigate to={"/"} replace={true}></Navigate>
      )}
      <AdminNavbar>
        <AdminFilterPage />
      </AdminNavbar>
    </>
  );
};

export default AdminHomePage;
