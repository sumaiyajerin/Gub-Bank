import { BadgePercent, CreditCard, Plane } from 'lucide-react'

const benefitCards = [
  {
    title: 'Cashback Offers',
    text: 'Earn cashback on every spend with selected GUB Bank cards.',
    icon: BadgePercent,
  },
  {
    title: 'Credit Building',
    text: 'Improve your credit score easily with responsible usage.',
    icon: CreditCard,
  },
  {
    title: 'Travel Benefits',
    text: 'Enjoy flexible travel support and special partner discounts.',
    icon: Plane,
  },
]

export default function FeatureCards() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:px-6">
      <div className="mb-10">
        <p className="text-lg font-semibold text-green-600">Boost your savings with the right credit card</p>
        <h3 className="mt-3 text-4xl font-bold leading-tight md:text-5xl">
          Access Endless Possibilities with <span className="text-blue-600">GUB Bank Card</span>
        </h3>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
          All your needs covered with a full range of credit and debit cards designed for convenience, rewards, and security.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {benefitCards.map((item) => {
          const Icon = item.icon
          return (
            <div key={item.title} className="rounded-[28px] border border-slate-200 bg-white p-8 text-center shadow-sm">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-50 text-blue-700">
                <Icon size={36} />
              </div>
              <h4 className="mt-6 text-3xl font-bold text-blue-700">{item.title}</h4>
              <p className="mt-4 text-lg leading-8 text-slate-500">{item.text}</p>
            </div>
          )
        })}
      </div>
    </section>
  )
}