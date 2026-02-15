'use client'
import Link from 'next/link'

export default function CheckEmailPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-black pt-20 flex items-center justify-center">
      <div className="max-w-md mx-auto px-4 text-center">
        <div className="text-6xl mb-6">📧</div>
        <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Провери имейла си</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Изпратихме ти линк за потвърждение. Кликни го за да активираш акаунта си.
        </p>
        <Link href="/login" className="inline-block px-6 py-3 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors">
          Обратно към влизане
        </Link>
      </div>
    </main>
  )
}
