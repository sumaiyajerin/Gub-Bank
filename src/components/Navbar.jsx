import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "../assets/GUB-LOGO.png";
import { useAuth } from "../context/AuthContext";
import ProfileDropdown from "./ProfileDropdown";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-white/95 shadow-sm backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">
        <Link to="/" className="flex items-center gap-3">
          <img
            src={logo}
            alt="GUB Bank logo"
            className="h-12 w-12 rounded-full object-cover"
          />
          <div>
            <h1 className="text-lg font-bold text-slate-900 md:text-xl">
              GUB Bank
            </h1>
            <p className="text-xs text-slate-500">
              Smart banking for modern users
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-5 lg:gap-8 md:flex">
          <Link to="/" className="text-sm font-medium text-slate-700 hover:text-green-600">
            Home
          </Link>

          <Link to="/about" className="text-sm font-medium text-slate-700 hover:text-green-600">
            About
          </Link>

          <Link to="/faq" className="text-sm font-medium text-slate-700 hover:text-green-600">
            FAQ
          </Link>

          <Link to="/contact" className="text-sm font-medium text-slate-700 hover:text-green-600">
            Contact
          </Link>

          {user ? (
            <>
              <Link to="/accounts" className="text-sm font-medium text-slate-700 hover:text-green-600">
                Accounts
              </Link>

              <Link to="/cards" className="text-sm font-medium text-slate-700 hover:text-green-600">
                Cards
              </Link>

              <Link to="/loans" className="text-sm font-medium text-slate-700 hover:text-green-600">
                Loans
              </Link>

              <Link to="/payment" className="text-sm font-medium text-slate-700 hover:text-green-600">
                Payment
              </Link>

              <ProfileDropdown />
            </>
          ) : (
            <Link
              to="/login"
              className="rounded-full bg-green-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-green-700"
            >
              Login
            </Link>
          )}
        </nav>

        <button
          className="rounded-lg p-2 md:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {open && (
        <div className="border-t bg-white px-4 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            <Link to="/" onClick={() => setOpen(false)} className="text-sm font-medium text-slate-700">
              Home
            </Link>

            <Link to="/about" onClick={() => setOpen(false)} className="text-sm font-medium text-slate-700">
              About
            </Link>

            <Link to="/faq" onClick={() => setOpen(false)} className="text-sm font-medium text-slate-700">
              FAQ
            </Link>

            <Link to="/contact" onClick={() => setOpen(false)} className="text-sm font-medium text-slate-700">
              Contact
            </Link>

            {user ? (
              <>
                <Link to="/accounts" onClick={() => setOpen(false)} className="text-sm font-medium text-slate-700">
                  Accounts
                </Link>

                <Link to="/cards" onClick={() => setOpen(false)} className="text-sm font-medium text-slate-700">
                  Cards
                </Link>

                <Link to="/loans" onClick={() => setOpen(false)} className="text-sm font-medium text-slate-700">
                  Loans
                </Link>

                <Link to="/payment" onClick={() => setOpen(false)} className="text-sm font-medium text-slate-700">
                  Payment
                </Link>

                <div className="pt-2">
                  <ProfileDropdown />
                </div>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="rounded-full bg-green-600 px-5 py-3 text-center text-sm font-semibold text-white"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}