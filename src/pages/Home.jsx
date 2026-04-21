import HeroSlider from '../components/HeroSlider'
import FeatureCards from '../components/FeatureCards'
import AccountsSection from '../components/AccountsSection'
import PartnersSection from '../components/PartnersSection'
import InvestmentSection from '../components/InvestmentSection'
import FAQPreview from '../components/FAQPreview'
export default function Home() {
  return (
    <>
      <HeroSlider />
      <FeatureCards />
      <AccountsSection />
      <PartnersSection />
      <InvestmentSection />

      <section className="bg-[#eef4fb] py-16">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 md:px-6 lg:grid-cols-2">
          <div className="order-2 flex flex-col justify-center lg:order-1">
            <p className="text-lg font-semibold text-green-600">Smart Banking</p>
            <h3 className="mt-3 text-4xl font-bold leading-tight md:text-5xl">
              Real time Notifications
            </h3>
            <p className="mt-5 text-lg leading-9 text-slate-600">
              Your customers stay informed in real time with everything that is happening on their accounts: payments, transfers, advice, and updates.
            </p>

            <div className="mt-8 space-y-5">
              <div className="flex items-start gap-4">
                <div className="mt-1 flex h-9 w-9 items-center justify-center rounded-full border-2 border-green-500 text-green-600">
                  ✓
                </div>
                <p className="text-2xl text-slate-700">Cards that work all across the world.</p>
              </div>
              <div className="flex items-start gap-4">
                <div className="mt-1 flex h-9 w-9 items-center justify-center rounded-full border-2 border-green-500 text-green-600">
                  ✓
                </div>
                <p className="text-2xl text-slate-700">No ATM fees. No minimum balance. No overdrafts.</p>
              </div>
              <div className="flex items-start gap-4">
                <div className="mt-1 flex h-9 w-9 items-center justify-center rounded-full border-2 border-green-500 text-green-600">
                  ✓
                </div>
                <p className="text-2xl text-slate-700">Instant transaction alerts for better security.</p>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="rounded-[28px] bg-white p-6 shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80"
                alt="Realtime notification"
                className="h-[420px] w-full rounded-[24px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <FAQPreview />
    </>
  )
}