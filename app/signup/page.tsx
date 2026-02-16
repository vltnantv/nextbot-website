'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'
import Link from 'next/link'

export default function SignupPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    email: '', password: '', confirmPassword: '', companyName: '', businessType: ''
  })

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    if (formData.password !== formData.confirmPassword) {
      setError('Паролите не съвпадат')
      setLoading(false)
      return
    }

    if (formData.password.length < 8) {
      setError('Паролата трябва да е поне 8 символа')
      setLoading(false)
      return
    }

    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          data: { company_name: formData.companyName, business_type: formData.businessType }
        }
      })

      if (authError) throw authError

      router.push('/check-email')
    } catch (error: any) {
      setError(error.message || 'Signup failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-white dark:bg-black pt-20 flex items-center justify-center">
      <div className="max-w-md w-full mx-auto px-4">
        <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">Създай акаунт</h1>
            <p className="text-gray-600 dark:text-gray-400">Започни за 1 минута</p>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-lg bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-900 dark:text-white">Име на компания</label>
              <input type="text" required value={formData.companyName} onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Моя компания ООД" />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-900 dark:text-white">Тип бизнес</label>
              <select required value={formData.businessType} onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none">
                <option value="">Избери...</option>
                <option value="hotel">Хотел/Настаняване</option>
                <option value="restaurant">Ресторант/Заведение</option>
                <option value="ecommerce">E-commerce</option>
                <option value="services">Услуги</option>
                <option value="other">Друго</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-900 dark:text-white">Email</label>
              <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="company@example.com" />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-900 dark:text-white">Парола</label>
              <input type="password" required value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="••••••••" minLength={8} />
              <p className="text-xs text-gray-500 mt-1">Минимум 8 символа</p>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-900 dark:text-white">Потвърди парола</label>
              <input type="password" required value={formData.confirmPassword} onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="••••••••" />
            </div>

            <div className="flex items-start gap-3">
              <input type="checkbox" required className="mt-1" id="terms" />
              <label htmlFor="terms" className="text-sm text-gray-600 dark:text-gray-400">
                Съгласен съм с <Link href="/terms" className="text-blue-600 hover:underline">Общите условия</Link> и <Link href="/privacy" className="text-blue-600 hover:underline">Политиката за поверителност</Link>
              </label>
            </div>

            <button type="submit" disabled={loading}
              className={`w-full px-6 py-4 rounded-full font-semibold text-white transition-all ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}>
              {loading ? 'Създаване...' : 'Създай акаунт'}
            </button>
          </form>

          <p className="text-center mt-6 text-sm text-gray-600 dark:text-gray-400">
            Вече имаш акаунт? <Link href="/login" className="text-blue-600 hover:underline font-semibold">Влез</Link>
          </p>
        </div>
      </div>
    </main>
  )
}
