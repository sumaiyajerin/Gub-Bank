import { useState } from 'react'

const faqs = [
  {
    q: 'How do I locate the nearest branch or ATM?',
    a: 'Use our branch and ATM locator from the GUB Bank mobile app or website. You can quickly find nearby service points based on your location.',
  },
  {
    q: 'What do I do if I lose my card or it gets stolen?',
    a: 'Immediately contact our support team or log in to the app to temporarily block your card. Our team will help you reissue a new card quickly.',
  },
  {
    q: 'What is your customer service number?',
    a: 'You can reach our customer service hotline 24/7 through our support center page or via the number shown in the footer section.',
  },
  {
    q: 'Can I open an account online?',
    a: 'Yes. You can begin your application online and submit the required documents digitally for faster onboarding.',
  },
]

export default function FAQ() {
  const [openFaq, setOpenFaq] = useState(0)

  return (
    <section className="bg-[#eef4fb] py-16">
      <div className="mx-auto max-w-5xl px-4 md:px-6">
        <div className="text-center">
          <p className="text-lg font-semibold text-green-600">If you have question, we have answer</p>
          <h1 className="mt-3 text-5xl font-bold leading-tight">Frequently asked questions</h1>
          <p className="mx-auto mt-5 max-w-4xl text-xl leading-9 text-slate-500">
            Get answers to all questions you have and boost your knowledge so you can save, invest and spend smarter.
          </p>
        </div>

        <div className="mt-10 space-y-5">
          {faqs.map((item, index) => (
            <div key={item.q} className="rounded-[28px] bg-white p-8 shadow-sm">
              <button
                className="flex w-full items-start justify-between gap-4 text-left"
                onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
              >
                <span className="text-3xl font-bold leading-tight">{item.q}</span>
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-3xl text-green-600">
                  {openFaq === index ? '−' : '+'}
                </span>
              </button>

              {openFaq === index && (
                <p className="mt-6 text-xl leading-9 text-slate-500">{item.a}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}