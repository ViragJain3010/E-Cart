import React from "react";
import Navbar from "../Feature/Navbar/Navbar";
import UserOrders from "../Feature/Users/UserOrders";

const UserOrdersPage = () => {
  return (
    <div>
      <Navbar>
        <UserOrders />
      </Navbar>
    </div>
  );
};

export default UserOrdersPage;
