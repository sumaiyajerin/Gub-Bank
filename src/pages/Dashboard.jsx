import { useState, useEffect, useMemo } from "react";
import { useAuth } from "../context/AuthContext";
import ProfileDropdown from "../components/ProfileDropdown";
import { db } from "../firebase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { user: firebaseUser } = useAuth();
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    studentId: "221-000-000",
    balance: 1500,
    savings: 500,
    cardStatus: "Active",
    remittanceCount: 0,
    transactions: [],
    loanRequests: [],
    transfers: [],
    withdrawals: [],
    name: "",
    email: "",
  });

  const [loading, setLoading] = useState(true);

  const [depositAmount, setDepositAmount] = useState("");
  const [transferTo, setTransferTo] = useState("");
  const [transferAmount, setTransferAmount] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");

  useEffect(() => {
    const loadUserData = async () => {
      if (!firebaseUser) return;

      try {
        const userRef = doc(db, "users", firebaseUser.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const data = userSnap.data();

          setProfile({
            studentId: data.studentId || "221-000-000",
            balance: Number(data.balance) || 1500,
            savings: Number(data.savings) || 500,
            cardStatus: data.cardStatus || "Active",
            remittanceCount: Number(data.remittanceCount) || 0,
            transactions: Array.isArray(data.transactions)
              ? data.transactions
              : [],
            loanRequests: Array.isArray(data.loanRequests)
              ? data.loanRequests
              : [],
            transfers: Array.isArray(data.transfers) ? data.transfers : [],
            withdrawals: Array.isArray(data.withdrawals)
              ? data.withdrawals
              : [],
            name: data.name || firebaseUser.displayName || "GUB User",
            email: data.email || firebaseUser.email || "No email found",
          });
        } else {
          const newUser = {
            studentId: "221-000-000",
            balance: 1500,
            savings: 500,
            cardStatus: "Active",
            remittanceCount: 0,
            transactions: [],
            loanRequests: [],
            transfers: [],
            withdrawals: [],
            name: firebaseUser.displayName || "GUB User",
            email: firebaseUser.email || "No email found",
          };

          await setDoc(userRef, newUser);
          setProfile(newUser);
        }
      } catch (error) {
        console.error("Error loading user data:", error);
        alert("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, [firebaseUser]);

  const saveProfile = async (updatedProfile) => {
    try {
      setProfile(updatedProfile);

      const userRef = doc(db, "users", firebaseUser.uid);
      await updateDoc(userRef, updatedProfile);
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("Failed to save data");
    }
  };

  const getTodayDate = () => {
    return new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const balance = Number(profile.balance) || 0;
  const savings = Number(profile.savings) || 0;

  const stats = useMemo(() => {
    const tx = Array.isArray(profile.transactions) ? profile.transactions : [];

    const deposits = tx
      .filter((item) => item.status === "credit")
      .reduce((sum, item) => sum + (Number(item.amount) || 0), 0);

    const debits = tx
      .filter((item) => item.status === "debit")
      .reduce((sum, item) => sum + (Number(item.amount) || 0), 0);

    const total = deposits + debits || 1;

    return {
      deposits,
      debits,
      depositPercent: Math.min((deposits / total) * 100, 100),
      debitPercent: Math.min((debits / total) * 100, 100),
    };
  }, [profile.transactions]);

  const handleDeposit = async () => {
    const amount = Number(depositAmount);

    if (!amount || amount <= 0) {
      alert("Enter valid deposit amount");
      return;
    }

    const newTransaction = {
      id: Date.now(),
      type: "Deposit",
      date: getTodayDate(),
      amount,
      status: "credit",
    };

    const updated = {
      ...profile,
      balance: balance + amount,
      savings: savings + amount,
      transactions: [newTransaction, ...profile.transactions],
    };

    await saveProfile(updated);
    setDepositAmount("");
  };

  const handleTransfer = async () => {
    const amount = Number(transferAmount);

    if (!transferTo || !amount || amount <= 0) {
      alert("Enter valid transfer details");
      return;
    }

    if (amount > balance) {
      alert("Not enough balance");
      return;
    }

    const newTransaction = {
      id: Date.now(),
      type: "Transfer",
      date: getTodayDate(),
      amount,
      status: "debit",
    };

    const updated = {
      ...profile,
      balance: balance - amount,
      remittanceCount: (Number(profile.remittanceCount) || 0) + 1,
      transfers: [
        ...profile.transfers,
        { id: Date.now(), to: transferTo, amount, date: getTodayDate() },
      ],
      transactions: [newTransaction, ...profile.transactions],
    };

    await saveProfile(updated);
    setTransferTo("");
    setTransferAmount("");
  };

  const handleLoan = async () => {
    const amount = Number(loanAmount);

    if (!amount || amount <= 0) {
      alert("Enter valid loan amount");
      return;
    }

    const updated = {
      ...profile,
      loanRequests: [
        ...profile.loanRequests,
        {
          id: Date.now(),
          amount,
          date: getTodayDate(),
          status: "Pending",
        },
      ],
    };

    await saveProfile(updated);
    setLoanAmount("");
  };

  const handleWithdraw = async () => {
    const amount = Number(withdrawAmount);

    if (!amount || amount <= 0) {
      alert("Enter valid withdraw amount");
      return;
    }

    if (amount > balance) {
      alert("Not enough balance");
      return;
    }

    const newTransaction = {
      id: Date.now(),
      type: "Withdraw",
      date: getTodayDate(),
      amount,
      status: "debit",
    };

    const updated = {
      ...profile,
      balance: balance - amount,
      withdrawals: [
        ...profile.withdrawals,
        { id: Date.now(), amount, date: getTodayDate() },
      ],
      transactions: [newTransaction, ...profile.transactions],
    };

    await saveProfile(updated);
    setWithdrawAmount("");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#eef4fb] flex items-center justify-center">
        <p className="text-xl font-semibold text-slate-600">
          Loading dashboard...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#eef4fb] px-4 py-10 md:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-green-600">Welcome back</p>
            <h1 className="mt-2 text-4xl font-bold text-slate-900 md:text-6xl">
              {profile.name || "GUB User"}
            </h1>
            <p className="mt-2 text-slate-500">{profile.email}</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/payment")}
              className="rounded-full bg-green-600 px-5 py-3 text-sm font-semibold text-white hover:bg-green-700"
            >
              Payment
            </button>

            <button
              onClick={() => navigate("/remittance")}
              className="rounded-full border border-green-600 bg-white px-5 py-3 text-sm font-semibold text-green-700 hover:bg-green-50"
            >
              Remittance
            </button>

            <ProfileDropdown />
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
          <div>
            <div className="rounded-3xl bg-white p-8 shadow-sm">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-slate-800">
                    Current balance
                  </h2>
                  <p className="mt-4 text-5xl font-bold text-slate-700 md:text-6xl">
                    ${balance.toFixed(2)}
                  </p>
                  <p className="mt-2 text-slate-400">As of {getTodayDate()}</p>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="rounded-2xl bg-[#f8fafc] px-5 py-4">
                    <p className="text-sm text-slate-500">Savings</p>
                    <p className="mt-2 text-2xl font-bold text-slate-900">
                      ${savings.toFixed(2)}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-[#f8fafc] px-5 py-4">
                    <p className="text-sm text-slate-500">Card Status</p>
                    <p className="mt-2 text-2xl font-bold text-slate-900">
                      {profile.cardStatus}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-[#f8fafc] px-5 py-4">
                    <p className="text-sm text-slate-500">Remittance</p>
                    <p className="mt-2 text-2xl font-bold text-slate-900">
                      {profile.remittanceCount}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <input
                  type="number"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                  placeholder="Enter deposit amount"
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-green-500"
                />
                <button
                  onClick={handleDeposit}
                  className="rounded-2xl bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700"
                >
                  Deposit
                </button>
              </div>
            </div>

            <div className="mt-8 grid gap-6 xl:grid-cols-2">
              <div className="rounded-3xl bg-white p-6 shadow-sm">
                <h3 className="text-2xl font-bold text-slate-900">
                  Transaction Overview
                </h3>

                <div className="mt-6 space-y-5">
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <span className="font-medium text-slate-700">Deposits</span>
                      <span className="text-sm font-semibold text-green-600">
                        ${stats.deposits.toFixed(2)}
                      </span>
                    </div>
                    <div className="h-4 w-full rounded-full bg-slate-100">
                      <div
                        className="h-4 rounded-full bg-green-500"
                        style={{ width: `${stats.depositPercent}%` }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <span className="font-medium text-slate-700">
                        Withdraw / Transfer
                      </span>
                      <span className="text-sm font-semibold text-red-500">
                        ${stats.debits.toFixed(2)}
                      </span>
                    </div>
                    <div className="h-4 w-full rounded-full bg-slate-100">
                      <div
                        className="h-4 rounded-full bg-red-400"
                        style={{ width: `${stats.debitPercent}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl bg-slate-50 px-4 py-4">
                      <p className="text-sm text-slate-500">Loan Requests</p>
                      <p className="mt-1 text-xl font-bold text-slate-900">
                        {profile.loanRequests.length}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-slate-50 px-4 py-4">
                      <p className="text-sm text-slate-500">Transfers</p>
                      <p className="mt-1 text-xl font-bold text-slate-900">
                        {profile.transfers.length}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl bg-white p-6 shadow-sm">
                <h3 className="text-2xl font-bold text-slate-900">
                  Profile Summary
                </h3>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl bg-slate-50 px-4 py-4">
                    <p className="text-sm text-slate-500">Full Name</p>
                    <p className="mt-1 font-semibold">{profile.name}</p>
                  </div>

                  <div className="rounded-2xl bg-slate-50 px-4 py-4">
                    <p className="text-sm text-slate-500">Email</p>
                    <p className="mt-1 font-semibold">{profile.email}</p>
                  </div>

                  <div className="rounded-2xl bg-slate-50 px-4 py-4">
                    <p className="text-sm text-slate-500">Student ID</p>
                    <p className="mt-1 font-semibold">{profile.studentId}</p>
                  </div>

                  <div className="rounded-2xl bg-slate-50 px-4 py-4">
                    <p className="text-sm text-slate-500">Savings</p>
                    <p className="mt-1 font-semibold">
                      ${savings.toFixed(2)}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-slate-50 px-4 py-4">
                    <p className="text-sm text-slate-500">Card Status</p>
                    <p className="mt-1 font-semibold">{profile.cardStatus}</p>
                  </div>

                  <div className="rounded-2xl bg-slate-50 px-4 py-4">
                    <p className="text-sm text-slate-500">Transactions</p>
                    <p className="mt-1 font-semibold">
                      {profile.transactions.length}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 rounded-3xl bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-3xl font-bold text-slate-800">
                  Transaction History
                </h3>
                <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
                  {profile.transactions.length} Records
                </span>
              </div>

              <div className="mt-6 space-y-4">
                {profile.transactions.length > 0 ? (
                  profile.transactions.map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-col gap-3 rounded-2xl bg-slate-50 px-5 py-5 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="flex items-center gap-4">
                        <span
                          className={`rounded-full px-4 py-2 text-sm font-bold text-white ${
                            item.status === "credit" ? "bg-green-500" : "bg-red-500"
                          }`}
                        >
                          {item.type.toUpperCase()}
                        </span>

                        <div>
                          <p className="text-lg font-semibold text-slate-800">
                            {item.type}
                          </p>
                          <p className="text-sm text-slate-500">{item.date}</p>
                        </div>
                      </div>

                      <span
                        className={`text-2xl font-bold ${
                          item.status === "credit"
                            ? "text-green-600"
                            : "text-red-500"
                        }`}
                      >
                        {item.status === "credit" ? "+" : "-"}$
                        {(Number(item.amount) || 0).toFixed(2)}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-slate-500">
                    No transaction details available
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="rounded-3xl bg-[#e7c942] p-8 shadow-sm">
              <h3 className="text-3xl font-bold text-slate-900">
                Transfer money
              </h3>

              <input
                type="text"
                placeholder="Transfer to"
                value={transferTo}
                onChange={(e) => setTransferTo(e.target.value)}
                className="mt-6 w-full rounded-2xl bg-[#f3e792] px-5 py-4 outline-none"
              />

              <input
                type="number"
                placeholder="Amount"
                value={transferAmount}
                onChange={(e) => setTransferAmount(e.target.value)}
                className="mt-4 w-full rounded-2xl bg-[#f3e792] px-5 py-4 outline-none"
              />

              <button
                onClick={handleTransfer}
                className="mt-5 w-full rounded-2xl bg-white py-4 text-2xl font-bold text-slate-700"
              >
                Send Money
              </button>

              {profile.transfers.length > 0 && (
                <p className="mt-4 text-sm font-medium text-slate-800">
                  Last Transfer: $
                  {profile.transfers[profile.transfers.length - 1].amount} to{" "}
                  {profile.transfers[profile.transfers.length - 1].to}
                </p>
              )}
            </div>

            <div className="rounded-3xl bg-[#98df9d] p-8 shadow-sm">
              <h3 className="text-3xl font-bold text-slate-900">
                Request loan
              </h3>

              <div className="mt-6 flex gap-3">
                <input
                  type="number"
                  placeholder="Amount"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(e.target.value)}
                  className="w-full rounded-2xl bg-[#d9f0db] px-5 py-4 outline-none"
                />

                <button
                  onClick={handleLoan}
                  className="rounded-2xl bg-white px-6 text-3xl font-bold text-slate-700"
                >
                  →
                </button>
              </div>

              {profile.loanRequests.length > 0 && (
                <p className="mt-4 text-sm font-medium text-slate-700">
                  Latest Loan: $
                  {profile.loanRequests[profile.loanRequests.length - 1].amount} (
                  {profile.loanRequests[profile.loanRequests.length - 1].status})
                </p>
              )}
            </div>

            <div className="rounded-3xl bg-[#e8a19d] p-8 shadow-sm">
              <h3 className="text-3xl font-bold text-slate-900">Withdraw</h3>

              <div className="mt-6 flex gap-3">
                <input
                  type="number"
                  placeholder="Amount"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  className="w-full rounded-2xl bg-[#f5d0cd] px-5 py-4 outline-none"
                />

                <button
                  onClick={handleWithdraw}
                  className="rounded-2xl bg-white px-6 text-3xl font-bold text-slate-700"
                >
                  →
                </button>
              </div>

              {profile.withdrawals.length > 0 && (
                <p className="mt-4 text-sm font-medium text-slate-700">
                  Last Withdraw: $
                  {profile.withdrawals[profile.withdrawals.length - 1].amount}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}