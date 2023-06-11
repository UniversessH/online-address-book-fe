import React from "react";
import AdminMainPage from "./AdminMainPage";
import UserMainPage from "./UserMainPage";
const MainPage: React.FC = () => {
  const isAdmin = localStorage.getItem("is_admin");
  return isAdmin === "true" ? <AdminMainPage /> : <UserMainPage />;
};

export default MainPage;
