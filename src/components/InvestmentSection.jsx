const investmentChecks = [
  'Profitable to invest and handy to manage',
  'Highest returns on your investment',
  'Simple and secure digital access',
]

export default function InvestmentSection() {
  return (
    <section className="mx-auto grid max-w-7xl gap-12 px-4 py-16 md:px-6 lg:grid-cols-2">
      <div className="relative">
        <div className="absolute left-0 top-10 h-56 w-56 rounded-full bg-green-100 blur-3xl" />
        <img
          src="https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80"
          alt="Safe investments"
          className="relative h-[430px] w-full rounded-[28px] object-cover shadow-lg"
        />
      </div>

      <div className="flex flex-col justify-center">
        <p className="text-lg font-semibold text-green-600">Safe Investments</p>
        <h3 className="mt-3 text-4xl font-bold leading-tight md:text-5xl">
          The Better Way to Save & Invest
        </h3>
        <p className="mt-5 text-lg leading-9 text-slate-600">
          GUB Bank helps users achieve their financial goals by helping them save and invest with ease.
          Put that extra cash to use without putting it at risk.
        </p>

        <div className="mt-8 space-y-5">
          {investmentChecks.map((item) => (
            <div key={item} className="flex items-start gap-4">
              <div className="mt-1 flex h-9 w-9 items-center justify-center rounded-full border-2 border-green-500 text-green-600">
                ✓
              </div>
              <p className="text-2xl text-slate-700">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}