import React from "react";
import { Link } from "react-router-dom";
import { CreditCard, ShieldCheck, Smartphone, ArrowRight } from "lucide-react";

export default function Cards() {
  const cards = [
    {
      icon: <CreditCard className="text-green-600" size={28} />,
      title: "Student Debit Card",
      desc: "Useful for ATM withdrawals, tuition-related transactions, and secure day-to-day payment activities.",
    },
    {
      icon: <ShieldCheck className="text-green-600" size={28} />,
      title: "Secure Smart Card",
      desc: "A protected card option built with safety-focused features for better student banking confidence.",
    },
    {
      icon: <Smartphone className="text-green-600" size={28} />,
      title: "Virtual Payment Card",
      desc: "Perfect for online payments, digital transactions, and academic payment needs with ease and flexibility.",
    },
  ];

  return (
    <div className="bg-[#f8fbff] min-h-screen">
      {/* HERO */}
      <section className="py-16">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 md:px-6 lg:grid-cols-2">
          {/* LEFT */}
          <div>
            <p className="text-lg font-semibold text-green-600">Cards</p>
            <h1 className="mt-3 text-4xl font-bold leading-tight text-slate-900 md:text-5xl">
              Modern <span className="text-green-600">Bank Cards</span> for
              Smart Payments
            </h1>
            <p className="mt-5 text-lg leading-9 text-slate-600">
              Choose secure and student-friendly banking cards designed for
              online payment, tuition fees, ATM withdrawal, and everyday digital use.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/accounts"
                className="rounded-full border border-green-600 px-6 py-3 text-sm font-semibold text-green-700 hover:bg-green-50"
              >
                Back to Accounts
              </Link>

              <Link
                to="/loans"
                className="rounded-full bg-green-600 px-6 py-3 text-sm font-semibold text-white hover:bg-green-700"
              >
                Go to Loans
              </Link>
            </div>
          </div>

          {/* RIGHT */}
          <div>
            <div className="relative overflow-hidden rounded-[32px] bg-white p-4 shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1200&q=80"
                alt="Bank cards"
                className="h-[430px] w-full rounded-[28px] object-cover"
              />

              <div className="absolute top-6 right-6 md:top-10 md:right-10 w-[250px] rounded-[24px] bg-white p-5 shadow-xl">
                <h3 className="text-xl md:text-2xl font-bold text-green-700 leading-snug">
                  Flexible Payment Cards
                </h3>
                <p className="mt-2 text-sm md:text-base text-slate-600 leading-6">
                  Safe card services for tuition, online payment, and daily transactions.
                </p>
              </div>

              <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 rounded-[24px] bg-green-600 px-6 py-5 text-white shadow-xl">
                <h3 className="text-3xl md:text-4xl font-bold">Safe</h3>
                <p className="mt-1 text-lg font-semibold">Transactions</p>
                <p className="mt-1 text-sm text-green-100">
                  Secure and student-friendly
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CARD TYPES */}
      <section className="pb-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="mb-8">
            <p className="text-lg font-semibold text-green-600">Payment Solutions</p>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold text-slate-900">
              Card Services
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {cards.map((card, index) => (
              <div
                key={index}
                className="rounded-[28px] border border-green-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50">
                  {card.icon}
                </div>

                <h3 className="text-xl font-bold text-slate-900">{card.title}</h3>
                <p className="mt-3 leading-7 text-slate-600">{card.desc}</p>

                <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-green-600">
                  Learn more <ArrowRight size={16} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}