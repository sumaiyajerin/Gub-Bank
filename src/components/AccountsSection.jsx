import { Landmark } from 'lucide-react'

const accountCards = [
  {
    title: 'Checking Account',
    text: 'Choose from our checking options that allow you to earn interest, avoid fees, and easily manage your account.',
  },
  {
    title: 'Savings Accounts',
    text: 'Save for your goals and watch your money grow with smart savings options.',
  },
  {
    title: 'Student Banking',
    text: 'Special banking offers and account facilities designed for students.',
  },
]

export default function AccountsSection() {
  return (
    <section className="bg-[#eef4fb] py-16">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-10">
          <p className="text-lg font-semibold text-green-600">Your Needs</p>
          <h3 className="mt-3 text-4xl font-bold md:text-5xl">Accounts for every stage of life</h3>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {accountCards.map((item) => (
            <div key={item.title} className="rounded-[30px] bg-white p-10 shadow-sm">
              <div className="mb-6 text-blue-600">
                <Landmark size={46} />
              </div>
              <h4 className="text-3xl font-bold">{item.title}</h4>
              <p className="mt-5 text-lg leading-9 text-slate-600">{item.text}</p>
              <button className="mt-8 text-2xl font-semibold text-blue-700">
                Open Account →
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}