import React from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { Package, MessageSquare } from "lucide-react";
import { Button } from "@mui/material";
import toast from "react-hot-toast";
import { AdminState } from "../context/AdminProvider";

const Admin = () => {
  const { user, setUser } = AdminState();
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { path: "/admin/products", label: "Products", icon: Package },
    { path: "/admin/messages", label: "Messages", icon: MessageSquare },
  ];

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    setUser(null);
    navigate("/login");
    toast.success("Logged Out");
  };

  return (
    <div className="pt-16">
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 py-8">
        <div className=" flex justify-between container-custom">
          <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
          <Button
            variant="outlined"
            sx={{
              border: "1.5px solid #ffffff",
              color: "#ffffff",
              ":hover": { color: "#036aa9", backgroundColor: "#ffffff" },
            }}
            onClick={handleLogout}
          >
            Logout
          </Button>{" "}
        </div>
      </div>

      <div className="container-custom py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-64 flex-shrink-0">
            <nav className="bg-white rounded-lg shadow-sm p-4">
              {navItems.map(({ path, label, icon: Icon }) => (
                <Link
                  key={path}
                  to={path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md mb-2 ${
                    location.pathname === path
                      ? "bg-primary-50 text-primary-600"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <Icon size={20} />
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
