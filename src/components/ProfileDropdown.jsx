import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function ProfileDropdown() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    setOpen(false);
    localStorage.removeItem("gub-bank-profile");
    navigate("/login");
  };

  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)}>
        <img
          src={user?.photoURL || "https://i.pravatar.cc/100?img=12"}
          alt="profile"
          className="h-11 w-11 rounded-full border-2 border-green-500 object-cover"
        />
      </button>

      {open && (
        <div className="absolute right-0 mt-3 w-64 rounded-2xl border bg-white p-4 shadow-xl">
          <p className="font-semibold text-slate-900">
            {user?.displayName || "GUB User"}
          </p>
          <p className="mt-1 break-all text-sm text-slate-500">{user?.email}</p>

          <div className="mt-4 space-y-2">
            <button
              onClick={() => {
                navigate("/dashboard");
                setOpen(false);
              }}
              className="w-full rounded-xl bg-slate-100 px-3 py-2 text-left font-medium text-slate-700"
            >
              Dashboard
            </button>

            <button
              onClick={handleLogout}
              className="w-full rounded-xl bg-red-500 py-2 font-semibold text-white"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}