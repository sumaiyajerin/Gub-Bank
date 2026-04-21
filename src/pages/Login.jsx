import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { auth, googleProvider } from "../firebase";

export default function Login() {
  const [isSignup, setIsSignup] = useState(false);
  const [fullName, setFullName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const createBankProfile = () => {
    const existing = JSON.parse(localStorage.getItem("gub-bank-profile"));
    if (existing) return;

    const profile = {
      studentId: studentId || "221-000-000",
      balance: 1500,
      transactions: [
        {
          id: Date.now(),
          type: "Deposit",
          date: "21/04/2026",
          amount: 500,
          status: "credit",
        },
      ],
      loanRequests: [],
      transfers: [],
      withdrawals: [],
    };

    localStorage.setItem("gub-bank-profile", JSON.stringify(profile));
  };

  const handleEmailAuth = async (e) => {
    e.preventDefault();

    try {
      if (isSignup) {
        const res = await createUserWithEmailAndPassword(auth, email, password);

        if (fullName) {
          await updateProfile(res.user, { displayName: fullName });
        }

        createBankProfile();
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }

      navigate("/dashboard");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleGoogleAuth = async () => {
    try {
      await signInWithPopup(auth, googleProvider);

      const existing = JSON.parse(localStorage.getItem("gub-bank-profile"));
      if (!existing) {
        localStorage.setItem(
          "gub-bank-profile",
          JSON.stringify({
            studentId: "221-000-000",
            balance: 1500,
            transactions: [
              {
                id: Date.now(),
                type: "Deposit",
                date: "21/04/2026",
                amount: 500,
                status: "credit",
              },
            ],
            loanRequests: [],
            transfers: [],
            withdrawals: [],
          })
        );
      }

      navigate("/dashboard");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 bg-[#f5f7fb]">
      <div className="w-full max-w-md rounded-3xl bg-white border border-green-100 p-8 shadow-md">
        <h1 className="mb-3 text-center text-3xl font-bold text-green-800">
          {isSignup ? "Create Account" : "Login"}
        </h1>

        <p className="mb-6 text-center text-gray-600">
          {isSignup
            ? "Create your GUB Bank account to continue"
            : "Login first to access student banking features"}
        </p>

        <form onSubmit={handleEmailAuth} className="space-y-5">
          {isSignup && (
            <div>
              <label className="block mb-2 font-medium">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter full name"
                className="w-full rounded-xl border border-green-200 px-4 py-3 outline-none focus:border-green-700"
              />
            </div>
          )}

          <div>
            <label className="block mb-2 font-medium">Student ID</label>
            <input
              type="text"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              placeholder="Enter Student ID"
              className="w-full rounded-xl border border-green-200 px-4 py-3 outline-none focus:border-green-700"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              className="w-full rounded-xl border border-green-200 px-4 py-3 outline-none focus:border-green-700"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
              className="w-full rounded-xl border border-green-200 px-4 py-3 outline-none focus:border-green-700"
            />
          </div>

          <button className="w-full rounded-xl bg-green-600 py-3 font-semibold text-white hover:bg-green-700">
            {isSignup ? "Sign Up" : "Login"}
          </button>
        </form>

        <button
          onClick={handleGoogleAuth}
          className="mt-4 w-full rounded-xl border border-slate-200 py-3 font-semibold text-slate-700 hover:bg-slate-50"
        >
          Continue with Google
        </button>

        <p className="mt-5 text-center text-sm text-slate-600">
          {isSignup ? "Already have an account?" : "Don't have an account?"}
          <button
            onClick={() => setIsSignup(!isSignup)}
            className="ml-2 font-semibold text-green-700"
          >
            {isSignup ? "Login" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
}