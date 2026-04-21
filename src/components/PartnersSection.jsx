const partners = ['Mastercard', 'Visa', 'American Express', 'PayPal', 'Stripe']

export default function PartnersSection() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <h3 className="text-center text-5xl font-bold text-slate-700">Partners</h3>

        <div className="mt-12 grid grid-cols-2 gap-8 text-center md:grid-cols-5">
          {partners.map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-8 text-3xl font-bold text-slate-500"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}