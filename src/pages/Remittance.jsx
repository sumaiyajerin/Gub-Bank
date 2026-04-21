import { useMemo, useState } from 'react'

export default function Remittance() {
  const rates = {
    USD: 122.9354,
    GBP: 155.48,
    EUR: 133.62,
    CAD: 90.14,
    AUD: 81.22,
    BDT: 1,
    AED: 33.47,
    SGD: 91.2,
    MYR: 26.1,
    INR: 1.48,
  }

  const currencies = Object.keys(rates)

  const [sendAmount, setSendAmount] = useState(1000)
  const [fromCurrency, setFromCurrency] = useState('USD')
  const [toCurrency, setToCurrency] = useState('BDT')

  const exchangeRate = useMemo(() => {
    const fromRate = rates[fromCurrency]
    const toRate = rates[toCurrency]
    return toRate / fromRate
  }, [fromCurrency, toCurrency])

  const receiveAmount = useMemo(() => {
    return (Number(sendAmount || 0) * exchangeRate).toFixed(4)
  }, [sendAmount, exchangeRate])

  return (
    <div className="min-h-screen bg-[#f5f7fb]">
      <section className="bg-[#eef4fb] py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="mx-auto max-w-5xl rounded-[28px] bg-white p-6 shadow-md md:p-10">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-slate-900 md:text-5xl">
                Send Money Anywhere
              </h1>
              <p className="mt-3 text-base text-slate-500 md:text-xl">
                Compare 160+ currencies and choose the right moment to transfer funds.
              </p>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2">
              <div>
                <label className="mb-3 block text-lg font-semibold text-slate-800">
                  You send
                </label>
                <div className="flex overflow-hidden rounded-xl border border-slate-300">
                  <input
                    type="number"
                    value={sendAmount}
                    onChange={(e) => setSendAmount(e.target.value)}
                    className="w-full bg-[#f7f9fc] px-5 py-4 text-2xl outline-none"
                  />
                  <select
                    value={fromCurrency}
                    onChange={(e) => setFromCurrency(e.target.value)}
                    className="min-w-[140px] border-l border-slate-300 bg-white px-4 py-4 text-xl outline-none"
                  >
                    {currencies.map((currency) => (
                      <option key={currency} value={currency}>
                        {currency}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-3 block text-lg font-semibold text-slate-800">
                  Recipient Gets
                </label>
                <div className="flex overflow-hidden rounded-xl border border-slate-300">
                  <input
                    type="text"
                    value={receiveAmount}
                    readOnly
                    className="w-full bg-[#f7f9fc] px-5 py-4 text-2xl outline-none"
                  />
                  <select
                    value={toCurrency}
                    onChange={(e) => setToCurrency(e.target.value)}
                    className="min-w-[140px] border-l border-slate-300 bg-white px-4 py-4 text-xl outline-none"
                  >
                    {currencies.map((currency) => (
                      <option key={currency} value={currency}>
                        {currency}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div className="space-y-1">
                <p className="text-xl text-slate-500">Exchange Rate</p>
                <p className="text-2xl font-semibold text-green-500">
                  {exchangeRate.toFixed(4)} {fromCurrency} to {toCurrency}
                </p>
              </div>

              <button className="rounded-full bg-green-600 px-10 py-4 text-xl font-semibold text-white transition hover:bg-green-700">
                Transfer Funds
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 text-center md:px-6">
          <h2 className="text-3xl font-bold text-green-700 md:text-6xl">
            Why Choose GUB Bank Remittance?
          </h2>
          <p className="mx-auto mt-5 max-w-4xl text-lg leading-8 text-slate-500 md:text-2xl md:leading-10">
            Experience the best way to send money internationally with GUB Bank.
            Enjoy low fees, simplicity, speed, and security every time you transfer.
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <div className="rounded-[24px] bg-[#f8fafc] p-8 shadow-sm">
              <div className="text-5xl">⚡</div>
              <h3 className="mt-4 text-2xl font-bold text-slate-900">Fast Transfers</h3>
              <p className="mt-3 text-lg leading-8 text-slate-500">
                Send money quickly and securely to your loved ones.
              </p>
            </div>

            <div className="rounded-[24px] bg-[#f8fafc] p-8 shadow-sm">
              <div className="text-5xl">🔒</div>
              <h3 className="mt-4 text-2xl font-bold text-slate-900">Safe & Secure</h3>
              <p className="mt-3 text-lg leading-8 text-slate-500">
                Every transfer is protected with trusted banking security.
              </p>
            </div>

            <div className="rounded-[24px] bg-[#f8fafc] p-8 shadow-sm">
              <div className="text-5xl">💱</div>
              <h3 className="mt-4 text-2xl font-bold text-slate-900">Best Rates</h3>
              <p className="mt-3 text-lg leading-8 text-slate-500">
                Get competitive exchange rates across popular currencies.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}