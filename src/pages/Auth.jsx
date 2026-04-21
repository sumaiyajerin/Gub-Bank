import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Auth() {
  const navigate = useNavigate()

  const [isLogin, setIsLogin] = useState(true)
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  })

  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  function generateAccountNumber() {
    return 'GUB-' + Math.floor(10000000 + Math.random() * 90000000)
  }

  function generateBalance() {
    return Math.floor(5000 + Math.random() * 200000)
  }

  function handleSubmit(e) {
    e.preventDefault()

    if (isLogin) {
      const user = JSON.parse(localStorage.getItem('user'))

      if (!user) {
        alert('No account found. Please sign up first.')
        return
      }

      if (user.email !== form.email || user.password !== form.password) {
        alert('Invalid credentials')
        return
      }

      localStorage.setItem('isLoggedIn', 'true')
      alert('Login Successful ✅')
      navigate('/dashboard')
    } else {
      const newUser = {
        name: form.name,
        email: form.email,
        password: form.password,
        accountNumber: generateAccountNumber(),
        accountType: 'Personal Banking',
        branch: 'Dhaka Main Branch',
        balance: generateBalance(),
        savings: generateBalance(),
        cardStatus: 'Active',
        remittanceCount: Math.floor(Math.random() * 5) + 1,
        transactions: [],
      }

      localStorage.setItem('user', JSON.stringify(newUser))
      localStorage.setItem('isLoggedIn', 'true')

      alert('Account Created 🎉')
      navigate('/dashboard')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#eef4fb] px-4 py-10">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <h2 className="mb-6 text-center text-3xl font-bold">
          {isLogin ? 'Login' : 'Create Account'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              className="w-full rounded-xl border px-4 py-3 outline-none"
              required
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full rounded-xl border px-4 py-3 outline-none"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full rounded-xl border px-4 py-3 outline-none"
            required
          />

          <button
            type="submit"
            className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700"
          >
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <p className="mt-4 text-center text-sm">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="ml-2 text-blue-600"
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  )
}