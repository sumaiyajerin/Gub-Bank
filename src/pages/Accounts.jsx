import React from "react";
import { Link } from "react-router-dom";
import {
  Wallet,
  PiggyBank,
  BadgeDollarSign,
  CreditCard,
  Landmark,
  ArrowRight,
} from "lucide-react";

export default function Accounts() {
  const accounts = [
    {
      icon: <Wallet className="text-green-600" size={28} />,
      title: "Student Savings Account",
      desc: "A secure savings account for students with easy access, low maintenance, and simple digital banking support.",
    },
    {
      icon: <PiggyBank className="text-green-600" size={28} />,
      title: "Campus Expense Account",
      desc: "Designed for tuition fees, library charges, academic expenses, and other university-related transactions.",
    },
    {
      icon: <BadgeDollarSign className="text-green-600" size={28} />,
      title: "Digital Payment Account",
      desc: "Ideal for online payment, fee submission, account balance viewing, and smooth student banking activity.",
    },
  ];

  return (
    <div className="bg-[#f8fbff] min-h-screen">
      {/* HERO */}
      <section className="py-16">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 md:px-6 lg:grid-cols-2">
          {/* LEFT */}
          <div>
            <p className="text-lg font-semibold text-green-600">Accounts</p>
            <h1 className="mt-3 text-4xl font-bold leading-tight text-slate-900 md:text-5xl">
              Smart Student <span className="text-green-600">Accounts</span>
            </h1>
            <p className="mt-5 text-lg leading-9 text-slate-600">
              Manage your banking needs with student-friendly account options
              designed for tuition payments, daily transactions, and digital
              financial access in one secure platform.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/cards"
                className="rounded-full bg-green-600 px-6 py-3 text-sm font-semibold text-white hover:bg-green-700"
              >
                Explore Cards
              </Link>

              <Link
                to="/loans"
                className="rounded-full border border-green-600 px-6 py-3 text-sm font-semibold text-green-700 hover:bg-green-50"
              >
                View Loans
              </Link>
            </div>
          </div>

          {/* RIGHT */}
          <div>
            <div className="relative overflow-hidden rounded-[32px] bg-white p-4 shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1601597111158-2fceff292cdc?auto=format&fit=crop&w=1200&q=80"
                alt="Accounts banking"
                className="h-[430px] w-full rounded-[28px] object-cover"
              />

              <div className="absolute top-6 right-6 md:top-10 md:right-10 w-[240px] rounded-[24px] bg-white p-5 shadow-xl">
                <h3 className="text-xl md:text-2xl font-bold text-green-700 leading-snug">
                  Trusted Student Accounts
                </h3>
                <p className="mt-2 text-sm md:text-base text-slate-600 leading-6">
                  Easy banking support for tuition, digital payments, and daily transactions.
                </p>
              </div>

              <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 rounded-[24px] bg-green-600 px-6 py-5 text-white shadow-xl">
                <h3 className="text-3xl md:text-4xl font-bold">24/7</h3>
                <p className="mt-1 text-lg font-semibold">Access</p>
                <p className="mt-1 text-sm text-green-100">
                  Manage your account anytime
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ACCOUNT CARDS */}
      <section className="pb-16">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="mb-8">
            <p className="text-lg font-semibold text-green-600">Banking Services</p>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold text-slate-900">
              Account Options for Students
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {accounts.map((item, index) => (
              <div
                key={index}
                className="rounded-[28px] border border-green-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50">
                  {item.icon}
                </div>

                <h3 className="text-xl font-bold text-slate-900">{item.title}</h3>
                <p className="mt-3 leading-7 text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QUICK NAV */}
      <section className="pb-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Link
              to="/cards"
              className="group rounded-[30px] bg-white p-8 shadow-sm border border-green-100 hover:shadow-lg transition"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50">
                    <CreditCard className="text-green-600" size={28} />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">
                    Go to Cards
                  </h3>
                  <p className="mt-3 text-slate-600 leading-7">
                    Explore debit, virtual, and smart payment cards designed for students.
                  </p>
                </div>

                <ArrowRight className="text-green-600 transition group-hover:translate-x-1" />
              </div>
            </Link>

            <Link
              to="/loans"
              className="group rounded-[30px] bg-white p-8 shadow-sm border border-green-100 hover:shadow-lg transition"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50">
                    <Landmark className="text-green-600" size={28} />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">
                    Go to Loans
                  </h3>
                  <p className="mt-3 text-slate-600 leading-7">
                    View education and installment loan facilities available for students.
                  </p>
                </div>

                <ArrowRight className="text-green-600 transition group-hover:translate-x-1" />
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}