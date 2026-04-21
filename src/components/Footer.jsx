export default function Footer() {
  return (
    <footer className="bg-[#06122c] text-white">
      <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8">

        <div>
          <h2 className="text-2xl font-bold">GUB Bank</h2>
          <p className="mt-3 text-slate-300">
            Smart banking for modern users. Secure, fast and reliable services.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold">Quick Links</h3>
          <ul className="mt-3 space-y-2 text-slate-300">
            <li>Home</li>
            <li>Remittance</li>
            <li>FAQ</li>
            <li>Contact</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold">Contact</h3>
          <p className="mt-3 text-slate-300">Dhaka, Bangladesh</p>
          <p className="text-slate-300">support@gubbank.com</p>
        </div>

      </div>

      <div className="text-center border-t border-slate-700 py-4 text-slate-400">
        © 2026 GUB Bank. All rights reserved.
      </div>
    </footer>
  )
}