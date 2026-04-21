export default function Contact() {
  return (
    <section className="bg-[#eef4fb] py-16">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 md:px-6 lg:grid-cols-2">
        <div className="rounded-[28px] bg-white p-8 shadow-sm">
          <p className="text-lg font-semibold text-green-600">Get in touch</p>
          <h1 className="mt-3 text-4xl font-bold md:text-5xl">Contact GUB Bank</h1>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            Have a question about accounts, remittance, or digital banking? Our team is here to help.
          </p>

          <div className="mt-8 space-y-5 text-lg text-slate-700">
            <p><strong>Address:</strong> Purbachal American City, Kanchan, Rupganj, Narayanganj-1461, Dhaka, Bangladesh</p>
            <p><strong>Phone:</strong> +880 1921-349424</p>
            <p><strong>Email:</strong> support@gubbank.com</p>
            <p><strong>Hours:</strong> Sunday - Thursday, 9 AM - 5 PM</p>
          </div>
        </div>

        <div className="rounded-[28px] bg-white p-8 shadow-sm">
          <h2 className="text-3xl font-bold">Send us a message</h2>

          <form className="mt-6 space-y-4">
            <input
              type="text"
              placeholder="Full name"
              className="w-full rounded-2xl border border-slate-300 px-4 py-4 outline-none focus:border-green-500"
            />
            <input
              type="email"
              placeholder="Email address"
              className="w-full rounded-2xl border border-slate-300 px-4 py-4 outline-none focus:border-green-500"
            />
            <input
              type="text"
              placeholder="Subject"
              className="w-full rounded-2xl border border-slate-300 px-4 py-4 outline-none focus:border-green-500"
            />
            <textarea
              rows="6"
              placeholder="Your message"
              className="w-full rounded-2xl border border-slate-300 px-4 py-4 outline-none focus:border-green-500"
            ></textarea>

            <button
              type="button"
              className="rounded-full bg-green-600 px-8 py-4 text-lg font-semibold text-white hover:bg-green-700"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}